const path = require("path");
const fs = require("fs");
const getContent = (data) => {
  //将注释转化为对应的md格式
  //   //和 /*text */ 直接转化为文本 /*quote */ 转化为引用 /*code */ 转化为代码
  const regText = /(\/\*text)([\s\S]*?)(\*\/)/g;
  const regQuote = /(\/\*quote)([\s\S]*?)(\*\/)/g;
  const regCode = /(\/\/```)([\s\S]*?)(\/\/```)/g;
  const regText_ = /\/\/-.*/g;
  return data
    .replace(regText, (replacement) => {
      return replacement.replace(/\/\*text/g, "").replace(/\*\//g, "");
    })
    .replace(regQuote, (replacement) => {
      return ">" + replacement.replace(/\/\*quote/g, "").replace(/\*\//g, "");
    })
    .replace(regCode, (replacement) => {
      return replacement.replace(/\/\/```/g, "```");
    })
    .replace(regText_, (replacement) => {
      return replacement.replace(/\/\/-/g, "");
    });
};

const getDir = (directory) => {
  if (/\.\w+\/$/.test(directory)) {
    const file = fs.readFileSync(
      path.join(__dirname, directory.substr(0, directory.length - 1)),
      "utf8"
    );
    return [{ file: getContent(file) }];
  }
  return (
    fs
      .readdirSync(path.join(__dirname, directory))
      // 去掉隐藏文件和最外层的index.js
      .filter(
        (item) =>
          !/(^|\/)\.[^\/\.]/g.test(item) &&
          item !== "index.js" &&
          item !== "index.md"
      )
      .map((x) => {
        return {
          title: x,
          children: getDir(`${directory}${x}/`),
        };
      })
  );
};

// 深度优先遍历
const renderMarkDown = (markdownTree, level) => {
  level++;
  return markdownTree.reduce((pre, item) => {
    if (!item.title) {
      return pre + item.file;
    }
    return (
      pre +
      `\n${new Array(level).fill("#").join("")}\t${item.title
        .replace(/^\d+./, "")
        .replace(/.\w+$/, "")}\n${renderMarkDown(item.children, level)}\n`
    );
  }, "");
};

fs.writeFileSync(
  path.join(__dirname, "README.md"),
  renderMarkDown(getDir("./"), 1),
  "utf8"
);
