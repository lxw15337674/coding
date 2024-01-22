// 如果是基本数据类型，则直接返回，如果是引用数据类型则循环每个item，递归复制
// 处理循环引用，把每次创建的数据都存在map里，key为原对象，value为复制后的对象，每次复制前判断，如果存在则直接返回复制后的对象。
// https://vue3js.cn/interview/JavaScript/copy.html#%E5%9B%9B%E3%80%81%E5%8C%BA%E5%88%AB

function deepCopy(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  // 处理循环引用
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  let clone = null;
  if (Array.isArray(obj)) {
    clone = [];
    // 要提前存，在循环后存会无限递归。
    visited.set(obj, clone);
    for (let item of obj) {
      clone.push(deepCopy(item, visited));
    }
  } else {
    clone = {};
    // 要提前存，在循环后存会无限递归。
    visited.set(obj, clone);
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
  hobbies: ['reading', 'traveling'],
  test: () => {
    console.log('test');
  }
};

// 创建循环引用
originalObject.self = originalObject;
const copiedObject = deepCopy(originalObject);

// 输出原始对象和拷贝对象的值
console.log('Original Object:', originalObject);
console.log('Copied Object:', copiedObject);