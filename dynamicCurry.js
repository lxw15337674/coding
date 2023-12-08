// 不定长参数
function curry(fn, ...args) {
  // 返回一个新函数
  const curried = (...restArgs) => {
    return curry(fn, ...args, ...restArgs)
  }
  // 重写toString
  curried.toString = () => {
    return fn(...args)
  }
  return curried;
}

function dynamicAdd(...args) {
  return args.reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
var add = curry(dynamicAdd);
// 需要在浏览器下执行
alert(add(1)(2)(3)(4)) // 10
alert(add(1, 2)(3, 4)(5, 6)) // 21
