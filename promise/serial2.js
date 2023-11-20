// 实现一个promise封装函数，串行执行promise

let num = 0;
function request() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(++num);
    }, 1000);
  }).then((data) => {
    console.log(data)
  })
}


function iteratorPromise(...arr) {
  const queue = []
  for (let fn of arr) {
    new Promise(res => {
      queue.push(res)
    }).then(() => {
      fn().then(() => {
        if (queue.length) {
          queue.shift()()
        }
      })
    })
  }
  queue.shift()()
}

iteratorPromise(request, request, request);
