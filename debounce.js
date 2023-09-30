// 多次请求，只执行最后一次
function debounce(fn, delay = 500) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}

const log = debounce((i) => console.log(i))
for (let i = 0; i < 5; i++) {
  console.log(i);
  log(i)
}