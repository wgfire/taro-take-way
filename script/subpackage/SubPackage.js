const fse = require("fs-extra");
const path = require("path");
const { jsonrepair } = require("jsonrepair");
const chalk = require("chalk");
const ejs = require("ejs");

const defaultOptions = {
  appPath: "_app", // 构建文件目录
  subpackageName: "spages",
  preload: true, // 预加载

  filter: [], // 需过滤的页面
};

class SubPackage {
  constructor(options = {}) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    const rootPath = path.resolve(__dirname, "..", "..");
    const tempRootPath = path.join(rootPath, this.options.appPath);

    this.paths = {
      root: rootPath,
      src: path.join(rootPath, "src"),
      config: path.join(rootPath, "config"),
      dist: path.join(rootPath, "dist"),
    };

    this.buildPaths = {
      root: tempRootPath,
      src: path.join(tempRootPath, "src"),
      config: path.join(tempRootPath, "config"),
    };

    this.appConfigPath = path.join(this.buildPaths.src, "app.config.ts");
  }

  run(next) {
    // 1. 清空构建文件夹
    this.clean();

    // 2. 复制 src、config 到 构建目录，用于后续分包修改和构建
    fse.copySync(this.paths.config, this.buildPaths.config);
    fse.copySync(this.paths.src, this.buildPaths.src);

    // 3. 读取app.config.ts，并修改app配置
    const appConfig = this.readAppConfig();

    // 3-1. 获取需分包清单
    const subPackageList = this.getSubPackageList(appConfig);
    // 3-2. 设置分包配置，并保存app.config.ts
    this.setSubPackageList(appConfig, subPackageList);

    console.log(
      "[小程序分包]",
      chalk.green("找到分包页："),
      subPackageList.map(item => item.page.path)
    );

    // 4. 分包
    subPackageList.forEach(item => {
      // 4-1. 根据分包清单，从主包迁移到分包
      this.moveToSubPackage(item);

      // 4-2. 复制index.config.ts
      this.copyMiddleConfig(item);
      // 4-3. 创建中间页
      this.createMiddleView(item);
      console.log("[小程序分包]", chalk.cyan("分包"), item.page.path, " => ", chalk.blue(item.spage.path));
    });

    // 没回调，则不走最后步骤
    if (!next) {
      return;
    }

    // 返回true，则自行选择时机调用
    const p = next(() => this.end());

    // undefined / null / false 直接调用
    if (!p) {
      this.end();
    } else if (p.then) {
      // 返回promise，等待完毕运行
      p.then(() => {
        this.end();
      });
    }
  }

  // 读取配置并修复json格式
  readAppConfig() {
    let appConfig = fse.readFileSync(this.appConfigPath)
    appConfig = appConfig.toString().replace("export default ", "");

    // 修复json格式
    appConfig = jsonrepair(appConfig);
    return JSON.parse(appConfig);
  }

  getSubPackageList(appConfig) {
    // 3-2. 遍历清洗page
    const tabbarPages = appConfig.tabBar.list.map(item => item.pagePath);
    return (
      appConfig.pages
        // 清除tabbar页面
        .filter(item => tabbarPages.indexOf(item) === -1)
        // 清除配置的filter
        .filter(item => this.options.filter.indexOf(item) === -1)
        // 格式调整
        .map(item => {
          const arrPath = item.split("/");
          const filePath = arrPath.slice(1).join("/"); // filePath = name + index

          return {
            page: {
              path: item,
              dirPath: arrPath.slice(0, arrPath.length - 1).join("/"),
              filePath,
              dir: arrPath[0],
              name: arrPath[1],
              index: arrPath[2],
            },
            spage: {
              path: `${this.options.subpackageName}/${filePath}`,
              dirPath: `${this.options.subpackageName}/${arrPath[1]}`,
              filePath,
              dir: this.options.subpackageName,
              name: arrPath[1],
              index: arrPath[2],
            },
          };
        })
    );
  }

  setSubPackageList(appConfig, subPackageList) {
    if (!(subPackageList && subPackageList.length)) {
      return;
    }

    appConfig.subpackages = [
      {
        root: this.options.subpackageName,
        pages: subPackageList.map(item => item.page.filePath),
      },
    ];

    // 预加载
    if (this.options.preload) {
      appConfig.preloadRule = {
        // pages 第1个默认是首页
        [appConfig.pages[0]]: {
          network: "all",
          packages: [this.options.subpackageName],
        },
      };
    }

    this.writeAppConfig(appConfig);
    console.log("[小程序分包]", chalk.green("app.config 已更新"));
  }

  writeAppConfig(appConfig) {
    fse.outputFileSync(this.appConfigPath, `export default ${JSON.stringify(appConfig, null, 2)}`);
  }

  moveToSubPackage(pageItem) {
    // 原有主包迁移到分包
    fse.moveSync(path.join(this.buildPaths.src, pageItem.page.dirPath), path.join(this.buildPaths.src, pageItem.spage.dirPath));

    console.log("[小程序分包]", chalk.green("已迁移到分包"));
  }

  copyMiddleConfig(pageItem) {
    // 配置页面文件复制一份到主包
    const pageConfig = path.join(this.buildPaths.src, pageItem.page.dirPath, "index.config.ts");
    const spageConfig = path.join(this.buildPaths.src, pageItem.spage.dirPath, "index.config.ts");
    const isPageConfigExisis = fse.pathExistsSync(spageConfig);

    // 页面config 存在，则复制到 中转模板里面
    if (isPageConfigExisis) {
      fse.mkdirpSync(path.join(this.buildPaths.src, pageItem.page.dirPath));
      fse.copyFileSync(spageConfig, pageConfig);
    } else {
      console.log("[小程序分包]", chalk.yellow("找不到页面配置", pageConfig));
    }
  }

  createMiddleView(pageItem) {
    // 编译中转模板，存到主包
    ejs.renderFile(
      path.join(__dirname, "template/page.ejs"),
      {
        path: pageItem.spage.path,
      },
      {},
      (err, str) => {
        fse.outputFileSync(path.join(this.buildPaths.src, pageItem.page.dirPath, `${pageItem.page.index}.tsx`), str);
        console.log("[小程序分包]", chalk.green("已生成中间页"), pageItem.page.path);
      }
    );
  }

  clean() {
    fse.removeSync(this.buildPaths.root);
    console.log("[小程序分包]", chalk.green("构建目录已清理"));
  }

  outputDist() {
    try {
      const distPath = path.join(this.paths.root, "dist");
      const tempDistPath = path.join(this.buildPaths.root, "dist");

      fse.removeSync(distPath);
      fse.moveSync(tempDistPath, distPath);

      console.log("[小程序分包]", chalk.green("构建文件迁移完成"));
    } catch (error) {
      console.log("outputDist", error);
    }
  }

  end() {
    this.outputDist();
    this.clean();
  }
}

module.exports = SubPackage;
