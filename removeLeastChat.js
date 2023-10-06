function removeLeastChar(str) {
  const map = {}
  for (let char of str) {
    if (map[char]) {
      map[char]++
    } else {
      map[char] = 1
    }
  }
  let char = null
  for (let key in map) {
    if (map[key] < map[char] || char === null) {
      char = key
    }
  }
  return str.replace(char, '')
}

// 示例
const str = 'abbcccdddd';
const newStr = removeLeastChar(str);
console.log(newStr); // 'bbcccdddd'
