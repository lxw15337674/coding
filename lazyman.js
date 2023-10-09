// 第 56 题：要求设计 LazyMan 类，实现以下功能。
async function sleep(time) {
  await new Promise((res) => {
    setTimeout(() => {
      res()
    }, time * 1000)
  })
}
class LazyManClass {
  fn = []
  constructor(name) {
    console.log(` Hi I am ` + name);
    setTimeout(async () => {
      for (let item of this.fn) {
        await item()
      }
    })
  }
  eat(name) {
    this.fn.push(() => {
      console.log(
        `I am eating ${name}`
      )
    })
    return this
  }

  sleep(time) {
    this.fn.push(() => sleep(time))
    return this

  }

  sleepFirst(time) {
    this.fn.unshift(() => sleep(time))
    return this
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}

// LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// // Hi I am Tony
// // I am eating lunch
// // 等待了10秒...
// // I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food