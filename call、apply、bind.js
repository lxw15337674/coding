// call  更改 this 指向，第一个参数作为函数的 this 指向，其余参数作为函数的参数，执行参数。 object.call(obj,arg1,arg2,...)
// apply 第一个参数作为 this 指向，第二个参数为数组提供函数的参数，执行函数。 object.apply(obj,[arg1,arg2,...])


function test(count1, count2) {
  console.log(this.sum, count1, count2)
}


function call1(obj, ...args) {
  const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  obj = obj || window //  若没传入，则默认绑定window对象
  obj[fn] = this
  const res = obj[fn](...args)
  delete obj[fn]
  return res
}


Function.prototype.call1 = call1

test.call1({
  sum: 1
}, 2, 3)


function apply1(obj, args) {
  const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  obj = obj || window //  若没传入，则默认绑定window对象
  obj[fn] = this
  const res = obj[fn](...args)
  delete obj[fn]
  return res
}


Function.prototype.apply1 = apply1

test.apply1({
  sum: 1
}, [2, 3])


function bind1(obj, ...args) {
  let fn = () => {
    this.call1(obj, ...args)
  }
  return fn
}

Function.prototype.bind1 = bind1

test.bind1({
  sum: 1
}, 2, 3)()
