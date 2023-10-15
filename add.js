//  大数相加
function add(a, b) {
  if (a.length > b.length) {
    const length = a.length - b.length
    for (let i = 0; i < length; i++) {
      b = `0${b}`
    }
  } else {
    const length = b.length - a.length
    for (let i = 0; i < length; i++) {
      a = `0${a}`
    }
  }
  let push = 0
  let sum = ''
  for (let i = a.length - 1; i >= 0; i--) {
    let count = parseInt(a[i]) + parseInt(b[i])
    if (push) {
      push--
      count++
    }
    if (count > 9) {
      count -= 10
      push += 1
    }
    sum = `${count}${sum}`
  }
  if (push) {
    sum = `1${sum}`
  }
  return sum
}


let a = "9007199254740991";
let b = "1234567899999999999";
console.log(add(a, b)); //'1243575099254740990'