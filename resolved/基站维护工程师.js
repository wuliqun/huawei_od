
/**
题目描述
小王是一名基站维护工程师，负责某区域的基站维护。
某地方有  n  个基站(1 < n < 10)，已知各基站之间的距离 s(0 < s < 500)，并且基站 x 到基站 y 的距离，与基站 y 到基站 x 的距离并不一定会相同。
小王从基站 1 出发，途经每个基站 1 次，然后返回基站 1 ，需要请你为他选择一条距离最短的路。

输入描述
站点数n和各站点之间的距离(均为整数)

输出描述
最短路程的数值

用例

| 输入 | 3 0 2 1 1 0 2 2 1 0 |
| ---- | ------------------- |
| 输出 | 3                   |
| 说明 | 无                  |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let matrix;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === Number(lines[0]) + 1){
    const n = Number(lines[0]);
    matrix = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult( n));
    lines.length = 0;
  }
});

/**
 * 
 * @param {number[][]} matrix 
 * @param {number} n
 * @returns 
 */
let min;
function getResult( n){
  const nums = new Array(n).fill(0).map((_, index)=>index);
  const arr = [0];
  const path = new Set(arr);
  min = Infinity;
  dfs( 0, nums, arr, path);
  return min;
}

function dfs( sum, nums, arr, path){
  if(arr.length === nums.length) {
    // 最后还要回到1
    sum = sum +  matrix[arr.at(-1)][0];
    if(sum < min){
      min = sum;
    }
    return ;
  }
  for(const num of nums){
    if(path.has(num)) continue;
    path.add(num);
    arr.push(num);
    dfs(sum + matrix[arr.at(-2)][arr.at(-1)], nums, arr, path);
    arr.pop();
    path.delete(num);
  }
}


const inputStr = `
3
0 2 1
1 0 2
2 1 0
-------
4
0 2 1 3
1 0 2 5
2 1 0 4
3 2 6 0
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

