async function sleep(fn, time) {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

async function run() {
  setTimeout(() => { console.log(2) }, 2000);
  setTimeout(() => { console.log(1) }, 1000);
  sleep(1000)
}

run()