const async1 = new Promise((res, rej) => {
  rej('error')
  res('success')
}).then((res) => {
  console.log(res)
})

async1.then((res) => {
  console.log(`then1:${res}`)
}).then((res) => {
  console.log(`then2:${res}`)
}).catch((err) => {
  console.log(`catch3:${err}`)
}).then(res => {
  console.log(`then4:${res}`)
})


// catch3:error
// then4:undefined


const async2 = new Promise((res, rej) => {
  res('success')
  rej('error')
}).then((res) => {
  console.log(res)
})

async2.then((res) => {
  console.log(`then1:${res}`)
}).then((res) => {
  console.log(`then2:${res}`)
}).catch((err) => {
  console.log(`catch3:${err}`)
}).then(res => {
  console.log(`then4:${res}`)
})

// success
// then1 undefined
// then2 undefined
// then4 undefined




