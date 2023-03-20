var globby = require("globby");
var path = require("path");

module.exports = function (svgsGlobbyOrFileNames) {
  var arr = [].concat(svgsGlobbyOrFileNames);
  // 兼容window路径斜杆转义错误
  arr = arr.map(item => {
    return item.replace(/\\+/g, "/");
  });
  if (arr.join("|").indexOf("*") == -1) {
    return Promise.resolve(filterFiles(arr));
  }
  return globby(arr).then(filterFiles);

  function filterFiles(foundFiles) {
    console.log("foundFiles", foundFiles);
    const filteredFiles = foundFiles.filter(foundFile => path.extname(foundFile).toLowerCase() === ".svg");

    if (filteredFiles.length === 0) {
      throw new Error("Svg glob patterns specified did not match any svgs:\n" + svgsGlobbyOrFileNames);
    }
    return filteredFiles;
  }
};
