// 多次请求，只执行最后一次
// function debounce(fn, delay = 500) {
//   let timer = null
//   return (...args) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, delay)
//   }
// }

// 加强版防抖多次请求，只执行最后一次，但在一定时间内会请求一次
function debounce(fn, delay = 500) {
  let timer = null
  let startTime = null
  return (...args) => {
    clearTimeout(timer)
    if (startTime && new Date() - startTime >= delay) {
      fn.call(this, ...args)
      startTime = null
    } else {
      if (!startTime) {
        startTime = new Date()
      }
      setTimeout(() => {
        fn.call(this, ...args)
      }, delay)
    }
  }
}

const log = debounce((i) => console.log(i))
const sleep = (delay) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, delay)
  })
}
const run = async () => {
  for (let i = 0; i < 5; i++) {
    log(i)
    await sleep(200)
  }
}

run()