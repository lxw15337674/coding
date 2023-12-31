// 实现一个轮询方法，返回一个取消方法，能够强制中断轮询
// 当异步方法成功时，通过回调返回结果并且结束轮询；当异步方法失败时，隔一段时间进行重试，且每次重试的时间是上一次的两倍（第一次的重试时间为 1s）。
// 用一个promise包装，如果成功则直接resolve，如果失败则继续轮询，如果取消则直接reject

function sendWithRetry(fn, onSuccess, onCancel) {
  let delay = 100
  let cancel = false
  let error = null
  let timeId = null
  new Promise((res, rej) => {
    cancel = () => {
      clearTimeout(timeId)
      rej(error)
    }
    const run = () => {
      console.log('run')
      fn().then(v => {
        res(v)
      }).catch(err => {
        console.log('重试', delay);
        error = err
        timeId = setTimeout(run, delay)
        delay = delay * 2
      })
    }
    run()
  }).then(v => {
    onSuccess(v)
  }).catch(err => {
    onCancel(err)
  })
  return cancel
}

const cancel = sendWithRetry(
  () => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => (Math.random() > 0.8 ? resolve('成功') : reject(new Error('失败')))
        , 100,
      )
    })
  },
  (data) => {
    console.log("结果：", data);
  },
  () => {
    console.log("被取消了");
  }
);

setTimeout(() => {
  cancel(); // 取消、中断轮询
}, 3000);