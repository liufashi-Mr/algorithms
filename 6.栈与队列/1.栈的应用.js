//-括号问题
/*quote
题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足： 左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。
示例 1:
输入: "()"
输出: true
示例 2:
输入: "()[]{}"
输出: true
示例 3:
输入: "(]"
输出: false
示例 4:
输入: "([)]"
输出: false
示例 5:
输入: "{[]}"
输出: true
*/
/*text
括号问题在面试中出现频率非常高， 这类题目我们一般首选用栈来做。
为什么可以用栈做？大家想想，括号成立意味着什么？意味着对称性。
巧了，根据栈的后进先出原则，一组数据的入栈和出栈顺序刚好是对称的。比如说1、2、3、4、5、6按顺序入栈，其对应的出栈序列就是 6、5、4、3、2、1 对称关系一目了然。
*/

//```js
const isValid = (str) => {
  const stack = [];
  const leftBrackets = ["{", "[", "("];
  const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (let i = 0; i < str.length; i++) {
    if (leftBrackets.includes(str[i])) {
      stack.push(leftToRight[str[i]]);
    } else {
      if (stack.pop() !== str[i]) return false;
    }
  }
  return true;
};
// console.log(isValid("({[]})")); //true
//```

//-每日温度问题
/*quote
题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
*/
//-思路：尝试去维持一个递减栈。
//```js
const dailyTemperatures = (t) => {
  const stack = [];
  const res = new Array(t.length).fill(0);
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[i] > t[stack[stack.length - 1]]) {
      // 将栈顶温度值对应的索引出栈
      const top = stack.pop();
      // 计算 当前栈顶温度值与第一个高于它的温度值 的索引差值
      res[top] = i - top;
    }
    stack.push(i);
  }
  return res;
};
console.log(dailyTemperatures([73, 72, 75, 71, 69, 72, 76, 73]));
//```

//-最小栈问题
/*quote
题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
示例:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); --> 返回 -3.
minStack.pop();
minStack.top(); --> 返回 0.
minStack.getMin(); --> 返回 -2.
*/
//```js
// 用es6的类写也是一样的
class MinStack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    this.stack.push(val);
  }
  pop() {
    return this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return Math.min(...this.stack);
  }
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());
//```
