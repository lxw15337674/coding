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
    if (!this.map[emit]) {
      this.map[emit] = []
    }
    const onceFn = () => {
      fn()
      // 注意这个地方
      this.off(emit, onceFn)
    }
    this.map[emit].push(onceFn)
  },
  off: function (emit, fn) {
    let fns = this.map[emit]
    fns = fns.filter(callback => fn !== callback)
    this.map[emit] = fns
  },
  notify: function (emit) {
    const fns = this.map[emit] ?? []
    for (let fn of fns) {
      fn()
    }
  }
}

const pub = Publisher
const log2 = () => {
  console.log('log2')
}
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
console.log('-------------------')
pub.notify('log')
console.log('-------------------')
pub.off('log', log2)
pub.notify('log')
