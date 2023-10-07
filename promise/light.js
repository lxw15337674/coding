// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：

function light(fn, time) {
  return new Promise((res) => {
    setTimeout(() => {
      fn()
      res()
    }, time)
  })
}

function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}


// const loop = async () => {
//   await light(red, 3000)
//   await light(green, 2000)
//   await light(yellow, 1000)
//   loop()
// }

const loop = async () => {
  Promise.resolve().then(function () {
    return light(red, 3000);
  }).then(function () {
    return light(green, 2000);
  }).then(function () {
    return light(yellow, 1000);
  }).then(function () {
    loop();
  });
}

loop()