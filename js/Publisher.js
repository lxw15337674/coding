// 发布订阅模式
//注意点：在once，要删除封装后的onceFn，
let Publisher = {
  map: {},
  add: function (emit, fn) {
    if (!this.map[emit]) {
      this.map[emit] = []
    }
    this.map[emit].push(fn)
  },
  once: function (emit, fn) {
    const onceFn = () => {
      fn()
      this.off(emit, onceFn)
    }
    this.add(emit, onceFn)
  },
  off: function (emit, fn) {
    let fns = this.map[emit]
    this.map[emit] = fns.filter(callback => fn !== callback)
  },
  notify: function (emit) {
    for (let fn of this.map[emit]) {
      fn()
    }
  }
}

const pub = Publisher
const log2 = () => {
  console.log('log2')
}
console.log('-------------------')
pub.once('log', () => {
  console.log('onceLog1')
})
pub.add('log', () => {
  console.log('log1')
})
pub.add('log', log2)
pub.once('log', () => {
  console.log('onceLog2')
})
pub.notify('log')
// 输出结果：
// onceLog1
// log1
// log2
// onceLog2
console.log('-------------------')
pub.notify('log')
// 输出结果
// log1
// log2
console.log('-------------------')
pub.off('log', log2)
pub.notify('log')
// 输出结果
// log1
