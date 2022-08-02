/*quote
真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 
示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
*/

//```js
// 链表构造函数
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}
//```

//```js
const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

const mergeTwoList = (l1, l2) => {
  // 定义一个头结点，即空链表
  const head = new ListNode();
  let cur = head;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  // 一个链表走完了之后将剩余的直接挡在cur的next里面
  cur.next = l1 !== null ? l1 : l2;
  return head.next;
};
console.log(JSON.stringify(mergeTwoList(l1, l2)));
//```
