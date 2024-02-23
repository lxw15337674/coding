// 判断当前传入函数的参数个数 (args.length) 是否大于等于原函数所需参数个数 (fn.length) ，
// 如果是，则执行当前函数；如果是小于，则返回一个函数。例如：实现add(1)(2)(3)
// 这个地方不能使用箭头函数，否则this的值可能会被绑定到错误的上下文。
const currying = function (fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return function (...moreArgs) {
      return currying(fn, ...args, ...moreArgs);
    };
  }
};

const add = currying((a, b, c) => {
  console.log(a, b, c)
})

add(1)(2)(3)
add(1, 2)(3)
