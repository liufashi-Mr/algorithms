/*quote
    真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
    示例: 给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
*/

//```js
//定义一个统计时间的函数
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
const nums = [2, 7, 11, 15, 1, 8];
const target = 9;
//```

//- 普通解法, 使用两层for循环，用nums[i]和nums[j]相加，若等于target, 则向result中push[i, j]

//```js
const twoSum1 = (nums, target) => {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

timer(() => twoSum1(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
//```

//- 从上面的解法来看，两层循环的时间复杂度是O(n^2)，每次都要将第一次遍历的数与后面的所有数相加与target比较

//- 巧用map解法空间换时间，将求和问题变成球差问题

//```js
const twoSum2 = (nums, target) => {
  const map = {};
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // target-当前遍历到的值的key在map中存在，则返回[map对应的value即下标, i]
    if (map[target - nums[i]] !== undefined) {
      res.push([map[target - nums[i]], i]);
    }
    // 将元素与下标作为key：value存入map
    map[nums[i]] = i;
  }
  return res;
};
timer(() => twoSum2(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
//```
//- 上述的方法将nums中的元素作为key，元素的下标作为value，这样就可以求出target-nums[i]的值，如果map中有这个值，则说明有两个元素的和等于target

//- 使用es6的Map来做

//```js
const twoSum3 = (nums, target) => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    // target-当前遍历到的值的key在map中存在，则返回[map对应的value即下标, i]
    if (map.get(target - nums[i]) !== undefined) {
      res.push([map.get(target - nums[i]), i]);
    }
    // 将元素与下标作为key：value存入map
    map.set(nums[i], i);
  }
  return res;
};
timer(() => twoSum3(nums, target)); //[ [ 0, 1 ], [ 4, 5 ] ]
//```
//- 以上使用map的解法，无论是js的对象还是es6的Map，都可以实现相同的功能，然后时间复杂度都是O(n)
//- 留个疑问，如果你将代码运行一下就会发现使用es6的Map会比使用js对象所需的时间少个一半左右。why？
