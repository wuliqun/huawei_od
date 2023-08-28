
/**
题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0-N的箱子，每个箱子上面有一个数字，箱子排列成一个环，编号最大的箱子的下一个是编号为0的箱子。

请输出每个箱了贴的数字之后的第一个比它大的数，如果不存在则输出-1。

输入描述
输入一个数字字串，数字之间使用逗号分隔，例如: 1,2,3,1

1 ≤ 字串中数字个数 ≤ 10000:
-100000 ≤ 每个数字值 ≤ 100000
输出描述
下一个大的数列表，以逗号分隔，例如: 2,3,6,-1,6

用例
输入	2,5,2
输出	5,-1,5
说明	
第一个2的下一个更大的数是5;

数字5找不到下一个更大的数;

第二个2的下一个最大的数需要循环搜索，结果也是 5

输入	3,4,5,6,3
输出	4,5,6,-1,4
说明	无
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
let lines = [];
rl.on("line", (line) => {
  console.log(getResult(line.split(',').map(Number)).join(','));
});

function getResult(nums){
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  const indexStack = [];
  for(let i = 0;i < n * 2;i++){
    while(stack.length > 0 && stack[stack.length - 1] < nums[i % n]){
      stack.pop();
      res[indexStack.pop()] = nums[i % n];
    }
    stack.push(nums[i % n]);
    indexStack.push(i % n);
  }
  return res;
}


// test
const inputStr = `
3,4,5,6,3
-----
2,5,2
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

