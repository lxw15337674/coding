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
