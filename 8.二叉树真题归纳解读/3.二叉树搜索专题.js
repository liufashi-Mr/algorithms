//-二叉搜索树（Binary Search Tree）简称 BST，是二叉树的一种特殊形式。它有很多别名，比如排序二叉树、二叉查找树等等。
/*text
什么是二叉搜索树？
1. 是一棵空树
2. 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，
且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域
即 `左孩子 <= 根结点 <= 右孩子`
关于二叉搜索树，大家需要掌握以下高频操作：
1. 查找数据域为某一特定值的结点
2. 插入新结点
3. 删除指定结点
*/
//```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
//```
//-查找数据域为某一特定值的结点
//```js
const search = (root, n) => {
  if (!root) return;
  if (root.val === n) {
    console.log("目标结点是：", root);
  } else if (root.val > n) {
    search(root.left, n);
  } else if (root.val < n) {
    search(root.right, n);
  }
};
//```
//-插入新结点
//```js
function insertIntoBST(root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if (!root) {
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n);
    return root;
  }

  if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n);
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n);
  }

  // 返回插入后二叉搜索树的根结点
  return root;
}
//```

//-删除指定结点
//-结点删除后只需要继续保持二叉查找树的特性即可
//```js
const deleteNode = (root, n) => {
  if (!root) return root;
  if (root.val === n) {
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // 为了保持二叉搜索树的特性需要将左子树的最大值替换掉当前节点
      // 因为左子树的最大值满足大于所有左子树的值小于所有右子树的值
      const maxLeft = findMax(root.left);
      // 覆盖原有值
      root.val = maxLeft.val;
      // 删除这个节点
      root.left = deleteNode(root.left, maxLeft.val);
    } else {
      // 同理右子树中的最小值同样满足
      const minRight = findMin(root.right);
      root.val = minRight.val;
      root.right = deleteNode(root.right, minRight.val);
    }
  } else if (root.val > n) {
    root.left = deleteNode(root.left, n);
  } else {
    root.right = deleteNode(root.right, n);
  }
  return root;

  function findMax(root) {
    while (root.right) {
      root = root.right;
    }
    return root;
  }

  // 寻找右子树的最小值
  function findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }
};
//```
