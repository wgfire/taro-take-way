const path = require("path");

function getIPAddress() {
  let interfaces = require("os").networkInterfaces();
  let local_ip = "127.0.0.1";
  Object.getOwnPropertyNames(interfaces).forEach(key => {
    const curr = interfaces[key];
    const alias = curr.find(alias => {
      return alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal;
    });
    if (local_ip === "127.0.0.1" && alias) {
      local_ip = alias.address;
    }
  });

  return local_ip;
}

const localIp = getIPAddress();

const config = {
  projectName: "take-way",
  date: "2023-02-17",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  env: {
    RUN_ENV: JSON.stringify(process.env.RUN_ENV),
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {
    LOCAL_IP: JSON.stringify(localIp),
    YUNKE_ENV: JSON.stringify(process.env.YUNKE_ENV),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  compiler: "webpack5",
  alias: {
    "@src": path.resolve(__dirname, "..", "src"),
    "@assets": path.resolve(__dirname, "..", "src/assets"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@api": path.resolve(__dirname, "..", "src/apis"),
  },
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    resource: [path.resolve(__dirname, "..", "src/assets/style/variables.scss")],
    data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`,
  },
  plugins: ["@tarojs/plugin-html"],

  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"],
        },
      },
      // 小程序端样式引用本地资源内联
      url: {
        enable: true,
        config: {
          limit: 1024000, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    compile: {
      include: [
        function (modulePath) {
          const pass = modulePath.indexOf("@ultron/runtime-sdk") >= 0;
          return pass;
        },
      ],
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["nutui/nutui-react-taro"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  rn: {
    appName: "taroDemo",
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
