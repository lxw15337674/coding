// 快速排序
//它采用分治的思想来进行排序。快速排序的基本思想是选择一个基准元素，通过一趟排序将待排序的序列分割成独立的两部分，其中一部分的所有元素都小于基准元素，另一部分的所有元素都大于基准元素，然后对这两部分分别进行递归排序，最终得到一个有序序列。

const quickSort = (array) => {
  const sort = (arr, left, right) => {
    if (left >= right) {
      return;
    }
    let l = left;
    let r = right;
    const mid = Math.floor((left + right) / 2);
    const baseVal = arr[mid]; // 使用子序列的中间值作为基准值
    while (l <= r) {
      while (arr[l] < baseVal) {
        l++;
      }
      while (arr[r] > baseVal) {
        r--;
      }
      if (l <= r) {
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++;
        r--;
      }
    }
    sort(arr, left, r); // 对基准值左侧的子序列进行递归排序
    sort(arr, l, right); // 对基准值右侧的子序列进行递归排序
  }
  sort(array, 0, array.length - 1);
}


const array = [4, 5, 7, 3, 1, 2, 6, 9, 8, 3, 2];
quickSort(array)
console.log(array);