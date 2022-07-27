// 判断一个字符串是否是回文字符串;
const str = "yessey1";

// 使用数组中的reverse判断反转后是否一致
function isPalindrome1(str) {
  // 先反转字符串
  const reversedStr = str.split("").reverse().join("");
  // 判断反转前后是否相等
  return reversedStr === str;
}
console.log(isPalindrome1(str));

function isPalindrome2(str) {
  // 缓存字符串的长度
  const len = str.length;
  // 遍历前半部分，判断和后半部分是否对称
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
}
console.log(isPalindrome2(str));

/*
    真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
    示例 1: 输入: "aba"
    输出: True
    示例 2:
    输入: "abca"
    输出: True
    解释: 你可以删除c字符。
    注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
*/
const validPalindrome = (str) => {
  const len = str.length;
  let j = 0,
    k = len - 1;
  while (j < k && str[j] === str[k]) {
    j++;
    k--;
  }
  // 尝试判断跳过左指针元素后字符串是否回文
  if (isPalindrome(j + 1, k)) {
    return true;
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(j, k - 1)) {
    return true;
  }
  return false;
  function isPalindrome(start, end) {
    while (start < end) {
      if (str[start] !== str[end]) return false;
      start++;
      end--;
    }
    return true
  }
};
console.log(validPalindrome(str));
