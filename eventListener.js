let eventEmitter = {
  map: new Map(),
  on: function (emit, fn) {
    const fns = this.map.get(emit) ?? []
    fns.push(fn)
    this.map.set(emit, fns)
  },
  once: function (emit, fn) {
    const fns = this.map.get(emit) ?? []
    const index = fns.length
    fns.push(() => {
      fn()
      fns.splice(index, 1);
    })
    this.map.set(emit, fns);
  },
  trigger: function (emit) {
    const fns = this.map.get(emit) ?? []
    fns.forEach(fn => fn())
  },
  delete: function (emit, fn) {
    const fns = this.map.get(emit) ?? []
    if (fn) {
      const index = fns.indexOf(fn)
      if (index !== -1) {
        fns.splice(index, 1)
      }
    } else {
      fns.length = 0
    }
    this.map.set(emit, fns)
  }
};

const log = () => {
  console.log('log')
}
const onceLog = () => {
  console.log('onceLog')
}

eventEmitter.on('event1', log)
eventEmitter.once('event2', onceLog)

eventEmitter.trigger('event1') // 输出: log
eventEmitter.trigger('event1') // 输出: log

eventEmitter.trigger('event2') // 输出: onceLog
eventEmitter.trigger('event2') // 不输出任何内容

eventEmitter.delete('event1', log)

eventEmitter.trigger('event1') // 不输出任何内容