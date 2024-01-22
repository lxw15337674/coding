// console.log("script start");
setTimeout(function () {
  console.log("timeout1");
}, 10);
new Promise((resolve) => {
  console.log("promise1");
  resolve();
  setTimeout(() => console.log("timeout2"), 10);
}).then(function () {
  console.log("then1");
});
console.log("script end");

// script start
// promise1
// script end
// then1
// timeout1
// timeout2







// const first = () => (new Promise((resolve, reject) => {
//   console.log(3);
//   let p = new Promise((resolve, reject) => {
//     console.log(7);
//     setTimeout(() => {
//       console.log(5);
//       resolve(6);
//     }, 0)
//     resolve(1);
//   });
//   resolve(2);
//   p.then((arg) => {
//     console.log(arg);
//   });

// }));

// first().then((arg) => {
//   console.log(arg);
// });
// console.log(4);

// 3
// 7
// 4
// 1
// 2
// 5

// 第一轮事件循环
// 先执行宏任务，主script ，new Promise立即执行，输出【3】，
// 执行 p 这个new Promise 操作，输出【7】，
// 发现 setTimeout，将回调放入下一轮任务队列（Event Queue），p 的 then，姑且叫做 then1，放入微任务队列，发现 first 的 then，叫 then2，放入微任务队列。执行console.log(4)，输出【4】，宏任务执行结束。
// 再执行微任务，执行 then1，输出【1】，
// 执行 then2，输出【2】。
// 到此为止，第一轮事件循环结束。开始执行第二轮。
// 第二轮事件循环
// 先执行宏任务里面的，也就是 setTimeout 的回调，输出【5】。
// resolve(6) 不会生效，因为 p 这个 Promise 的状态一旦改变就不会在改变了。


console.log("script start");
async function async1() {
  await async2(); // await 隐式返回promise
  console.log("async1 end"); // 这里的执行时机：在执行微任务时执行
}
async function async2() {
  console.log("async2 end"); // 这里是同步代码
}
async1();
setTimeout(function () {
  console.log("setTimeout");
}, 0);
new Promise(resolve => {
  console.log("Promise"); // 这里是同步代码
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });
console.log("script end");


// script start
// async2 end
// Promise
// "script end"
// async1 end
// promise1
// promise2
// setTimeout







