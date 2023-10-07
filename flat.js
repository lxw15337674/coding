
// 递归
// const flat = (array) => {
//   const res = []
//   for (let item of array) {
//     if (Array.isArray(item)) {
//       res.push(...flat(item))
//     } else {
//       res.push(item)
//     }
//   }
//   return res
// }

// 循环
const flat = (array) => {
  const res = []
  while (array.length) {
    const item = array.shift()
    if (Array.isArray(item)) {
      array.unshift(...item)
    } else {
      res.push(item)
    }
  }
  return res
}









console.log(flat([1, 2, 3, [4, [5, [6]]]])); // [1, 2, 3, 4, 5, [6]]
