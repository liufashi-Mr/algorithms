/*quote
真题描述：给定一个链表，判断链表中是否有环。
示例 1：
输入：[3,2,0,4] 输出：true
解释：链表中存在一个环
*/

//```js
// 链表构造函数
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}
//```
//```js
// 定义一个环形链表
const list = new ListNode(1, new ListNode(2, new ListNode(3)));
list.next.next.next = list.next; //将最后一个节点指向头结点后一位
//```

//-我们在遍历链表的时候添加一个flag，向后遍历的时候如果存在node.flag===true 就说明链表是环形
//```js
const hasCycle = (list) => {
  while (list?.next) {
    if (list?.flag) {
      return true;
    } else {
      list.flag = true;
      list = list.next;
    }
  }
  return false;
};
// console.log(hasCycle(list));
//```

//-环形链表衍生问题——定位环的起点
//-这个问题和上面的其实基本一样，在第一次判断到flag为true的时候将当前节点返回即可
//```js
const detectCycle = (list) => {
  while (list?.next) {
    if (list?.flag) {
      return list;
    } else {
      list.flag = true;
      list = list.next;
    }
  }
  return null;
};
console.log(detectCycle(list));
//```

/*text
这道题还有一个公认的比较经典的思路，就是用快慢指针来做：
定义慢指针 slow，快指针 fast。两者齐头并进， slow 一次走一步、fast 一次 走两步。这样如果它们是在一个有环的链表里移动，一定有相遇的时刻。
*/
