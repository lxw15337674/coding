// 重试多次
// 使用一个新的Promise包装，执行方法如果成功就resolve，如果不成功就等待后再次执行方法直到重试次数结束。

Promise.retry = async (fn, times, delay) => {
  let count = 0
  return new Promise((res, rej) => {
    const run = () => {
      fn().then(v => {
        res(v)
      }).catch((err) => {
        if (count === times) {
          rej(err)
          return
        } else {
          console.log('retry')
          count++
          setTimeout(run, delay)
        }
      })
    }
    run()
  })
};


const resolveData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => (Math.random() > 0.5 ? resolve('成功') : reject(new Error('失败')))
      , 1000,
    )
  })
}

Promise.retry(resolveData, 3, 1000).then(res => {
  console.log(res);
})