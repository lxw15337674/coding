function double(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2 * num)
    }, num * 1000)
  })
}


const any = (promises) => {
  return new Promise((res, rej) => {
    for (let pro of promises) {
      pro.then(v => {
        res(v)
      }).catch(err => {
        rej(err)
      })
    }
  })
}

any([double(2), double(1)]).then(v => {
  console.log(v);
})