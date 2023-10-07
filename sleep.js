// 方法一：
// 这种实现方式是利用一个伪死循环阻塞主线程。
// 因为JS是单线程的，所以通过这种方式可以实现真正意义上的sleep
function sleep1(fn, time) {
  let start = new Date().getTime();
  while (new Date().getTime() - start < time) {
    continue;
  }
  fn();
}

// 方式二： 定时器
function sleep2(fn, time) {
  setTimeout(fn, time);
}

// 方式三： promise
function sleep3(fn, time) {
  new Promise(resolve => {
    setTimeout(resolve, time);
  }).then(() => {
    fn();
  });
}

// 方式四： async await
async function sleep4(fn, time) {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
  fn();
}
function fn() { console.log("fn") }

sleep1(fn, 2000);
sleep2(fn, 2000);
sleep3(fn, 2000);
sleep4(fn, 2000);
