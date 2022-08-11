//-先（前）序遍历迭代实现
/*quote
题目描述：给定一个二叉树，返回它的前序（先序）遍历序列。
示例: 输入: [1,null,2,3]
1   
 \   
  2   
 /  
3 
输出: [1,2,3]
进阶: 递归算法很简单，你可以通过迭代算法完成吗？
*/
//```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
//```
//-不使用递归 使用迭代算法
/*text
前序遍历的规则是，先遍历根结点、然后遍历左孩子、最后遍历右孩子——这正是我们所期望的出栈序列。按道理，入栈序列和出栈序列相反，我们似乎应该按照 右->左->根 这样的顺序将结点入栈。不过需要注意的是，我们遍历的起点就是根结点，难道我们要假装没看到这个根结点、一鼓作气找到最右侧结点之后才开始进行入栈操作吗？答案当然是否定的，我们的出入栈顺序应该是这样的：  
1.将根结点入栈 
2.取出栈顶结点，将结点值 push 进结果数组 
3.若栈顶结点有右孩子，则将右孩子入栈
4.若栈顶结点有左孩子，则将左孩子入栈
*/
//```js
var preorderTraversal = function (root) {
  const stack = [root];
  const res = [];
  if (!root) {
    return res;
  }
  while (stack?.length) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
  return res;
};
//```
//-异曲同工的后序遍历迭代实现
//```js
const postorderTraversal = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    res.unshift(cur.val);
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  return res;
};
//```
//-思路清奇的中序遍历迭代实现
//```js
const inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来
    while (cur) {
      // 将途径的结点入栈
      stack.push(cur);
      // 继续搜索当前结点的左孩子
      cur = cur.left;
    }
    // 取出栈顶元素
    cur = stack.pop();
    // 将栈顶元素入栈
    res.push(cur.val);
    // 尝试读取 cur 结点的右孩子
    cur = cur.right;
  }
  return res;
};
//```

//-层序遍历的衍生问题
/*quote
题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
示例： 二叉树：[3,9,20,null,null,15,7],
  3
 / \
9  20
  /  \
 15   7
返回其层次遍历结果：
[
[3],
[9,20],
[15,7]
]
*/
//```js
const levelOrder = function (root) {
  // 初始化结果数组
  const res = [];
  // 处理边界条件
  if (!root) {
    return res;
  }
  // 初始化队列
  const queue = [];
  // 队列第一个元素是根结点
  queue.push(root);
  // 当队列不为空时，反复执行以下逻辑
  while (queue.length) {
    // level 用来存储当前层的结点
    const level = [];
    // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
    const len = queue.length;
    // 循环遍历当前层级的结点
    for (let i = 0; i < len; i++) {
      // 取出队列的头部元素
      const top = queue.shift();
      // 将头部元素的值推入 level 数组
      level.push(top.val);
      // 如果当前结点有左孩子，则推入下一层级
      if (top.left) {
        queue.push(top.left);
      }
      // 如果当前结点有右孩子，则推入下一层级
      if (top.right) {
        queue.push(top.right);
      }
    }
    // 将 level 推入结果数组
    res.push(level);
  }
  // 返回结果数组
  return res;
};
//```
