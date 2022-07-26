/*  
    链表：类似于数组，都是有序列表，线性结构。
        不同点在于，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，相对于数据的连续来说在内存中可以是离散的。
*/
// 实现一个链表，通过嵌套对象的形式实现
// {
//     // 数据域
//     val: 1,
//     // 指针域，指向下一个结点
//     next: {
//         val:2,
//         next: ...
//     }
// }
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const node = new ListNode(1);
console.log(node); //ListNode { val: 1, next: null }

// 添加
const node2 = new ListNode(2);
// 将节点2添加到以上的链表中
node.next = node2;
console.log(node); //ListNode { val: 1, next: ListNode { val: 2, next: ListNode { val: 2, next: null } } }

// 插入
const node3 = new ListNode(3);
// 将节点3插入到节点一和二之间
node3.next = node2;
node.next = node3;
console.log(node); //ListNode { val: 1,next: ListNode { val: 3, next: ListNode { val: 2, next: null } }}

//删除
// 将node3删除 将node的next节点断开链接node3，然后指向node2
node.next = node3.next;
console.log(node); //ListNode { val: 1, next: ListNode { val: 2, next: null } }
