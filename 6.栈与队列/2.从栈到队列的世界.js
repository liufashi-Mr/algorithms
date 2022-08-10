//-如何用栈实现一个队列？
/*quote
题目描述：使用栈实现队列的下列操作：
push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。
示例: MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false
说明:
你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
*/
//-由题意我们无法使用push和shift来简单实现队列而是需要使用栈结构，在js中没有栈结构，我们可以使用list代替，使用push  pop length 来实现队列
/*text
我们知道队列是先进先出和栈后进先出是相反的操作，我们只需要使用两个栈，stack1和stack2，在实现队列出列之前将stack1出栈存放至stack2，stack2的pop操作就相当于队列的pop操作了 peek也是同理
*/
//```js
// 上面使用class实现过了，这里使用原型
const MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  // 注意，只有stack2全部出栈之后的pop操作才需要同步stack1的数据
  if (this.stack2.length === 0)
    while (this.stack1?.length) {
      this.stack2.push(this.stack1.pop());
    }
  return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  // 与pop同理，只是不需要出栈
  if (this.stack2.length === 0)
    while (this.stack1?.length) {
      this.stack2.push(this.stack1.pop());
    }
  return this.stack2[this.stack2.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length;
};
const myQueue = new MyQueue();
console.log(myQueue.empty());
//```

//-认识双端队列
/*quote
题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
解释: 滑动窗口的位置
[1 3 -1] -3 5 3 6 7
1 [3 -1 -3] 5 3 6 7
1 3 [-1 -3 5] 3 6 7
1 3 -1 [-3 5 3] 6 7
1 3 -1 -3 [5 3 6] 7
1 3 -1 -3 5 [3 6 7]
最大值分别对应：
3 3 5 5 6 7
提示：你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。
*/
//-通常可以使用双指针解决，但是使用双端队列可以降低时间复杂度
//```js
const maxSlidingWindow = function (nums, k) {
  let left = 0;
  let right = k - 1;
  const res = [];
  while (right < nums.length) {
    let max = nums[left];
    for (let i = left; i < left + k; i++) {
      max = Math.max(max, nums[i]);
    }
    res.push(max);
    left++;
    right++;
  }
  return res;
};
//```

//-O(kn)--->O(n) 使用双端队列实现一个单调递减的队列
//```js
const maxSlidingWindow2 = function (nums, k) {
  const len = nums.length;
  let res = [];
  let queue = [];
  for (let i = 0; i < len; i++) {
    // 当nums[i]>= 队尾元素的时候删除掉这个元素 维持队列的单调递减
    while (nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
    if (i >= k - 1) {
      // 维持队列只在滑动窗口内有效
      while (queue[0] <= i - k) {
        queue.shift();
      }
      // 只有到第k-1个元素时才将第一个数添加到res;
      res.push(nums[queue[0]]);
    }
  }
  return res;
};
//```
