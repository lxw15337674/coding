const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      // promise执行一次后，不会再执行
      resolve(6);
      reject(10)
    }, 0)
    resolve(1);
  });
  resolve(2);
  p.then((arg) => {
    console.log(arg);
  });
}));
first().then((arg) => {
  console.log(arg);
}).catch(arg=>{
  console.log(arg);
})
console.log(4);

// 3