/**
 * 使用方式：yarn build-font
 *
 * - 将 svg 放到 src/assets/svgs 下，可使用文件夹管理某一类 svg
 * - 执行命令后会在 src/assets/fonts/font.css 生成对应的 class
 *
 */
var WebpackIconfontPluginNodejs = require("./src/index");

var options = require("./iconfont-options");

new WebpackIconfontPluginNodejs(options).build();
