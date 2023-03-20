#! /usr/bin/env node

// taro cli 默认不提供传递 appPath 方式，所以这里添加支持传递 appPath 方式，为分包提供便捷方式
// 直接拿taro cli 实例化，而不使用taro build
require("@tarojs/cli/dist/util").printPkgVersion();

const path = require("path");
const CLI = require("@tarojs/cli/dist/cli").default;

const appPath = path.join(process.cwd(), "_app");
new CLI(appPath).run();
