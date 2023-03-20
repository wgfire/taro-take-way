import "colors";
import fs from "fs-extra";
import path from "path";
import { formatCode } from "../common";
import "./iconfont/run";

// TODO: 将字体资源打包到 Icon 组件中，并且生成 scss 文件，在组件中引用，而不是全局引用

const pwd = path.resolve(process.cwd());
// 组件生成目录
const outputDir = path.resolve(pwd, "src/lib/components/basic/Icon");

const iconNames =
  fs
    .readFileSync(path.resolve(pwd, "src/assets/fonts/font.css"))
    .toString()
    .match(/(?<=(ai-icon-))([a-zA-Z-_]+)/g) || [];

const componentCode = fs
  .readFileSync(path.resolve(__dirname, "./template.tsx"))
  .toString()
  .replace('"icon-name"', iconNames.map(name => `"${name}"`).join("|"));

fs.ensureDirSync(outputDir);
fs.writeFileSync(path.resolve(outputDir, "./index.tsx"), formatCode(componentCode));
