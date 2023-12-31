// 实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。

const timeout = ms => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
  console.log('1');
  return 1;
});

const ajax2 = () => timeout(1000).then(() => {
  console.log('2');
  return 2;
});

const ajax3 = () => timeout(2000).then(() => {
  console.log('3');
  return 3;
});

const mergePromise = ajaxArray => {
  const data = []
  let count = 0
  return new Promise((res) => {
    ajaxArray.forEach((ajax, index) => {
      ajax().then((v) => {
        count++
        data[index] = v
        if (count === ajaxArray.length) {
          res(data)
        }
      })
    })
  })
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
