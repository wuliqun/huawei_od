
/**
给你一个整数M和数组N，N中的元素为连续整数，要求根据N中的元素组装成新的数组R，组装规则：

R中元素总和加起来等于M
R中的元素可以从N中重复选取
R中的元素最多只能有1个不在N中，且比N中的数字都要小（不能为负数）
输入描述
第一行输入是连续数组N，采用空格分隔
第二行输入数字M

输出描述
输出的是组装办法数量，int类型

备注
1 ≤ M ≤ 30
1 ≤ N.length ≤ 1000
用例

| 输入 | 2 5                          |
| ---- | ---------------------------- |
| 输出 | 1                            |
| 说明 | 只有1种组装办法，就是[2,2,1] |

| 输入 | 2 3 5                                  |
| ---- | -------------------------------------- |
| 输出 | 2                                      |
| 说明 | 一共两种组装办法，分别是[2,2,1]，[2,3] |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let count = 0, count2 = 0;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 2){
    const M = Number(lines[1]);
    const nums = lines[0].split(' ').map(Number);
    console.log(getResult(nums, M));
    console.log('count: ', count, count2);
    count = 0;
    count2 = 0;
    lines.length = 0;
  }
});


function getResult(nums, M) {
  return dfs(nums, 0, M, {}, nums[0]);
}

function dfs(nums, index, target, memo, min){
  count2 ++;
  const key = `${index}-${target}`;
  if(memo[key]){
    count ++;
    return memo[key];
  }
  let res = 0;
  if((min > 0 && target < min) || target === 0){
    res = 1;
  }else if(index === nums.length){

  }else{
    const num = nums[index];
    if(target >= num){
      for(let i = 0;i <= Math.floor(target / num);i++){
        res += dfs(nums, index + 1, target - num * i, memo, min);
      }
    }    
  }
  memo[key] = res;
  return res;
}

const inputStr = `
2
5
------
2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
299
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

