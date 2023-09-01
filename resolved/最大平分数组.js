
/**
题目描述
给定一个数组nums，可以将元素分为若干个组，使得每组和相等，求出满足条件的所有分组中，最大的平分组个数。

输入描述
第一行输入 m
接着输入m个数，表示此数组
数据范围:1<=M<=50, 1<=nums[i]<=50

输出描述
最大的平分组数个数

用例

输入	7
4 3 2 3 5 2 1
输出	4
说明	
可以等分的情况有：

4 个子集（5），（1,4），（2,3），（2,3）

2 个子集（5, 1, 4），（2,3, 2,3）

最大的平分组数个数为4个。

输入	9
5 2 1 5 2 1 5 2 1
输出	4
说明	
可以等分的情况有：

4 个子集（5，1），（5，1），（5，1），（2，2，2）

2 个子集（5, 1, 5,1），（2,2, 2,5,1）

最大的平分组数个数为4个。
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 2){
    const n = Number(lines[0]);
    const nums = lines[1].split(' ').map(Number);
    console.log(getResult(nums, n));
    lines.length = 0;
  }
});

/**
 * 
 * @param {number[]} nums 
 * @param {number} n 
 * @returns 
 */
function getResult(nums, n) {
  let min = null;
  const sum = nums.reduce((sum, c)=>{
    if(min === null || min > c) min = c;
    return sum + c;
  });
  let maxCount = Math.min(n, Math.floor(sum / min));
  while(maxCount > 1){
    if(sum % maxCount === 0 && canSplit(nums, sum / maxCount, maxCount)) break;
    maxCount --; 
  }
  return maxCount;
}

function canSplit(nums, target, count){
  const arr = new Array(count).fill(0);
  return dfs(nums, 0, target, arr);
}

function dfs(nums, index, target, arr){
  if(index === nums.length) return true;
  for(let j = 0;j < arr.length;j++){
    if(j > 0 && arr[j] === arr[j - 1]) continue;
    if(arr[j] + nums[index] <= target){
      arr[j] += nums[index];
      if(dfs(nums, index + 1, target, arr)) return true;
      arr[j] -= nums[index];
    }
  }
  return false;
}

const inputStr = `
7
4 3 2 3 5 2 1
------
9
5 2 1 5 2 1 5 2 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

