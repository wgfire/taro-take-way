var path = require("path");

const dir = path.resolve(process.cwd(), "src/assets/");
module.exports = {
  fontName: "ai-icon",
  // template: path.join('./', 'scss'),
  svgs: path.join(dir, "svgs/**/*.svg"),
  fontsOutput: path.join(dir, "fonts/"),
  cssOutput: path.join(dir, "fonts/font.css"),
  jsOutput: path.join(dir, "fonts/fonts.js"),
  htmlOutput: path.join(dir, "fonts/font-preview.html"),
  //formats: ['ttf', 'woff2', 'woff', 'svg'],
  cssPrefix: "ai-icon",
};
