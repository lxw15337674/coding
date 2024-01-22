// // JS变量作用域存在于函数体中即函数体，并且变量的作用域是在函数定义声明的时候就是确定的，而非在函数运行时。
// // https://driverzhang.github.io/post/%E9%9D%A2%E8%AF%95%E6%80%BB%E7%BB%93%E4%B8%89/
// function fun(n, o) {
//   console.log(o);
//   return {
//     fun: function (m) {
//       return fun(m, n);
//     }
//   }
// }

// var a = fun(0); //undefined
// a.fun(1); // 0
// a.fun(2); // 0
// a.fun(3); //0

// var b = fun(0).fun(1).fun(2).fun(3);  //undefined,0,1,2

// var c = fun(0).fun(1); //undefined,0,
// c.fun(2); //1  
// c.fun(3); //1







// const fn = () => {
//   this.name = 'global';
//   let obj = {
//     name: 'obj',
//     dose: function () {
//       this.name = 'dose';
//       return function () {
//         return this.name;
//       }
//     }
//   }
//   console.log(obj.dose().call(this))
// }

// fn()



var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

var foo = checkscope();
console.log(foo())


