
/**
题目描述
A公司准备对他下面的N个产品评选最差奖，
评选的方式是首先对每个产品进行评分，然后根据评分区间计算相邻几个产品中最差的产品。
评选的标准是依次找到从当前产品开始前M个产品中最差的产品，请给出最差产品的评分序列。

输入描述
第一行，数字M，表示评分区间的长度，取值范围是0<M<10000
第二行，产品的评分序列，比如[12,3,8,6,5]，产品数量N范围是-10000 < N <10000

输出描述
评分区间内最差产品的评分序列

用例

| 输入 | 3 12,3,8,6,5                                   |
| ---- | ---------------------------------------------- |
| 输出 | 3,3,5                                          |
| 说明 | 12,3,8 最差的是3 3,8,6 最差的是3 8,6,5 最差的是5 |
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
    const M = Number(lines[0]);
    const nums = lines[1].split(',').map(Number);
    console.log(getResult(nums, M));
    lines.length = 0;
  }
});

function getResult(nums, M) {
  const N = nums.length;
  let min = Math.min(...nums.slice(0, M));
  const res = [min];
  for(let i = 1;i < N - M + 1;i++){
    if(nums[i + M - 1] <= min){
      min = nums[i + M - 1];
    }else if(nums[i - 1] === min){
      min = Math.min(...nums.slice(i, i + M));
    }
    res.push(min);
  }
  return res.join(',');
}


const inputStr = `
3
12,3,8,6,5
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

