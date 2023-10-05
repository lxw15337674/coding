// 归并排序
// 将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。 时间复杂度为 O(n log n)。

const mergeSort = (array) => {
  const merge = (left, right) => {
    const res = []
    let l = 0, r = 0
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        res.push(left[l++])
      } else {
        res.push(right[r++])
      }
    }
    while (l < left.length) {
      res.push(left[l++])
    }
    while (r < right.length) {
      res.push(right[r++])
    }
    return res
  }
  const mergeSortRec = (array) => {
    if (array.length === 1) {
      return array
    }
    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid, array.length)
    return merge(mergeSortRec(left), mergeSortRec(right))
  }
  return mergeSortRec(array)
}


const array = [4, 5, 7, 3, 2, 1, 6];
mergeSort(array)
console.log(array);