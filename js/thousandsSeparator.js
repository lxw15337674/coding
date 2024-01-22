// 千位分隔符
// 将数字转为字符串，将小数部分与整数部分分离
// 整数部分分隔为数组，并且反转
// 反转后的数组每隔3位添加,
//   添加完成后，再反转回来，拼接小数部分，完成格式化


function thousandsSeparator(n) {
  const str = n.toString()
  const isDecimal = str.indexOf('.')
  let integer = '', decimal = ''
  if (isDecimal) {
    [integer, decimal] = str.split('.')
  }
  let num = []
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    count++
    if (count === 4) {
      num.push(',')
      count = 0
    }
    num.push(integer[i])
  }
  num = num.reverse().join("")
  if (isDecimal) {
    num += `.${decimal}`
  }
  return num
}


const number = 123456.789;
console.log(thousandsSeparator(number)) // => '123,456.789'