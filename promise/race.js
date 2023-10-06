function race(promises) {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        res(v)
      }).catch(err => {
        rej(err)
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

race(promises).then((res) => {
  console.log(res)
})