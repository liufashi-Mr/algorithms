/*quote
题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
示例：   
输入: [1,2,3]
输出: [
[1,2,3],
[1,3,2],
[2,1,3],
[2,3,1],
[3,1,2],
[3,2,1]
]
*/
//```js
const permute = (nums) => {
  const res = [];
  let cur = [];
  const visited = {};

  function dfs(depth) {
    if (depth === nums.length) {
      res.push([...cur]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1;
        cur.push(nums[i]);
        dfs(depth + 1);
        // 每次执行到最后删除cur尾部，为下次留出空间，visited也重置
        cur.pop();
        visited[nums[i]] = 0;
      }
    }
  }
  dfs(0);
  return res;
};
console.log(permute([1, 2, 3]));
//```

/*quote
题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。
示例: 输入: nums = [1,2,3]
输出:
[
[3],
[1],
[2],
[1,2,3],
[1,3],
[2,3],
[1,2],
[]
]
*/

//```js
const subsets = function (nums) {
  const res = [];
  const len = nums.length;
  const cur = [];
  dfs(0);
  function dfs(index) {
    // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
    res.push(cur.slice());
    // 从当前数字的索引开始，遍历 nums
    for (let i = index; i < len; i++) {
      // 这是当前数字存在于组合中的情况
      cur.push(nums[i]);
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1);
      // 这是当前数字不存在于组合中的情况
      cur.pop();
    }
  }
  return res;
};
console.log(subsets([1, 2, 3]));
//```

/*quote 
题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
示例: 输入: n = 4, k = 2
输出:
[
[2,4],
[3,4],
[2,3],
[1,2],
[1,3],
[1,4],
]
*/
//```js
const combine = function (n, k) {
  const res = [];
  const cur = [];
  dfs(1);
  function dfs(index) {
    if (cur?.length === k) {
      res.push([...cur]);
      return;
    }
    for (let i = index; i <= n; i++) {
      cur.push(i);
      dfs(i + 1);
      cur.pop();
    }
  }
  return res;
};
console.log(combine(4, 2));
//```
/*text
什么时候用递归回溯思想
看两个特征：
题目中暗示了一个或多个解，并且要求我们详尽地列举出每一个解的内容时，一定要想到 DFS、想到递归回溯。  
题目经分析后，可以转化为树形逻辑模型求解。
一个模型——树形逻辑模型；两个要点——递归式和递归边界。
树形逻辑模型的构建，关键在于找“坑位”，一个坑位就对应树中的一层，每一层的处理逻辑往往是一样的，这个逻辑就是递归式的内容。至于递归边界，要么在题目中约束得非常清楚、要么默认为“坑位”数量的边界。  
*/
/*quote
function xxx(入参) {
  前期的变量定义、缓存等准备工作 
  // 定义路径栈
  const path = []
  // 进入 dfs
  dfs(起点) 
  // 定义 dfs
  dfs(递归参数) {
    if(到达了递归边界) {
      结合题意处理边界逻辑，往往和 path 内容有关
      return   
    }
    // 注意这里也可能不是 for，视题意决定
    for(遍历坑位的可选值) {
      path.push(当前选中值)
      处理坑位本身的相关逻辑
      path.pop()
    }
  }
}
*/
//-没有思路的时候对照着这个模板想一想说不定就有了呢
