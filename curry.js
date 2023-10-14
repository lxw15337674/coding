// 判断当前传入函数的参数个数 (args.length) 是否大于等于原函数所需参数个数 (fn.length) ，如果是，则执行当前函数；如果是小于，则返回一个函数。例如：实现add(1)(2)(3)

// function curry(fn, ...currentArgs) {
//   const length = fn.length
//   return (...args) => {
//     const argsList = [...currentArgs, ...args]
//     if (argsList.length < length) {
//       return curry(fn, ...argsList)
//     }
//     if (argsList.length === length) {
//       return fn(...argsList)
//     }
//   }
// }

const add = curry((a, b, c) => {
  console.log(a, b, c)
})

add(1)(2)(3)
add(1, 2)(3)