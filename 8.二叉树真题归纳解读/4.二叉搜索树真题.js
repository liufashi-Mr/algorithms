/*quote
题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
假设一个二叉搜索树具有如下特征：
节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
*/
//```js
var isValidBST = function (root) {
  function dfs(root, minValue, maxValue) {
    // 若是空树，则合法
    if (!root) {
      return true;
    }
    // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
    if (root.val <= minValue || root.val >= maxValue) return false;
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return (
      dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    );
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity);
};
//```

/*quote
题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
示例: 给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
*/
//```js
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  function buildBST(left, right) {
    if (left > right) return null;
    const mid = Math.floor(left + (right - left) / 2);
    const cur = new TreeNode(nums[mid]);
    cur.left = buildBST(left, mid - 1);
    cur.right = buildBST(mid + 1, right);
    return cur;
  }
  return buildBST(0, nums.length - 1);
};
//```
