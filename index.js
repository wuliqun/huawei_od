
/**
题目描述
MELON有一堆精美的雨花石（数量为n，重量各异），准备送给S和W。MELON希望送给俩人的雨花石重量一致，请你设计一个程序，帮MELON确认是否能将雨花石平均分配。

输入描述
第1行输入为雨花石个数：n， 0 < n < 31。

第2行输入为空格分割的各雨花石重量：m[0] m[1] ….. m[n - 1]， 0 < m[k] < 1001。

不需要考虑异常输入的情况。

输出描述
如果可以均分，从当前雨花石中最少拿出几块，可以使两堆的重量相等；如果不能均分，则输出-1。

用例
输入	4
1 1 2 2
输出	2
说明	
输入第一行代表共4颗雨花石，

第二行代表4颗雨花石重量分别为1、1、2、2。 

均分时只能分别为1,2，需要拿出重量为1和2的两块雨花石，所以输出2。

输入	10
1 1 1 1 1 9 8 3 7 10
输出	3
说明	
输入第一行代表共10颗雨花石，

第二行代表4颗雨花石重量分别为1、1、1、1、1、9、8、3、7、10 。 

均分时可以1,1,1,1,1,9,7和10,8,3，也可以1,1,1,1,9,8和10,7,3,1，或者其他均分方式，但第一种只需要拿出重量为10,8,3的3块雨花石，第二种需要拿出4块，所以输出3(块数最少)。

 */
// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//     lines.push(line);
//     if(lines.length === 2){
//         const nums = lines[1].split(' ').map(Number)
//         console.log(getResult(nums));
//         lines.length = 0;
//     }
// });
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 2) {
    const n = parseInt(lines[0]);
    const nums = lines[1].split(" ").map(Number);
    console.log(getResult(n, nums));
    lines.length = 0;
  }
});
 
function getResult(n, nums) {
  // 所有雨花石重量之和
  const sum = nums.reduce((a, b) => a + b);
 
  // 如果重量之和不能整除2，则必然无法平分
  if (sum % 2 != 0) return -1;
 
  // 背包承重
  const bag = sum / 2;
 
  // 二维数组
  const dp = new Array(n + 1).fill(0).map(() => new Array(bag + 1).fill(0));
 
  // 初始化第一行，n是一个不可能的装满背包的物品数量
  for (let i = 0; i <= bag; i++) dp[0][i] = n;
 
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 1; j <= bag; j++) {
      if (j < num) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - num] + 1);
      }
    }
  }
 
  // 如果装满背包的最少物品数为n, 则说明没有平分方案，因为n个雨花石的重量之和为sumV，而背包的承重是bag = sumV // 2
  if (dp[n][bag] == n) {
    return -1;
  } else {
    return dp[n][bag];
  }
}

// console.log(getResult(new Array(32).fill(0).map(()=>Math.round(Math.random() * 45 + 1))));
console.log(getResult([35, 43,  8, 44, 23, 34, 41, 31, 21,25, 21,  8, 17, 18, 16, 27, 24,  7,32, 11, 31, 38,  6, 27,  1, 34, 25, 12, 11, 12, 36, 43]));
// console.log(getResult([1, 1, 1, 1, 1 ,9 ,8 ,3 ,7 ,10]));
