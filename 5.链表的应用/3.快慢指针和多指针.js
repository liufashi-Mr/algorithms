/*text 
链表题目中，有一类会涉及到反复的遍历。
往往会涉及相对复杂的链表操作，比如反转、指定位置的删除等等。
*/
/*quote
快慢指针——删除链表的倒数第 N 个结点
真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个结点后，链表变为 1->2->3->5.
说明： 给定的 n 保证是有效的。
*/
/*text
像上面说的，这题是属于指定位置的删除，这个时候需要两次遍历，如上题，删除倒数第n个就是删除正数length+1-n个
这个时候就需要一次遍历拿到链表长度。
*/

//```js
// 链表构造函数
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}
//```
//```js
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
const removeNthFromEnd = (list, n) => {
  const dummy = new ListNode();
  dummy.next = list;
  let cur = dummy;
  let count = 0;
  while (cur?.next) {
    count += 1;
    cur = cur.next;
  }
  cur = dummy;
  let current = 0;
  while (cur?.next) {
    current += 1;
    if (current === count + 1 - n) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
// console.log(JSON.stringify(removeNthFromEnd(list, 2)));

//```
//-不过这种超过一次的遍历必然需要引起我们的注意，我们应该主动去思考，“如果一次遍历来解决这个问题，我可以怎么做？”，这时候，就要请双指针法来帮忙了。

//```js
// 使用快慢指针，快指针先走n步，然后再快慢指针同时行动，快指针遍历完的时候慢指针此时对应的就是倒数第n个
const removeNthFromEnd2 = (list, n) => {
  const dummy = new ListNode();
  dummy.next = list;
  let slow = dummy;
  let fast = dummy;
  while (fast?.next) {
    if (n > 0) {
      fast = fast.next;
      n--;
    } else {
      fast = fast.next;
      slow = slow.next;
    }
  }
  slow.next = slow.next.next;
  return dummy;
};
console.log(JSON.stringify(removeNthFromEnd2(list, 2)));
//```
