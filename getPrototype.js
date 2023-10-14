function A() { }

var a = new A;

a.__proto__ === A.prototype;

a.__proto__ === Reflect.getPrototypeOf(a);


console.log(
  a.__proto__ === A.prototype,
  a.__proto__ === Reflect.getPrototypeOf(a),
  Function instanceof Object
);

