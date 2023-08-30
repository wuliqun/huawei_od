
/**
题目描述
给一块n*m的地块，相当于n*m的二维数组，每个元素的值表示这个小地块的发电量；

求在这块地上建立正方形的边长为c的发电站，发电量满足目标电量k的地块数量。

输入描述
第一行为四个按空格分隔的正整数，分别表示n, m , c k

后面n行整数，表示每个地块的发电量

输出描述
输出满足条件的地块数量

**用例**

| 输入 | 
2 5 2 6
1 3 4 5 8
2 3 6 7 1
| 输出 | 4                           |
| 说明 | 无                          |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let matrix, n, m, c, k;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 1){
    [n, m, c, k] = lines[0].split(' ').map(Number);
    matrix = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult());
    console.log(getResult2());
    lines.length = 0;
  }
});
let lastStartSum, sum;
function getResult(){
  let count = 0;
  for(let i = 0;i < n - c + 1;i++){
    for(let j = 0;j < m - c + 1;j++){
      if(i === 0 && j === 0){
        lastStartSum = sum = getStartSum();
      }else if(j === 0){
        lastStartSum = sum = getNextVSum(lastStartSum, i, j);
      }else{
        sum = getNextHSum(sum, i, j);
      }
      if(sum >= k) count ++;
    }
  }
  return count;
}

function getStartSum(){
  let sum = 0;
  for(let i = 0;i < c;i++){
    for(j = 0;j < c;j++){
      sum += matrix[i][j];
    }
  }
  return sum;
}
// 横向移动下一个正方形的值
function getNextHSum(sum, i, j){
  for(let k = i; k < c + i;k++){
    sum += matrix[k][j + c - 1] - matrix[k][j - 1];
  }
  return sum;
}
// 竖向移动下一个正方形的值
function getNextVSum(sum, i, j){
  for(let k = j; k < c + j;k++){
    sum += matrix[i + c - 1][k] - matrix[i - 1][k];
  }
  return sum;
}

/**
 * 二维数组前缀
 */
function getResult2(){
  // preSum[i][j]  [0-i][0-j] 组成的面积
  const preSum = new Array(n + 1).fill(0).map(()=>new Array(m + 1).fill(0));
  for(let i = 1;i <= n;i++){
    for(let j = 1;j <= m;j++){
      preSum[i][j] = matrix[i - 1][j - 1] + preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1];
    }
  }
  let count = 0, rect;
  for(let i = c;i <= n;i++){
    for(let j = c;j <= m;j++){
      rect = preSum[i][j] - preSum[i][j - c] - preSum[i - c][j] + preSum[i - c][j - c];
      if(rect >= k) count ++;
    }
  }
  return count;
}


const inputStr = `
2 5 2 6
1 3 4 5 8
2 3 6 7 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

