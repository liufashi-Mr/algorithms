/**
 * 双指针法
 */
/*
    真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
    说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

    示例: 输入:
        nums1 = [1,2,3,0,0,0], m = 3
        nums2 = [2,5,6], n = 3
    输出: [1,2,2,3,5,6]
*/
// 定义一个统计时间的函数
const timer = (callback) => {
  console.time("timer");
  console.log(callback());
  console.timeEnd("timer");
};

const nums1 = [1, 2, 3, 0, 0, 0];
const nums2 = [2, 5, 6];
const m = 3,
  n = 3;

const merge = (nums1, nums2, m, n) => {
  // 定义两个指针的初始位置和nums1的尾部的索引
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  while (i >= 0 && j >= 0) {
    // 将大的值丢到末尾
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }
  // 当nums2还有剩余的时候,因为题目要求返回nums1，所以将nums2剩余的添加到nums1头部
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
};

// 在js中的另辟蹊径
const merge2 = () => {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};
timer(() => merge(nums1, nums2, m, n));
// timer(() => merge1(nums1, nums2, m, n));
console.log(nums1); //[ 1, 2, 2, 3, 5, 6 ]
