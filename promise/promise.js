const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// base
class myPromise {
  constructor(fn) {
    this.status = 'pending'
    this.value = null
    this.resQueue = []
    this.rejQueue = []
    let resolve = (value) => {
      setTimeout(() => {
        if (this.status !== 'pending') return
        this.status = 'fulfilled'
        this.value = value
        for (let callback of this.resQueue) {
          callback(value)
        }
      })
    }
    let reject = (reason) => {
      setTimeout(() => {
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.data = null
        for (let callback of this.rejQueue) {
          callback(reason)
        }
      })
    }
    fn(resolve, reject)
  }
  then(resFn, rejFn) {
    return new Promise((res, rej) => {
      let fulfilledFn = (v) => {
        try {
          res(resFn(v))
        } catch (error) {
          rej(error)
        }
      }
      let rejectedFn = (v) => {
        try {
          res(resFn(rejFn))
        } catch (error) {
          rej(error)
        }
      }
      switch (this.status) {
        case PENDING:
          this.resQueue.push(fulfilledFn);
          this.rejQueue.push(rejectedFn)
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
  catch(fn) {
    return this.then(null, fn)
  }
  finally(callback) {
    return this.then(
      (res) => {
        callback()
        return res
      },
      (res) => {
        callback()
        throw res
      }
    )
  }
  resolve(value) {
    return new Promise(resolve => resolve(value))
  }
  reject(value) {
    return new Promise((reject, reject) => { this.reject(value) })
  }
}



new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ test: 1 })
    resolve({ test: 2 })
    reject({ test: 2 })
  }, 1000)
}).then((data) => {
  console.log('result1', data)
}, (data1) => {
  console.log('result2', data1)
}).then((data) => {
  console.log('result3', data)
})
// result1 { test: 1 }
// result3 undefined



