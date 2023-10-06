/**
 * 实现一个组合compose的方法，使其可以正确调用每个中间件
 *
 * 规定中间件写法：
 * function(val, next) {
 *    // 前置操作
 *    next(val + 1); // 触发下一个中间件
 *    // 后续操作
 * }
 */
function compose(...middlewares) {
  return (defaultValue) => {
    let res = defaultValue
    let i = 0
    const next = (v) => {
      res = v
      if (i < middlewares.length) {
        i++
        middlewares[i](res, next)
      }
    }
    middlewares[0](res, next)
  }
}

function add1(x, next) {
  console.log('add1 before');
  next(x + 1);
  console.log('add1 after');
}

function add2(x, next) {
  console.log('add2 before');
  next(x + 2);
  console.log('add2 after');
}

function output(x) {
  console.log('output:', x)
}

const input = 0;
compose(add1, add2, (output) => {
  console.log('output:', output);
})(input);

/**
 * 输出:
 *
 * add1 before
 * add2 before
 * output: 3
 * add2 after
 * add1 after
 */

