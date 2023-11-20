// 实现一个轮询方法，返回一个取消方法，能够强制中断轮询
// 当异步方法成功时，通过回调返回结果并且结束轮询；当异步方法失败时，隔一段时间进行重试，且每次重试的时间是上一次的两倍（第一次的重试时间为 1s）。
// 用一个promise包装，如果成功则直接resolve，如果失败则继续轮询，如果取消则直接reject

function sendWithRetry(fn, onSuccess, onCancel) {
  let delay = 100
  let cancel = () => { }
  let error = null

  const run = () => new Promise((res, rej) => {
    cancel = () => {
      rej(error)
    }
    fn().then((v) => {
      res(v)
    }, (err) => {
      console.log('失败', err)
      error = err
      setTimeout(() => {
        delay = delay * 2
        run()
      }, delay)
    })
  }).then(v => {
    onSuccess(v)
    return v
  }).catch(err => {
    onCancel(err)
  })

  return { run, cancel }
}

const { run, cancel } = sendWithRetry(
  () => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          const num = Math.random()
          num > 0.5 ? resolve(num) : reject(num)
        }, 100,
      )
    })
  },
  (data) => {
    console.log("成功", data);
  },
  () => {
    console.log("被取消了");
  }
)

run().then(v => {
  console.log('链式调用', v);
})

setTimeout(() => {
  cancel(); // 取消、中断轮询
}, 3000);

