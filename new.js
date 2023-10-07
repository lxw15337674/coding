// 首先创建了一个新的空对象
// 设置原型，将对象的原型设置为函数的prototype对象。
// 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

function myNew(constructor, ...args) {
  // 创建一个新对象，继承构造函数的原型
  const obj = Object.create(constructor.prototype);
  // 执行构造函数，将this绑定到新对象上
  const result = constructor.apply(obj, args);
  // 如果构造函数返回一个对象，那么返回该对象
  if (result && typeof result === 'object') {
    return result;
  }
  // 否则返回新对象
  return obj;
}
