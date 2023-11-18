// 重试多次
// 使用一个新的Promise包装，执行方法如果成功就resolve，如果不成功就等待后再次执行方法直到重试次数结束。

Promise.retry = async (fn, times, delay) => {
  // return new Promise((res, rej) => {
  //   const run = () => {
  //     fn().then((v) => {
  //       res(v)
  //     }).catch((err) => {
  //       if (times === 0) {
  //         rej(err)
  //         return
  //       }
  //       times--
  //       console.log('重试中', times);
  //       setTimeout(run, delay)
  //     })
  //   }
  //   run()
  // })

  // async
  const sleep = () => new Promise(res => setTimeout(res, delay))
  while (true) {
    try {
      return await fn()
    } catch (error) {
      if (times === 0) {
        throw error
      }
      times--
      await sleep()
      console.log('重试中', times);
    }
  }
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