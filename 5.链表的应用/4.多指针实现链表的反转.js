//-链表的反转
/*quote
真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
示例:
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
*/
//-处理链表的本质，是处理链表结点之间的指针关系。

//```js
// 链表构造函数
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}
//```

//- 遍历链表的时候让当前节点next指向上一个节点即可，需要注意next指向改变之后会导致丢失后续的遍历，需要一个next节点用来保存断开的后续节点
//```js
const list1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);

const reverseList = (list) => {
  let cur = list; //头结点
  let pre = null; //前置节点
  // while遍历链表
  while (cur) {
    let next = cur.next; //先保存next节点，保证遍历能继续进行
    cur.next = pre; //反转链表
    // 向后遍历
    pre = cur;
    cur = next;
  }
  return pre;
};
console.log(JSON.stringify(reverseList(list1)));
//```

//-局部反转一个链表
/*quote
真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
说明: 1 ≤ m ≤ n ≤ 链表长度。
示例:
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
*/
//```js
const list2 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
const reverseBetween = (list, m, n) => {
  let pre, cur, leftHead;
  const dummy = new ListNode();
  dummy.next = list;
  //用于遍历，最初指向dummy
  leftHead = dummy;
  // 将p定位到m前面
  for (let i = 0; i < m - 1; i++) {
    leftHead = leftHead.next;
  }
  // 缓存m前一个节点
  // start 是反转区间的第一个结点
  let start = leftHead.next;
  pre = start;
  cur = pre.next;
  for (let i = m; i < n; i++) {
    let next = cur.next; //先保存next节点，保证遍历能继续进行
    cur.next = pre; //反转链表
    // 向后遍历
    pre = cur;
    cur = next;
  }
  // 反转后将反转区间前面的片段接上去
  leftHead.next = pre;
  start.next = cur;
  return dummy.next;
};
console.log(JSON.stringify(reverseBetween(list2, 2, 4)));
//```
