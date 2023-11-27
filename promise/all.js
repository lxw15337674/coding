
const p1 = Promise.resolve('p1')

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1.5秒')
  }, 1500)
})



const promiseAll = (promises) => {
  return new Promise((res, rej) => {
    const resList = []
    let count = promises.length
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        resList[i] = v
        count--
        if (count === 0) {
          res(resList)
        }
      }).catch(err => {
        rej(err)
      })
    }
  })
}



// 所有Promise实例都成功
promiseAll([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]

// 一个Promise实例失败
promiseAll([p1, p2, p4])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // p4 rejected

// 一个延时失败的Promise
promiseAll([p1, p2, p5])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // 1.5秒后打印 p5 rejected

// 两个Promise实例失败
promiseAll([p1, p4, p5])
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err)) // p4 rejected
