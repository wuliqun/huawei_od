
/**
题目描述
给定一个数组，我们称其中连续的元素为连续子序列，称这些元素的和为连续子序列的和。

数组中可能存在几组连续子序列，组内的连续子序列互不相交且有相同的和。

求一组连续子序列，组内子序列的数目最多。

输出这个数目。

输入描述
第一行输入为数组长度N，1<=N<=10^3

第二行为N个用空格分开的整数 Ci，-10^5 <= Ci <= 10^5

输出描述
第一行是一个整数M，表示满足要求的最多的组内子序列的数目。

用例

输入	10
8 8 9 1 9 6 3 9 1 0
输出	4
说明	
四个子序列的第一个元素和最后一个元素的下标分别为

2 2

4 4

5 6

7 7

输入	10
-1 0 4 -3 6 5 -6 5 -7 -3
输出	3
说明	
三个子序列的第一个元素和最后一个元素的下标分别为：

3 3

5 8

9 9
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let M, N1, N2;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 1){
    [M, N1, N2] = lines[0].split(' ').map(Number);
  }else if(lines.length === N1 + N2 + 1){
    const costs = lines.slice(1, 1 + N1).map(l=>l.split(' ').map(Number));
    const needs = lines.slice(N1 + 1).map(l=>l.split(' ').map(Number));

    console.log(getResult(costs, needs, M));
    lines.length = 0;
  }
});

function getResult(costs, needs, M){
  const costsMap = new Map();
  for(let [i, j, c] of costs){
    if(i > j){
      [i, j] = [j, i];
    }
    costsMap.set(`${i}-${j}`, c);
  }
  
  const dp = new Array(M + 1).fill(0);
  for(let i = 2;i <= M;i++){
    let min = 0;
    for(let [x, y] of needs){
      if(x > y){
        [x, y] = [y, x];
      }
      if(y === i){
        if(costsMap.has(`${x}-${y}`)){
          min += costsMap.get(`${x}-${y}`);
        }else{
          return -1;
        }
      }
    }
    if(!min){
      for(let j = 1;j < i;j++){
        if(costsMap.has(`${j}-${i}`)){
          let c = costsMap.get(`${j}-${i}`);
          if(!min || min > c){
            min = c;
          }
        }
      }
    }
    if(!min) return -1;
    dp[i] = dp[i - 1] + min;
  }

  return dp[M];
}


const inputStr = `
3 3 0
1 2 10
1 3 100
2 3 50
------
3 3 1
1 2 10
1 3 100
2 3 50
1 3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

