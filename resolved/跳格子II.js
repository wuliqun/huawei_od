
/**
题目描述
小明和朋友玩跳格子游戏，有 n 个连续格子组成的圆圈，每个格子有不同的分数，小朋友可以选择以任意格子起跳，但是不能跳连续的格子，不能回头跳，也不能超过一圈;

给定一个代表每个格子得分的非负整数数组，计算能够得到的最高分数。

输入描述
给定一个数例，第一个格子和最后一个格子首尾相连，如: 2 3 2

输出描述
输出能够得到的最高分，如: 3

备注
1 ≤ nums.length ≤ 100
1 ≤ nums[i] ≤ 1000
用例
输入	2 3 2
输出	3
说明	只能跳3这个格子，因为第一个格子和第三个格子首尾相连
输入	1 2 3 1
输出	4
说明	1 + 3 = 4
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  console.log(getResult(line.split(' ').map(Number)), "\n\n");
});


function getResult(nums){  
  const n = nums.length;
  const dp1 = new Array(n - 1).fill(0);
  const dp2 = new Array(n - 1).fill(0);
  if(n >= 1){
    dp1[0] = nums[0];
  }
  if(n >= 2){
    dp1[1] = Math.max(nums[1], nums[0]);
  }  
  for(let i = 2;i < n - 1;i++){
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i])
  }
  nums.unshift(nums.pop());
  if(n >= 1){
    dp2[0] = nums[0];
  }
  if(n >= 2){
    dp2[1] = Math.max(nums[1], nums[0]);
  }  
  for(let i = 2;i < n - 1;i++){
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i])
  }
  return Math.max(dp1[n - 2], dp2[n - 2])
}



// test
const inputStr = `
2 3 2
------
1 2 3 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0)
}();

