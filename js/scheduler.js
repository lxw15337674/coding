// 时间分片

// function scheduler(tasks) {
//   const DEFAULT_RUNTIME = 16;
//   let sum = 0
//   const startTime = performance.now()
//   while (tasks.length > 0) {
//     if (performance.now() - startTime > DEFAULT_RUNTIME) {
//       setTimeout(() => scheduler(tasks))
//     }
//     const task = tasks.shift()
//     const value = task()
//     sum += value
//   }
// }

const scheduler = (tasks) => {
  const DEFAULT_RUNTIME = 16;
  let isAbort = false;
  const { port1, port2 } = new MessageChannel()
  const promise = new Promise((resolve, reject) => {
    const runner = () => {
      const prevTime = performance.now()
      while (performance.now() - prevTime < DEFAULT_RUNTIME) {
        if (isAbort) {
          resolve()
        }
        if (!tasks.length) {
          resolve()
        }
        tasks.shift()()
      }
      port2.postMessage('')
    }
    port1.onmessage = function () {
      runner();
    };
    port2.postMessage('');
  })
  promise.abort = () => {
    isAbort = true;
  };
  return promise;
}


const tasks = [];
for (let i = 0; i < 10000; i++) {
  tasks.push(() => {
    for (let j = 0; j < 1000000; j++) {
      console.log(j);
    }
  });
}
// 这里先只看 runner 的耗时
console.time();
scheduler(tasks);
console.timeEnd();