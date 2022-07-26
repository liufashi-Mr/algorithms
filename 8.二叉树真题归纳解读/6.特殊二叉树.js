/*
完全二叉树
完全二叉树是指同时满足下面两个条件的二叉树：
- 从第一层到倒数第二层，每一层都是满的，也就是说每一层的结点数都达到了当前层所能达到的最大值
- 最后一层的结点是从左到右连续排列的，不存在跳跃排列的情况（也就是说这一层的所有结点都集中排列在最左边）。
那么对于索引为 n 的结点来说有以下特点：
索引为 (n-1)/2 的结点是它的父结点
索引 2*n+1 的结点是它的左孩子结点
索为引 2*n+2 的结点是它的右孩子结点
*/

//-堆
//-如果对一棵完全二叉树来说，它每个结点的结点值都不小于其左右孩子的结点值，这样的完全二叉树就叫做“大顶堆”，若树中每个结点值都不大于其左右孩子的结点值，这样的完全二叉树就叫做“小顶堆”
