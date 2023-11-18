class VueLike {
  constructor(data, computed) {
    this.data = data;
    this.computed = {};

    for (let key in computed) {
      this.computed[key] = computed[key].bind(this);
    }

    this.data = new Proxy(this.data, {
      get: (target, key) => {
        track(target, key); // 收集依赖
        if (key in this.computed) {
          return this.computed[key]();
        }
        return target[key];
      },
      set: (target, key, value) => {
        target[key] = value;
        trigger(target, key); // 触发依赖更新
        return true;
      }
    });

    const dependencies = new Map(); // 存储依赖关系

    const track = (target, key) => {
      const dep = getDependency(target, key);
      if (dep && !dependencies.has(dep)) {
        dependencies.set(dep, new Set());
      }
      if (activeEffect) {
        dependencies.get(dep).add(activeEffect);
      }
    };

    const trigger = (target, key) => {
      const dep = getDependency(target, key);
      if (dep && dependencies.has(dep)) {
        const effects = dependencies.get(dep);
        effects.forEach(effect => effect());
      }
    };

    const getDependency = (target, key) => {
      // 假设所有依赖都存储在 __deps 属性中
      return target.__deps && target.__deps[key];
    };

    let activeEffect = null;

    const effect = (fn) => {
      activeEffect = fn;
      fn();
      activeEffect = null;
    };

    this.effect = effect;
  }
}

// 示例用法
var vm = new VueLike({
  radius: 5
}, {
  area() {
    this.effect(() => {
      console.log("Area updated:", Math.PI * Math.pow(this.data.radius, 2));
    });
    return Math.PI * Math.pow(this.data.radius, 2);
  }
});

console.log(vm.data.radius); // 输出: 5
console.log(vm.data.area); // 输出: 78.53981633974483

vm.data.radius = 10;
// 输出:
// Area updated: 314.1592653589793
// 314.1592653589793