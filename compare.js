// 两个字符串对比, 得出结论都做了什么操作, 比如插入或者删除
// pre = 'abcde123'now = '1abc123'a前面插入了1, c后面删除了de


function compareStrings(pre, now) {
  const m = pre.length;
  const n = now.length;
  const dp = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (pre[i - 1] === now[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  let i = m;
  let j = n;
  let diff = "";
  while (i > 0 || j > 0) {
    if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      diff = `删除${pre[i - 1]}, ${diff}`;
      i--;
    } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
      diff = `插入${now[j - 1]}, ${diff}`;
      j--;
    } else {
      i--;
      j--;
    }
  }
  return diff;
}


const pre = 'abcde123';
const now = '1abc123';
const diff = compareStrings(pre, now);
console.log(diff); // 输出：插入1, 删除d, 删除e