// 实现一个promise封装函数，多次执行promise只会执行一次，后面的会等第一个执行完后返回第一次执行的值
function request() {
  let num = 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(++num);
    }, 1000);
  });
}


// 如果正在请求则不在请求
function createCachedPromise(promiseFn) {
  let cachePromise = null;
  let cacheResult = null;

  return function () {
    if (!cachePromise) {
      cachePromise = promiseFn().then(v => {
        cacheResult = v
        return v
      })
      return cachePromise
    } else {
      return cachePromise.then(() => {
        return cacheResult
      })
    }
  };
}

const run = createCachedPromise(request)


run().then(res => {
  console.log(res)
})
run().then(res => {
  console.log(res)
})
run().then(res => {
  console.log(res)
})



// run().then(res => {
//   console.log(res)
// })
// run().then(res => {
//   console.log(res)
// })
// run().then(res => {
//   console.log(res)
// })
