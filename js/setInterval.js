// 用setTimeout模拟setInterval
function interval(fn, time) {
  const intervalFn = () => {
    fn();
    setTimeout(intervalFn, time);
  }

  setTimeout(intervalFn, time);
}