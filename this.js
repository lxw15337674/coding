var num = 10
const obj = { num: 20 }
obj.fn = (function (num) {
  this.num = num * 3
  num++
  return function (n) {
    this.num += n
    num++
    console.log(num)
  }
})(obj.num)
var fn = obj.fn // 因为自执行函数，相当于window.obj.fn(obj.num)，此时fn中this指向global,global.num=60+5=65，num是obj.num = 20+1=21
fn(5) // 执行内部函数,this指向global,this.num=60+5=65，num是obj.num = 20+1+1 ,所以输出22
obj.fn(10) // 直接调用obj.fn，this指向obj,this.num = 30,则obj num为初始的22,num=num+1 = 23
console.log(num, obj.num) //65 30


