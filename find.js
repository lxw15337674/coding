// 二分查找
// 初始化左边界 left 为数组的起始位置，右边界 right 为数组的结束位置。
// 当 left <= right 时，执行以下步骤：
// a.计算中间位置 mid，可以使用 mid = Math.floor((left + right) / 2)。
// b.如果中间位置的元素等于目标元素，则返回该位置，表示找到目标元素。
// c.如果中间位置的元素大于目标元素，则将右边界 right 更新为 mid - 1，表示目标元素可能在左半部分。
// d.如果中间位置的元素小于目标元素，则将左边界 left 更新为 mid + 1，表示目标元素可能在右半部分。
// 如果循环结束仍然没有找到目标元素，则返回不存在的标志（如 - 1）。

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // 找到目标元素，返回索引
    } else if (arr[mid] > target) {
      right = mid - 1; // 目标元素可能在左半部分，更新右边界
    } else {
      left = mid + 1; // 目标元素可能在右半部分，更新左边界
    }
  }
  return -1; // 未找到目标元素，返回 - 1
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 9;

const result = binarySearch(arr, target);
console.log(result); // 输出：4（目标元素 9 在数组中的索引位置）