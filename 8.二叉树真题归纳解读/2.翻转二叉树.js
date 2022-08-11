/*quote
题目描述：翻转一棵二叉树。
示例：
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
*/
//```js
const invertTree = function (root) {
  // 定义递归边界
  if (!root) {
    return root;
  }
  // 递归交换右孩子的子结点
  let right = invertTree(root.right);
  // 递归交换左孩子的子结点
  let left = invertTree(root.left);
  // 交换当前遍历到的两个左右孩子结点
  root.left = right;
  root.right = left;
  return root;
};
//```
