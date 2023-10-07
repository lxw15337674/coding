
function parseUrl(url) {
  const index = url.indexOf('?')
  const params = {}
  for (let item of url.slice(index + 1).split('&')) {
    const [key, value] = item.split('=')
    if (value !== undefined) {
      if (isNaN(parseFloat(value))) {
        params[key] = value
      } else {
        params[key] = parseFloat(value)
      }
    } else {
      params[key] = true
    }

  }
  return params
}

const url = 'https://example.com/path?foo=bar&num=123&empty';
// const result = parseUrl(url);
// console.log(result);


const searchParams = new URL(url).searchParams;

console.log(searchParams.get("foo")); //
console.log(searchParams.get("num")); // 

searchParams.set("email", "john@example.com");
console.log(searchParams);