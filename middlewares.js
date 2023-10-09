const m1 = async next => {
  console.log("m1 run");
  await next();
  console.log("result1");
};

const m2 = async next => {
  console.log("m2 run");
  await next();
  console.log("result2");
};
const m3 = async next => {
  console.log("m3 run");
  await next();
  console.log("result3");
};

const middlewares = [m1, m2, m3];

function useApp() {
  const next = () => {
    const mid = middlewares.shift()
    if (mid) {
      return Promise.resolve(
        mid(next)
      )
    } else {
      return Promise.resolve('end')
    }
  }
  next()
}
// 启动中间件
useApp();

// 依次打印：
// m1 run
// m2 run
// m3 run
// result3
// result2
// result1
