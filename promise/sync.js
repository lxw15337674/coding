function double(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2 * num)
    }, 1000)
  })
}

// function test1() {
//   const nums = [1, 2, 3];
//   nums.forEach(async x => {
//     const res = await double(x);
//     console.log(res);
//   })
// }
// test1();

//   2,
//   4,
//   6,

// 改成同步

// async function test1() {
//   const nums = [1, 2, 3];
//   for (let x of nums) {
//     const res = await double(x)
//     console.log(res);
//   }
// }
// test1();