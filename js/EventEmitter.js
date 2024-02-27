// 发布订阅模式
//注意点：在once，要删除封装后的onceFn，
class EventEmitter {
  events = {};

  on(eventName, callback) {
    if (this.events[eventName]) {
      if (eventName !== "newListener") {
        this.emit("newListener", eventName);
      }
    }
    const callbacks = this.events[eventName] || [];
    callbacks.push(callback);
    this.events[eventName] = callbacks;
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName] || [];
    callbacks.forEach((cb) => cb(...args));
  }

  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };
    one.initialCallback = callback;
    this.on(eventName, one);
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName] || [];
    const newCallbacks = callbacks.filter(
      (fn) => fn !== callback && fn.initialCallback !== callback /* 用于once的取消订阅 */
    );
    this.events[eventName] = newCallbacks;
  }
}

const pub = new EventEmitter();
const log2 = () => {
  console.log("log2");
};
console.log("-------------------");
pub.once("log", log2);
pub.off("log", log2);
pub.emit("log"); 
// 输出结果：无
console.log("-------------------");
pub.on('log', log2)
pub.once('log', () => {
  console.log('onceLog1')
})
pub.emit('log')
// 输出结果：
// log2
// onceLog2
pub.emit('log')
// 输出结果：
// log2
console.log('-------------------')
pub.emit('log')
// 输出结果
// log2
console.log('-------------------')
pub.off('log', log2)
pub.emit('log')
// 无输出结果

