// 原型链就是 对象的__proto__所连接的链状结构（其实可以理解为链表结构）

function F() {
  this.a = 1;
  this.b = 2;
}
F.prototype.b = 3;
F.prototype.c = 4;
var o = new F(); // {a: 1, b: 2}



console.log(Function.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);


