
/**
题目描述


从一个长度为N的正数数组numbers中找出长度至少为L且几何平均值最大子数组，并输出其位置和大小。（K个数的几何平均值为K个数的乘积的K次方根）

若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。

若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。

输入描述
第一行输入为N、L

N表示numbers的大小（1 ≤ N ≤ 100000）
L表示子数组的最小长度（1 ≤ L ≤ N）
之后N行表示numbers中的N个数，每个一行（10^-9 ≤ numbers[i] ≤ 10^9）

输出描述
输出子数组的位置（从0开始计数）和大小，中间用一个空格隔开。

备注
用例保证除几何平均值为最大值的子数组外，其他子数组的几何平均值至少比最大值小10^-10倍

用例

输入	3 2
2
2
3
输出	1 2
说明	长度至少为2的子数组共三个，分别是{2,2}、{2,3}、{2,2,3}，其中{2,3}的几何平均值最大，故输出其位置1和长度2
输入	10 2
0.2
0.1
0.2
0.2
0.2
0.1
0.2
0.2
0.2
0.2
输出	2 2
说明	有多个长度至少为2的子数组的几何平均值为0.2，其中长度最短的为2，也有多个，长度为2且几何平均值为0.2的子数组最前面的那个为从第二个数开始的两个0.2组成的子数组
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 1){
    const [n, l] = lines[0].split(' ').map(Number);
    const nums = lines.slice(1).map(Number);
    console.log(getResult(nums, n, l));
    lines.length = 0;
  }
});

/**
 * 暴力破解  主要考虑精度问题
 * @param {*} nums 
 * @param {*} n 
 * @param {*} l 
 * @returns 
 */
function getResult(nums, n, l) {
  let powParam;
  let index, s;
  let max = -1;
  let sizeMax, cur;
  for(let size = l;size <= n;size ++){
    powParam = 1 / size;
    cur = 1;
    let ii = 0;
    for(i = 0;i < size;i++){
      cur *= nums[i];
    }
    sizeMax = cur;
    for(let i = 1;i < n - size + 1;i++){
      cur /= nums[i - 1];
      cur *= nums[size + i - 1];
      if(Math.abs(cur - sizeMax) > 0.00000000001 && cur > sizeMax){
        sizeMax = cur;
        ii = i;
      } 
    }
    let mean = Math.pow(sizeMax, powParam);
    console.log(max, mean);
    if(Math.abs(max - mean) < 0.00000000001){
      // 认为相等
    }else if(max - mean < 0.000001){
      max = mean;
      index = ii;
      s = size;
    }
  }

  return `${index} ${s}`;  
}



const inputStr = `
3 2
2
2
3
--------
10 2
0.2
0.1
0.2
0.2
0.2
0.1
0.2
0.2
0.2
0.2
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

