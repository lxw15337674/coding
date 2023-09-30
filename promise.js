// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({ test: 1 })
//     resolve({ test: 2 })
//     reject({ test: 2 })
//   }, 1000)
// }).then((data) => {
//   console.log('result1', data)
// }, (data1) => {
//   console.log('result2', data1)
// }).then((data) => {
//   console.log('result3', data)
// })
//result1 { test: 1 }
//result3 undefined


class myPromise {
  constructor(fn) {
    this.status = 'pending'
    this.value = null
    this.resQueue = []
    this.rejQueue = []
    let resolve = (value) => {
      let run = () => {
        if (this.status !== 'pending') return
        this.status = 'fulfilled'
        this.value = value
        for (let callback of this.resQueue) {
          callback(value)
        }
      }
      setTimeout(run)
    }
    let reject = (reason) => {
      let run = () => {
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.data = null
        for (let callback of this.rejectQueue) {
          callback(reason)
        }
      }
      setTimeout(run)
    }
    fn(resolve, reject)
  }
  then(resFn, rejFn) {
    return new myPromise((resolve, reject) => {
      let fulFn = value => {
        try {
          resolve(resFn(value))
        } catch (error) {
          rejFn(error)
        }
      }
      let rejectedFn = error => {
        try {
          resolve(rejectFn(error))
        } catch (error) {
          reject(error)
        }
      }
      switch (this.status) {
        case PENDING:
          this.resolveQueue.push(fulfilledfn);
          this.rejectQueue.push(rejectedFn)
          break
        case FULFILLED:
          fulfilledfn(this.data)
          break
        case REJECTED:
          rejectFn(this.data)
          break
      }
    })
  }

}