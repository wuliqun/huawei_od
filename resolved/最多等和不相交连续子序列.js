
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
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 2){
    const n = Number(lines[0]);
    const nums = lines[1].split(' ').map(Number);
    console.log(getResult(nums, n));
    lines.length = 0;
  }
});

function getResult(nums, n){
  const preSum = new Array(n).fill(0);
  let i;
  preSum[0] = nums[0];
  for(i = 1;i < n;i++){
    preSum[i] = preSum[i - 1] + nums[i];
  }
  const sumDic = {};
  for(i = 0;i < n;i++){
    sumDic[preSum[i]] = sumDic[preSum[i]] || [];
    sumDic[preSum[i]].push([0, i]);
    for(let j = 1;j <= i;j++){
      let sum = preSum[i] - preSum[j - 1];
      sumDic[sum] = sumDic[sum] || [];
      sumDic[sum].push([j, i]);
    }
  }
  let max = 1, regionList = [];
  for(const key in sumDic){
    regionList.push(sumDic[key]);
  }
  regionList.sort((a, b)=>b.length - a.length);
  for(const regions of regionList){
    if(regions.length <= max) break;
    let count = getUnoverlapRegionCount(regions);
    if(count > max) max = count;
  }

  return max;
}

/**
 * 
 * @param {number[][]} regions 
 */
function getUnoverlapRegionCount(regions){
  regions.sort((a, b)=>{
    if(a[0] !== b[0]){
      return a[0] - b[0];
    }else{
      return a[1] - b[1];
    }
  });
  let stack = [regions[0]], top, c;
  for(let i = 1;i < regions.length;i++){
    top = stack.at(-1);
    c = compareRegion(top, regions[i]);
    if(c === 1){
      stack.pop();
      stack.push(regions[i]);
    }else if(c === 3){
      stack.push(regions[i]);
    }
  }

  return stack.length;
}
// 1 r1包含r2 2重叠  3不重叠
function compareRegion(r1, r2){
  if(r2[0] > r1[1]) return 3;
  else if(r2[1] < r1[1]) return 1;
  return 2;
}



const inputStr = `
10
8 8 9 1 9 6 3 9 1 0
------
10
-1 0 4 -3 6 5 -6 5 -7 -3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

