// 二叉树
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
//  先序遍历二叉树   根节点->左子树->右子树
function preOrder(node) {
  if (!node) return;
  console.log(node.val);
  preOrder(node.left);
  preOrder(node.right);
}
preOrder(treeNode); // A B D E C F

// 中序遍历二叉树   左子树->根节点->右子树

function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
}
inOrder(treeNode); // D B E A F C

// 后序遍历二叉树   左子树->右子树->根节点

function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
}
postOrder(treeNode); // D E B F C A