// 数组去重
function unique(array) {
  let res = [];
  let map = new Map()
  for (let char of array) {
    if (!map.get(char)) {
      res.push(char)
      map.set(char, 1)
    }
  }

  return res;
}


let array = [1, 1, '1', '1'];
console.log(unique(array)); // [1, "1"]