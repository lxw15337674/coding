// 父类私有属性放放子类私有中，原型上的属性和方法放到子类原型上
function Parent() {
  this.name = 'parent'
  this.action = function () {
    return this.name
  },
    this.arr = [1, 2]
}

Parent.prototype.getName = function () {
  return this.name
}

function Child() {
  Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const child1 = new Child
const child2 = new Child
console.log(child1)