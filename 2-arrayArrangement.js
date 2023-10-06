// 给定任意二维数组，输出所有的排列组合项。
// 比如 [['A','B'], ['a','b'], [1, 2]]，输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']



const permutate = (arr) => {
  let res = arr[0]
  for (let i = 1; i < arr.length; i++) {
    const temp = []
    for (let item of arr[i]) {
      for (let before of res) {
        temp.push(before + item)
      }
    }
    res = temp
  }
  return res
}

console.log(permutate([
  ['A', 'B'],
  ['a', 'b'],
  [1, 2]
]))