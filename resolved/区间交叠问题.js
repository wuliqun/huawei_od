
/**
题目描述
给定坐标轴上的一组线段，线段的起点和终点均为整数并且长度不小于1，请你从中找到最少数量的线段，这些线段可以覆盖柱所有线段。

输入描述
第一行输入为所有线段的数量，不超过10000，后面每行表示一条线段，格式为"x,y"，x和y分别表示起点和终点，取值范围是[-10^5，10^5]。

输出描述
最少线段数量，为正整数

用例

| 输入 | 3 1,4 2,5 3,6 |
| ---- | ------------- |
| 输出 | 2             |
| 说明 | 无            |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === Number(lines[0]) + 1){
    const n = Number(lines[0]);
    const points = lines.slice(1).map(l=>l.split(',').map(Number));
    console.log(getResult(points, n));
    lines.length = 1;
  }
});

/**
 * dp[i][j] 表示从 [0-i]中铺满[0,j]的最小线段数
 * @param {*} points 
 * @param {*} n 
 */
function getResult(points, n){
  points.sort((a, b)=>{
    if(a[0] !== b[0]){
      return a[0] - b[0];
    }else{
      return a[1] - b[1];
    }
  });
  let min = points[0][0];
  let max = points.at(-1)[1];
  return getCount(points, min, max, 0, n);
}

function getCount(points, start, end, startIndex, n){
  let max = start, i;
  for(i = startIndex;i < n;i++){
    if(points[i][0] <= start){
      if(points[i][1] > max){
        max = points[i][1];
      }
    }else{
      break;
    }
  }
  if(max >= end) return 1;
  else{
    return 1 + getCount(points, max + 1, end, i, n);
  }
}


const inputStr = `
3
1,4
2,5
3,6
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

