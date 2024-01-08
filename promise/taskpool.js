// 实现一个 taskpool类，其至少具有 add 方法和最大并发数 max，该 add 方法接收函数(返回值为 promise)，当当前执行的任务数小于设定值 max 时，立即执行，大于 max，则等待任务空闲时执行该任务，模版代码如下:

class TaskPool {
  // 在此处写下你的实现
  list = []
  count = 0
  max = 0
  constructor(max) {
    this.max = max
  }
  add(task) {
    this.list.push(task)
    this.run()
  }
  run() {
    while (this.list.length && this.count < this.max) {
      const task = this.list.shift()
      this.count++
      task().finally(() => {
        this.count--
        this.run()
      })
    }
  }
}

const taskpool = new TaskPool(2);

for (let i = 0; i < 10; i++) {
  const task = () => new Promise(resolve => {
    setTimeout(() => {
      console.log(`task${i} complete`);
      resolve(`task${i}`);
    }, 2000);
  });
  taskpool.add(task);
}

// 预期输出
// 2s 后
// task0 complete
// task1 complete
// 再 2s 后
// task2 complete
// task3 complete
// 再 2s 后
// task4 complete
// task5 complete
// ...
// task8 complete
// task9 complete
