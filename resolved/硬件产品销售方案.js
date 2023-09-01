
/**
题目描述
某公司目前推出了AI开发者套件，AI加速卡，AI加速模块，AI服务器，智能边缘多种硬件产品，每种产品包含若干个型号。
现某合作厂商要采购金额为amount元的硬件产品搭建自己的AI基座。
例如当前库存有N种产品，每种产品的库存量充足，给定每种产品的价格，记为price（不存在价格相同的产品型号）。
请为合作厂商列出所有可能的产品组合。

输入描述
输入包含采购金额amount和产品价格列表price。第一行为amount，第二行为price，例如：

500
[100, 200, 300, 500]

输出描述
输出为组合列表。例如：

[[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200, 200], [200, 300], [500]]

用例

输入	500
[100, 200, 300, 500, 500]
输出	[[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200, 200], [200, 300], [500], [500]]
说明	无
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
    const amount = Number(lines[0]);
    const nums = JSON.parse(lines[1]);
    console.log(getResult(nums, amount));
    lines.length = 0;
  }
});


function getResult(nums, amount) {
  nums.sort((a, b)=>a - b);
  const res = [];
  dfs(nums, 0, res, [], amount);
  return JSON.stringify(res);
}

function dfs(nums, index, res, arr, amount){
  if(amount === 0){
    res.push(arr);
    return ;
  }
  if(index === nums.length) return ;
  const num = nums[index];
  for(let i = 0;i <= Math.floor(amount / num);i++){
    dfs(nums, index + 1, res, [...arr, ...new Array(i).fill(num)], amount - i * num);
  }
}


const inputStr = `
500
[100, 200, 300, 500]
------
500
[100, 200, 300, 500, 500]
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

