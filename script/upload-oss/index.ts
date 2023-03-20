import path from "path";
import "colors";
import { walkFileSync, getCommandLineParams } from "../common";
import { rootPath, uploadFile } from "./oss";

const { array } = getCommandLineParams<[scope?: "build" | "public" | "all"]>();

const scope = array[0];

if (!scope) {
    console.log("请输入上传文件的范围, yarn run upload-oss [scope]. scope: build | public | all".red);
    process.exit(0);
}

const cwd = process.cwd();

interface Options {
    /** 读取的文件夹 */
    folderPath: string;
    /** 相对文件夹生成相对路径 */
    relativeFolderPath: string;
    /** 生成的路径前缀 */
    prefix?: string;
}

/** 获取静态资源文件路径 */
const getStaticFilePaths = (options: Options) => {
    const { folderPath, prefix = "", relativeFolderPath } = options;
    const filePaths: { fileName: string; fileLocalPath: string }[] = [];
    walkFileSync(folderPath, (filePath, isFile) => {
        if (isFile) {
            const relativeFilePath = path.relative(relativeFolderPath, filePath);
            filePaths.push({
                fileName: path.join(rootPath, prefix, relativeFilePath),
                fileLocalPath: filePath,
            });
        }
    });
    return filePaths;
};

/** 文件打包生成的文件 */
const bundleFilepaths = getStaticFilePaths({
    folderPath: path.resolve(cwd, "build/static"),
    relativeFolderPath: path.resolve(cwd, "build"),
    /**
     * nextjs 默认会在 static 之前加上 _next/ 路径前缀
     * @see https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
     */
    prefix: "_next/",
});

/** public 文件夹被的文件 */
const publicAssetsFilepaths = getStaticFilePaths({
    folderPath: path.resolve(cwd, "public/assets/images"),
    relativeFolderPath: path.resolve(cwd, "public"),
    /**
     * nextjs 默认会在 static 之前加上 _next/ 路径前缀
     * @see https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
     */
});

const fileList = scope === "build" ? bundleFilepaths : scope === "public" ? publicAssetsFilepaths : [...bundleFilepaths, ...publicAssetsFilepaths];

fileList.forEach(item => {
    uploadFile(item.fileName, item.fileLocalPath)
        .then(res => {
            console.log("文件上传成功：".green, res.name);
        })
        .catch(() => {
            console.log("文件上传失败，请重新上传".red.bold);
            process.exit(1);
        });
});
