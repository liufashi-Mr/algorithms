/*quote
    真题描述： 设计一个支持以下两种操作的数据结构：
    void addWord(word)
    bool search(word)
    search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
    . 可以表示任何一个字母。

    示例: addWord("bad")
    addWord("dad")
    addWord("mad")
    search("pad") -> false
    search("bad") -> true
    search(".ad") -> true
    search("b..") -> true
    说明:
    你可以假设所有单词都是由小写字母 a-z 组成的。
*/

//```js
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
//```

//- 这个需要addWord和search两个功能，所以数据需要存在某个地方。
//- 分析：最简单的办法就是数组，将字符串存进数组，search的时候如果没有"."就直接用includes判断，如果有就new RegExp()

//```js
class WordDictionary_ {
  constructor() {
    this.words = [];
  }
  addWord(word) {
    if (!this.words.includes(word)) this.words.push(word);
  }
  search(word) {
    if (!word.includes(".")) {
      return this.words.includes(word);
    }
    // 否则是正则表达式，要先创建正则表达式对象
    const reg = new RegExp(word);
    // 只要数组中有一个匹配正则表达式的字符串，就返回true
    return this.words.some((item) => {
      return reg.test(item);
    });
  }
}
//```

//- 这里为了降低查找时的复杂度，我们可以考虑以字符串的长度为 key，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。
//```js
class WordDictionary {
  constructor() {
    this.words = {};
  }
  addWord(word) {
    if (this.words[word.length]) {
      this.words[word.length].push(word);
    } else {
      // 若该字符串对应长度的数组还不存在，则先创建
      this.words[word.length] = [word];
    }
  }
  search(word) {
    // 若该字符串长度在 Map 中对应的数组根本不存在，则可判断该字符串不存在
    if (!this.words[word.length]) {
      return false;
    }
    // 缓存目标字符串的长度
    const len = word.length;
    // 如果字符串中不包含‘.’，那么一定是普通字符串
    if (!word.includes(".")) {
      // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
      return this.words[len].includes(word);
    }
    // 否则是正则表达式，要先创建正则表达式对象
    const reg = new RegExp(word);
    // 只要数组中有一个匹配正则表达式的字符串，就返回true
    return this.words[len].some((item) => {
      return reg.test(item);
    });
  }
}

const word = new WordDictionary();
word.addWord("bav");
timer(() => word.search("b.."));
//```
