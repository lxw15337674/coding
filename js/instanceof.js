// 核心: 原型链的向上查找。
const instance = (value, type) => {
  let v = value;
  while (true) {
    if (Object.getPrototypeOf(v) === type.prototype) {
      return true;
    }
    if (Object.getPrototypeOf(v) === null) {
      return false;
    }
    v = Object.getPrototypeOf(v);
  }
}


// 定义一个自定义的类
class Person {
  constructor(name) {
    this.name = name;
  }
}

// 创建一个对象实例
const person = new Person('Alice');

// 测试用例
console.log(instance(person, Person)); // true，person是Person类的实例
console.log(instance(person, Object)); // true，person是Object类的实例
console.log(instance(person, Array)); // false，person不是Array类的实例
console.log(instance(person, Function)); // false，person不是Function类的实例
console.log(instance(person, String)); // false，person不是String类的实例