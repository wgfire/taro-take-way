/**
 * @author kongxs01
 *
 * 嵌套文件夹存放的 .svg 文件也不允许重复名
 */

const { extname, basename } = require("path");

function checkFiles(filesArr) {
  const filesInfo = filesArr.map(v => {
    const ext = extname(v);
    return basename(v).replace(ext, "");
  });

  for (let i = 0; i < filesInfo.length; i++) {
    const item = filesInfo[i];
    const filter = filesInfo.slice(i + 1);
    if (filter.includes(item)) {
      throw new Error(`请修改文件名，${item} 已重复使用`);
    }
  }
}

module.exports = checkFiles;
