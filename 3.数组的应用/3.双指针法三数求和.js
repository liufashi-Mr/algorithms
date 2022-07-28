
/*quote
    真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
    注意：答案中不可以包含重复的三元组。

    示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
*/

//- 定义一个统计时间的函数
//```js
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};
//```
//- 如果按照最传统的思路可能需要三层循环，时间复杂度为 O(n^3)，肯定是不合适的。但是使用指针之后就会大大降低时间复杂度

//```js
const nums = [-1, 0, 1, 2, 2, 2, -1, -4];

const threeSum = (nums) => {
  nums = nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    let m = i + 1,
      n = nums.length - 1;

    while (m < n) {
      if (nums[m] + nums[n] + nums[i] > 0) {
        n--;
        while (nums[n] === nums[n - 1]) {
          n--;
        }
      } else if (nums[m] + nums[n] + nums[i] < 0) {
        m++;
        while (nums[m] === nums[m + 1]) {
          m++;
        }
      } else {
        result.push([nums[m], nums[n], nums[i]]);
        m++;
        n--;
        while (nums[n] === nums[n - 1]) {
          n--;
        }
        while (nums[m] === nums[m + 1]) {
          m++;
        }
      }
    }
  }
  return result;
};
timer(() => threeSum(nums));
//```

/*text
  总结一下:遇到“有序”和“数组”这两个关键字，立刻把就要想到双指针法普通双指针走不通，立刻想对撞指针！
*/
