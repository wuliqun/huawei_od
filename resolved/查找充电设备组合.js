
/**
题目描述
某个充电站，可提供n个充电设备，每个充电设备均有对应的输出功率。任意个充电设备组合的输出功率总和，均构成功率集合P的1个元素。功率集合P的最优元素，表示最接近充电站最大输出功率p_max的元素。

输入描述
输入为3行：

第1行为充电设备个数n
第2行为每个充电设备的输出功率
第3行为充电站最大输出功率p_max
输出描述
功率集合P的最优元素

备注
充电设备个数 n > 0
最优元素必须小于或等于充电站最大输出功率p_max
用例

| 输入 | 
4 
50 20 20 60
90                                             |
| ---- | ------------------------------------------------------------ |
| 输出 | 90                                                           |
| 说明 | 当充电设备输出功率50、20、20组合时，其输出功率总和为90，最接近充电站最大充电输出功率，因此最优元素为90。 |

| 输入 | 2 50 40 30                                                   |
| ---- | ------------------------------------------------------------ |
| 输出 | 0                                                            |
| 说明 | 所有充电设备的输出功率组合，均大于充电站最大充电输出功率30，此时最优元素值为0。 |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 3){
    const nums = lines[1].split(' ').map(Number);
    const target = Number(lines[2]);
    console.log(getResult(nums, target));
    lines.length = 0;
  }
});

/**
 * dp[i][j] 表示从[0,i]中选择 接近j的最优值
 * @param {*} nums 
 * @param {*} target 
 */
function getResult(nums, target) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0).map(()=>new Array(target + 1).fill(0));
  for(let i = 1;i <= n;i++){
    for(let j = 0;j <= target;j++){
      if(nums[i - 1] > j){
        dp[i][j] = dp[i - 1][j];
      }else{
        dp[i][j] = Math.max(dp[i - 1][j], nums[i - 1] + dp[i - 1][j - nums[i - 1]]);
      }
    }
  }

  return dp[n][target];
}


const inputStr = `
4 
50 20 20 60
90
------
2
50 40
30
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

