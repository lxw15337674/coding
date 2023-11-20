
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(-1)
  }, 1000)
}).then((data) => {
  console.log('result1', data)
  return 2
}).catch(err => {
  console.log('error1', err)
  return -2
}).then(data => {
  console.log('result2', data)
  return 3
})
  .catch(err => {
    console.log('error2', err)
    return -3
  })

promise.then(res => {
  console.log('result3', res)
}).catch(err => {
  console.log('error3', err)
})
// error1 -1
// result2 -2
// result3 3
