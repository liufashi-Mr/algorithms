
##	链表

###	链表初识
  
    链表：类似于数组，都是有序列表，线性结构。
        不同点在于，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，相对于数据的连续来说在内存中可以是离散的。


 实现一个链表，通过嵌套对象的形式实现
```js
const listInJS = {
  // 数据域
  val: 1,
  // 指针域，指向下一个结点
  next: {
    val: 2,
    next: null,
  },
};
```

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const node = new ListNode(1);
console.log(node); //ListNode { val: 1, next: null }
```

 添加
```js
const node2 = new ListNode(2);
// 将节点2添加到以上的链表中
node.next = node2;
console.log(node); //ListNode { val: 1, next: ListNode { val: 2, next: ListNode { val: 2, next: null } } }
```

 插入
```js
const node3 = new ListNode(3);
// 将节点3插入到节点一和二之间
node3.next = node2;
node.next = node3;
console.log(node); //ListNode { val: 1,next: ListNode { val: 3, next: ListNode { val: 2, next: null } }}
```

删除
```js
// 将node3删除 将node的next节点断开链接node3，然后指向node2
node.next = node3.next;
console.log(node); //ListNode { val: 1, next: ListNode { val: 2, next: null } }
```



##	二叉树

###	二叉树
```js
const treeNode = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};
```

  先序遍历二叉树   根节点->左子树->右子树
```js
function preOrder(node) {
  if (!node) return;
  console.log(node.val);
  preOrder(node.left);
  preOrder(node.right);
}
preOrder(treeNode); // A B D E C F
```

 中序遍历二叉树   左子树->根节点->右子树

```js
function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
}
inOrder(treeNode); // D B E A F C
```
 后序遍历二叉树   左子树->右子树->根节点
```js
function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
}
postOrder(treeNode); // D E B F C A
```



##	数组的应用

###	Map的妙用
>
    真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
    示例: 给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]


```js
//定义一个统计时间的函数
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
const nums = [2, 7, 11, 15, 1, 8];
const target = 9;
```

 普通解法, 使用两层for循环，用nums[i]和nums[j]相加，若等于target, 则向result中push[i, j]

```js
const twoSum1 = (nums, target) => {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

timer(() => twoSum1(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
```

 从上面的解法来看，两层循环的时间复杂度是O(n^2)，每次都要将第一次遍历的数与后面的所有数相加与target比较

 巧用map解法空间换时间，将求和问题变成球差问题

```js
const twoSum2 = (nums, target) => {
  const map = {};
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // target-当前遍历到的值的key在map中存在，则返回[map对应的value即下标, i]
    if (map[target - nums[i]] !== undefined) {
      res.push([map[target - nums[i]], i]);
    }
    // 将元素与下标作为key：value存入map
    map[nums[i]] = i;
  }
  return res;
};
timer(() => twoSum2(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
```
 上述的方法将nums中的元素作为key，元素的下标作为value，这样就可以求出target-nums[i]的值，如果map中有这个值，则说明有两个元素的和等于target

 使用es6的Map来做

```js
const twoSum3 = (nums, target) => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // target-当前遍历到的值的key在map中存在，则返回[map对应的value即下标, i]
    if (map.get(target - nums[i]) !== undefined) {
      res.push([map.get(target - nums[i]), i]);
    }
    // 将元素与下标作为key：value存入map
    map.set(nums[i], i);
  }
  return res;
};
timer(() => twoSum3(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
```
 以上使用map的解法，无论是js的对象还是es6的Map，都可以实现相同的功能，然后时间复杂度都是O(n)
 留个疑问，如果你将代码运行一下就会发现使用es6的Map会比使用js对象所需的时间少个一半左右。why？


###	双指针法合并有序数组
>
    真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
    说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

    示例: 输入:
        nums1 = [1,2,3,0,0,0], m = 3
        nums2 = [2,5,6], n = 3
    输出: [1,2,2,3,5,6]

 定义一个统计时间的函数

```js
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};

const nums1 = [1, 2, 3, 0, 0, 0];
const nums2 = [2, 5, 6];
const m = 3,
  n = 3;

const merge = (nums1, nums2, m, n) => {
  // 定义两个指针的初始位置和nums1的尾部的索引
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  while (i >= 0 && j >= 0) {
    // 将大的值丢到末尾
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }
  // 当nums2还有剩余的时候,因为题目要求返回nums1，所以将nums2剩余的添加到nums1头部
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
};
```

 在js中的另辟蹊径
```js
const merge2 = () => {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};
timer(() => merge(nums1, nums2, m, n));
// timer(() => merge1(nums1, nums2, m, n));
console.log(nums1); //[ 1, 2, 2, 3, 5, 6 ]
```


###	双指针法三数求和

>
    真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
    注意：答案中不可以包含重复的三元组。

    示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]


 定义一个统计时间的函数
```js
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
```
 如果按照最传统的思路可能需要三层循环，时间复杂度为 O(n^3)，肯定是不合适的。但是使用指针之后就会大大降低时间复杂度

```js
const nums = [-1, 0, 1, 2, 2, 2, -1, -4];

const threeSum = (nums) => {
  nums = nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    let m = i + 1,
      n = nums.length - 1;

    while (m < n) {
      if (nums[m] + nums[n] + nums[i] > 0) {
        n--;
        while (nums[n] === nums[n - 1]) {
          n--;
        }
      } else if (nums[m] + nums[n] + nums[i] < 0) {
        m++;
        while (nums[m] === nums[m + 1]) {
          m++;
        }
      } else {
        result.push([nums[m], nums[n], nums[i]]);
        m++;
        n--;
        while (nums[n] === nums[n - 1]) {
          n--;
        }
        while (nums[m] === nums[m + 1]) {
          m++;
        }
      }
    }
  }
  return result;
};
timer(() => threeSum(nums));
```


  总结一下:遇到“有序”和“数组”这两个关键字，立刻把就要想到双指针法普通双指针走不通，立刻想对撞指针！




##	字符串的应用

###	回文字符串
 判断一个字符串是否是回文字符串;
```js
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
```
>
    真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
    示例 1: 输入: "aba"
    输出: True
    示例 2:
    输入: "abca"
    输出: True
    解释: 你可以删除c字符。
    注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。


```js
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
    return true;
  }
};
console.log(validPalindrome(str));
```


###	字符串匹配问题
>
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


```js
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
```

 这个需要addWord和search两个功能，所以数据需要存在某个地方。
 分析：最简单的办法就是数组，将字符串存进数组，search的时候如果没有"."就直接用includes判断，如果有就new RegExp()

```js
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
```

 这里为了降低查找时的复杂度，我们可以考虑以字符串的长度为 key，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。
```js
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
```


###	字符串与数字之间的转换问题


