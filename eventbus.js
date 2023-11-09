// 如何实现一个Event
class EventEmitter {
  constructor() {
    this.eventBus = this.eventBus || {}
  }
  emit(type, params) {
    this.eventBus[type]?.forEach((item) => {
      item(params)
    })
  }
  on(type, fn) {
    if (this.eventBus[type]) {
      this.eventBus[type].push(fn)
    } else {
      this.eventBus[type] = [fn]
    }
  }
}
bus = new EventEmitter()
bus.on("click", function (params) {
  console.log(params + '1')
})
bus.on("click", function (params) {
  console.log(params + '2')
})
bus.on("click", function (params) {
  console.log(params + '3')
})
bus.on("move", function (params) {
  console.log(params)
})
bus.emit("click", "hello")
bus.emit("move", "move") 