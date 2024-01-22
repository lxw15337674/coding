function reverse(str) {
  let left = 0
  let right = str.length - 1

  while (left <= right) {
    [str[left], str[right]] = [str[right], str[left]]
    left++
    right--
  }
  return str
}


const s = ["h", "e", "l", "l", "o"]


console.log(reverse(s)); // ["o","l","l","e","h"]