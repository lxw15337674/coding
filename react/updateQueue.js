// https://juejin.cn/post/6943896410987659277?searchId=20231026151725032AAFD592BAFB02DE3D

class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload // payload 数据
    this.nextUpdate = nextUpdate // 指向下一个节点的指针
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null //state
    this.firstUpdate = null // 第一次更新
    this.lastUpdate = null // 最后一次更新
  }

  enqueueUpdate(update) {
    if (this.firstUpdate) {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    } else {
      // 当前链表是空链表
      this.firstUpdate = this.lastUpdate = update
    }
  }

  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      let nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload
      currentState = { ...currentState, ...nextState }
      currentUpdate = currentUpdate.nextUpdate
    }
    // 更新完成后清空链表
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState
  }
}

let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: 'www' }))
queue.enqueueUpdate(new Update({ age: 10 }))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.forceUpdate()
console.log(queue.baseState);

