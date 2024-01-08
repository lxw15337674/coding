// 设计一个类 AsyncQueue，其具备两个方法，tap 和 exec，tap 可以绑定回调(可以绑定多个)，exec 执行回调。回调是一个函数，该函数接受一个入参 cb，如果在该函数中不主动调用 cb，则后续的回调不会执行。 

class AsyncQueue {
  constructor() {
    this.map = new Map()
  }
  // 事件注册
  tap(name, fn) {
    const tasks = this.map.get(name) ?? []
    tasks.push(fn)
    this.map.set(name, tasks)
  }
  // 事件触发
  exec(name, fn) {
    const tasks = this.map.get(name) ?? []
    let i = -1
    const run = () => {
      i++
      if (tasks[i]) {
        tasks[i](run)
      } else {
        fn()
      }
    }
    run()
  }
}

function fn1(cb) {
  console.log('fn1');
  cb();
}

function fn2(cb) {
  console.log('fn2');
  cb();
}

function fn3(cb) {
  setTimeout(() => {
    console.log('fn3');
    cb();
  }, 2000);
}

function fn4(cb) {
  setTimeout(() => {
    console.log('fn4');
    cb();
  }, 3000);
}

// 创建事件队列
const asyncQueue = new AsyncQueue();
// 注册事件队列
asyncQueue.tap('init', fn1);
asyncQueue.tap('init', fn2);
asyncQueue.tap('init', fn3);
asyncQueue.tap('init', fn4);

// 执行事件队列
asyncQueue.exec('init', () => {
  console.log('执行结束');
});

// 预期输出
// fn1
// fn2
// 2s 后
// fn3
// 再 3s 后
// fn4
// 执行结束
