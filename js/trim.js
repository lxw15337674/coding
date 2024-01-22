function trim(str) {
  let start = 0;
  let end = str.length - 1;

  // 寻找非空格字符的起始位置
  while (str.charAt(start) === ' ') {
    start++;
  }

  // 寻找非空格字符的结束位置
  while (str.charAt(end) === ' ') {
    end--;
  }

  // 提取非空格字符部分
  return str.slice(start, end + 1);
}

let str = "  Hello, World!  ";
let trimmedStr = trim(str);
console.log(trimmedStr);  // 输出: "Hello, World!"