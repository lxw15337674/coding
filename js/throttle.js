//节流 一段时间内只能执行一次
function throttle(fn, delay) {
  let timer = null
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        //将实际的this和参数传入用户实际调用的函数
        fn.call(this, ...args)
      }, delay)
    }
  }
}

const log = throttle((i) => console.log(i, this))
for (let i = 0; i < 5; i++) {
  console.log(i);
  log(i)
}
