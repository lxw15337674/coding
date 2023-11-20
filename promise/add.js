// 实现 Scheduler.add() 函数
// 根据当前请求数，如果超过限制，就使用新的 promise 来进堵塞后续的请求，把 promise 的 resolve 函数传入一个数组中，然后执行完的请求结束后之前队列最前面的resolve。

class Scheduler {
  queue = []
  count = 0
  add(task) {
    return new Promise((res) => {
      if (this.count >= 2) {
        this.queue.push(res)
      } else {
        this.count++
        res()
      }
    }).then(() => {
      return task().then((v) => {
        if (this.queue.length) {
          this.queue.shift()()
        } else {
          this.count--
        }
        return v
      })
    })
  }
}



const timeout = (time, v) => new Promise(resolve => {
  setTimeout(() => resolve(v), time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order))
    .then((v) => console.log(v))
}


// 限制同一时刻只能执行2个task
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')

//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列，到7.5秒打印3 
//...

