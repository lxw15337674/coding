// 选择排序
// 找到数据结构中的最小值并 将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let min = i
    for (let j = i; j < array.length; j++) {
      if (array[min] > array[j]) {
        min = j
      }
    }
    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]]
    }
  }
}


const array = [4, 5, 7, 3, 2, 1, 6];
selectionSort(array)
console.log(array);