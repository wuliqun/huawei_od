
/**
题目描述
给你一个由 '0' (空地)、'1' (银矿)、'2'(金矿) 组成的的地图，矿堆只能由上下左右相邻的金矿或银矿连接形成。超出地图范围可以认为是空地。

假设银矿价值1，金矿价值2 ，请你找出地图中最大价值的矿堆并输出该矿堆的价值。

输入描述
地图元素信息如：

22220
00000
00000
11111

地图范围最大 300*300
0 ≤ 地图元素 ≤ 2
输出描述
矿堆的最大价值

用例
输入	22220
00000
00000
01111
输出	8
说明	无
输入	22220
00020
00010
01111
输出	15
说明	无
输入	20000
00020
00000
00111
输出	3
说明	无
 */

// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//   if(line === ''){
//     console.log(getResult(lines.map(l=>l.split(' '))));
//     lines.length = 0;
//   }else{
//     lines.push(line);
//   }
// });

const directions = [
  {
    x:-1,
    y:0
  },{
    x:1,
    y:0
  },{
    x:0,
    y:-1,
  },{
    x:0,
    y:1
  }
]

function getResult(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let list = [],max = 0,tmp = 0;
  for(let i = 0;i<m;i++){
    for(let j = 0;j<n;j++){
      if(matrix[i][j] > 0){
        tmp += matrix[i][j];
        matrix[i][j] = 0;
        list.push([i,j]);
        while(list.length > 0){
          let newList = [],newX,newY;
          for(const [i,j] of list){
            for(const {x,y} of directions){
              newX = i + x;
              newY = j + y;
              if(newX >=0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] > 0){
                tmp += matrix[newX][newY];
                matrix[newX][newY] = 0;
                newList.push([newX,newY]);
              }
            }
          }
          list = newList;
        }
        if(tmp > max){
          max = tmp;
        }
        tmp = 0;
      }      
    }
  }
  return max;
}


const testCases = [
  [
    "22220",
    "00000",
    "00000",
    "01111",
  ],
  [
    "22220",
    "00020",
    "00010",
    "01111",
  ],
  [
    "20000",
    "00020",
    "00000",
    "00111",
  ]
];

const testCaseResult = [8,15,3];
for(let i = 0;i<testCases.length;i++){
  console.log(getResult(testCases[i].map(line=>line.split('').map(Number))),getResult(testCases[i].map(line=>line.split('').map(Number))) === testCaseResult[i]);
}