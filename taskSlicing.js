function scheduler(tasks) {
  const DEFAULT_RUNTIME = 16;
  let sum = 0
  const startTime = Performance.now()
  while (tasks.length > 0) {
    if (Performance.now() - startTime > DEFAULT_RUNTIME) {
      setTimeout(() => scheduler(tasks))
    }
    const task = tasks.shift()
    const value = task()
    sum += value
  }
}

const tasks = [];
for (let i = 0; i < 10000; i++) {
  tasks.push(() => {
    for (let j = 0; j < 1000000; j++) { }
  });
}
// 这里先只看 runner 的耗时
console.time();
scheduler(tasks);
console.timeEnd();