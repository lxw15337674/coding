// 按照顺序输出，并尽可能早的输出
// 如果需要同时执行，就先直接执行，然后再根据值输出值
const printInOrderPromise = async (promises) => {
  const queue = promises.map(item => item());
  for (let i = 0; i < queue.length; i++) {
    console.log(await queue[i]);
  }
}

// 第 2 秒输出 'a'
// 立即输入 'b'
// 第 3 秒输出 ’c'
const a = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('a')
    }, 2000)
  })
}
const b = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('b')
    }, 1000)
  })
}
const c = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('c')
    }, 3000)
  })
}
printInOrderPromise([a, b, c])



