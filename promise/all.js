// 多个promise一次执行，在所有 Promise 都成功解决后返回一个结果数组，或在其中任何一个 Promise 失败时返回一个错误。
function all(promises) {
  return new Promise((res, rej) => {
    const result = []
    let count = 0
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((v) => {
        result[i] = v
        count++
        if (count === promises.length) {
          res(result)
        }
      }).catch((error) => {
        rej(error)
      })
    }
  })
}


function asyncTask(value) {
  return new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      resolve(value * 2);
    }, 1000);
  });
}

const promises = [asyncTask(1), asyncTask(2), asyncTask(3)];

all(promises).then((res) => {
  console.log(res)
})