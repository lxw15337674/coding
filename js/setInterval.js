// 用setTimeout模拟setInterval
function interval(fn, time) {
  let timer = null;
  const intervalFn = () => {
    fn();
    timer = setTimeout(intervalFn, time);
  }
  timer = setTimeout(intervalFn, time);
  return timer;
}