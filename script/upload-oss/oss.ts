import fs from "fs-extra";
import OSS from "ali-oss";

const oss = new OSS({
    region: "oss-cn-hangzhou",
    accessKeyId: "LTAI5tC5tgcUZxb16vzb9uPD",
    accessKeySecret: "aJvHd3hRvHoVyxhwUl4Lbsb1I7mMC4",
    bucket: "huiyuanxitong",
});

/** 官网阿里云存储跟地址 */
export const rootPath = "/mingyuanyun/gw/new";

/**
 * 上传文件
 * @param fileName 远程文件名称，包含文件夹层级
 * @param fileLocalPath 文件本地地址
 */
export const uploadFile = (fileName: string, fileLocalPath: string) => oss.putStream(fileName, fs.createReadStream(fileLocalPath));
