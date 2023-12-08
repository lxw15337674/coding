// 每隔一秒输出 1、2、3
const oneToThree = () => {
  const arr = [1, 2, 3];
  let run = Promise.resolve()
  for (let item of arr) {
    run.then(() => {
      return new Promise((res) => {
        setTimeout(() => {
          console.log(item)
          res()
        }, 1000)
      })
    })
  }
};

console.log(oneToThree());
