/*quote
真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
示例 1:
输入: 1->1->2
输出: 1->2
示例 2:
输入: 1->1->2->3->3
输出: 1->2->3
*/
//```js
// 链表构造函数
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}
//```
//```js
const list = new ListNode(1, new ListNode(1, new ListNode(2)));
const deleteDuplicates = (list) => {
  const cur = list;
  while (!cur && !cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return list;
};
console.log(deleteDuplicates(list));
//```

/*text
删除问题的延伸——dummy 结点
*/

/*quote 
真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
示例 1:
输入: 1->2->3->3->4->4->5
输出: 1->2->5
示例 2:
输入: 1->1->1->2->3
输出: 2->3
*/

/*text
我们先来分析一下这道题和上道题有什么异同哈：相同的地方比较明显，都是删除重复元素。
不同的地方在于，楼上我们删到没有重复元素就行了，可以留个“独苗”；但现在，题干要求我们只要一个元素发生了重复，就要把它彻底从链表中干掉，一个不留。
时我们就可以用一个 dummy 结点解决这个问题。
所谓 dummy 就是人为制造出来的第一个结点的前驱结点，这样链表中所有的结点都能确保有一个前驱结点，也就都能够用同样的逻辑来处理了。
*/

//```js
const list2 = new ListNode(
  1,
  new ListNode(
    1,
    new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(3))))
  )
);
const deleteAllDuplicates = (list) => {
  let dummy = new ListNode();
  // dummy节点指向链表的起始位置
  dummy.next = list;
  let cur = dummy;
  // 遍历链表
  while (cur.next?.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val;
      //存下val，向后找到不等于val的跳出循环
      while (cur.next?.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
console.log(deleteAllDuplicates(list2));
//```
