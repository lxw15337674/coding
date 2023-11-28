// 给定任意二维数组，输出所有的排列组合项。
// 比如 [['A','B'], ['a','b'], [1, 2]]，输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']

// 回溯
const permutate = (arr) => {
  const res = []
  const tra = (str, arr) => {
    if (!arr.length) {
      res.push(str)
      return str
    }
    const [currentAttr, ...restArr] = arr
    for (let char of currentAttr) {
      tra(str + char, restArr)
    }
  }
  tra('', arr)
  return res
}

console.log(permutate([
  ['A', 'B'],
  ['a', 'b'],
  [1, 2]
]))