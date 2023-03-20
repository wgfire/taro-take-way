
const Subpackage = require("./SubPackage");
const subpackageConfig = require("../../subpackage.config");

// 构建环境
let subpackage = new Subpackage(subpackageConfig);

subpackage.run();
