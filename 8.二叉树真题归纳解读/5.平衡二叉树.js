//-平衡二叉树（又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。
/*quote
题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树。
本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
示例 1: 给定二叉树 [3,9,20,null,null,15,7]
*/
//```js
const isBalanced = (root) => {
  let flag = true;
  function dfs(root) {
    if (!flag || !root) return;
    // 计算左子树的高度
    const left = dfs(root.left);
    // 计算右子树的高度
    const right = dfs(root.right);
    // 如果左右子树的高度差绝对值大于1，flag就破功了
    if (Math.abs(left - right) > 1) {
      flag = false;
      // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
      return 0;
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1;
  }
  // 递归入口
  dfs(root);
  // 返回flag的值
  return flag;
};
isBalanced()
//```
