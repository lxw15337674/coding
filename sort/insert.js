// 插入排序
// 将第一个元素视为有序序列，剩下的元素作为未排序序列。从头到尾扫描未排序序列，将当前元素插入到有序序列的合适位置。如果待插入的元素与有序序列中的某个元素相等或大于，则将待插入元素插入到相等元素的后面。重复步骤 2 和 3，直到未排序序列为空。
// 这个过程类似于玩斗地主时抓牌的过程，将每张新抓的牌与手中已有的牌进行比较，找到合适的位置插入。

const insertSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    let j = i
    let temp = array[j]
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}


const array = [4, 5, 7, 3, 2, 1, 3, 6];
insertSort(array)
console.log(array);