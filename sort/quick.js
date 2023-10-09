// 快速排序
//它采用分治的思想来进行排序。快速排序的基本思想是选择一个基准元素，通过一趟排序将待排序的序列分割成独立的两部分，其中一部分的所有元素都小于基准元素，另一部分的所有元素都大于基准元素，然后对这两部分分别进行递归排序，最终得到一个有序序列。

// const quickSort = (array) => {
//   const sort = (arr, left, right) => {
//     if (left >= right) {
//       return;
//     }
//     let l = left;
//     let r = right;
//     const mid = Math.floor((left + right) / 2);
//     const baseVal = arr[mid]; // 使用子序列的中间值作为基准值
//     while (l <= r) {
//       while (arr[l] < baseVal) {
//         l++;
//       }
//       while (arr[r] > baseVal) {
//         r--;
//       }
//       if (l <= r) {
//         [arr[l], arr[r]] = [arr[r], arr[l]];
//         l++;
//         r--;
//       }
//     }
//     sort(arr, left, r); // 对基准值左侧的子序列进行递归排序
//     sort(arr, l, right); // 对基准值右侧的子序列进行递归排序
//   }
//   sort(array, 0, array.length - 1);
// }

// js语言快速排序
// 最简单版
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0]; // 选择第一个元素作为基准点
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]); // 小于基准点的元素放入左边数组
    } else {
      right.push(arr[i]); // 大于等于基准点的元素放入右边数组
    }
  }

  const sortedLeft = quickSort(left); // 对左边数组进行递归排序
  const sortedRight = quickSort(right); // 对右边数组进行递归排序

  return [...sortedLeft, pivot, ...sortedRight]; // 返回排序后的数组
}
const arr = [4, 2, 8, 5, 1, 9, 6, 3, 7];
const sortedArr = quickSort(arr);
console.log(sortedArr);