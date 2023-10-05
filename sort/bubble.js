// 冒泡排序
// 比较任何两个相邻的项，如果第一个比第二个大，则交换它们；（每次比较都会找到一个最大的数在最后。

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
      }
    }
  }
  return array
}


const array = [4, 5, 7, 3, 2, 1, 6];
bubbleSort(array)
console.log(array);