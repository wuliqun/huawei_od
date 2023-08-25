
/**
题目描述
某组织举行会议，来了多个代表团同时到达，接待处只有一辆汽车，可以同时接待多个代表团，为了提高车辆利用率，请帮接待员计算可以坐满车的接待方案，输出方案数量。


约束:

一个团只能上一辆车，并且代表团人数 (代表团数量小于30，每个代表团人数小于30)小于汽车容量(汽车容量小于100)
需要将车辆坐满
输入描述
第一行 代表团人数，英文逗号隔开，代表团数量小于30，每个代表团人数小于30
第二行 汽车载客量，汽车容量小于100

输出描述
坐满汽车的方案数量
如果无解输出0

用例
输入	5,4,2,3,2,4,9
10
输出	4
说明	解释 以下几种方式都可以坐满车，所以，优先接待输出为4
[2,3,5]
[2,4,4]
[2,3,5]
[2,4,4]

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
        const nums = lines[0].split(',').map(Number)
        const sum = Number(lines[1])
        console.log(getResult(nums,sum));
        console.log(getResult2(nums,sum));
        lines.length = 0;
    }
});


function getResult(nums,sum) {
  nums.sort((a,b)=>a-b);
  const memo = {};
  return dfs(nums,0,sum,memo);
}

function dfs(nums,index,target,memo){
  const key = `${index}-${target}`;
  if(typeof memo[key] === 'number') return memo[key]; 
  let res = 0;
  if(index < nums.length && nums[index] <= target){
    if(nums[index] === target){
      res = 1 + dfs(nums,index + 1,target,memo);
    }else{
      res = dfs(nums,index + 1,target - nums[index],memo) + dfs(nums,index + 1,target,memo);      
    }
  }

  memo[key] = res;
  return res;
}

/**
 * dp[i][j] 代表在i个中物品凑成j的方法数
 * @param {*} nums 
 * @param {*} bag 
 * @returns 
 */
function getResult2(nums, bag) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0).map(()=>new Array(bag + 1).fill(0));
  dp[0][0] = 1;
  for(let i = 1;i<=n;i++){
    const num = nums[i-1];
    for(let j = 0;j<=bag;j++){
      dp[i][j] = dp[i-1][j] + (dp[i - 1][j - num] || 0);
    }
  }

  return dp[n][bag];
}