// 父类私有属性放放子类私有中，原型上的属性和方法copy到子类原型上
// function Parent() {
//   this.name = 'parent'
//   this.action = function () {
//     return this.name
//   },
//     this.arr = [1, 2]
// }

// Parent.prototype.getName = function () {
//   return this.name
// }

// function Child() {
//   Parent.call(this)
// }
// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child

// const child1 = new Child
// const child2 = new Child
// console.log(child1)

// 写一个类Person，拥有属性age和name，拥有方法say(something)。

// 再写一个类Superman，继承Person，拥有自己的属性power，拥有自己的方法fly(height) ES5方式

function Person(age, name) {
  this.age = age
  this.name = name
}
Person.prototype.say = function (some) {
  console.log(`say ${some}`);
}

function Superman(age, name, power) {
  Person.call(this, age, name)
  this.power = power
}
Superman.prototype = { ...Person.prototype }
Superman.prototype.fly = (height) => {
  console.log(`fly ${height}`)
}


let a = new Superman(1, 2, 3)
a.fly(22)
a.say('123')
