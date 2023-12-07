function deepCopy(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  // 处理循环引用
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  let clone;
  if (Array.isArray(obj)) {
    clone = [];
    visited.set(obj, clone); // 添加到 visited 中
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepCopy(obj[i], visited);
    }
  } else {
    clone = {};
    visited.set(obj, clone); // 添加到 visited 中
    for (let key in obj) {
      clone[key] = deepCopy(obj[key], visited);
    }
  }
  return clone;
}



// 测试用例
const originalObject = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'traveling']
};

// 创建循环引用
originalObject.self = originalObject;
const copiedObject = deepCopy(originalObject);

// 输出原始对象和拷贝对象的值
console.log('Original Object:', originalObject);
console.log('Copied Object:', copiedObject);