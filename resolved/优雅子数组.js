
/**
题目描述
如果一个数组中出现次数最多的元素出现大于等于K次，被称为 k-优雅数组 ，k也可以被称为优雅阈值。
例如，数组1，2，3，1、2，3，1，它是一个3-优雅数组，因为元素1出现次数大于等于3次，
数组[1, 2, 3, 1, 2]就不是一个3-优雅数组，因为其中出现次数最多的元素是1和2，只出现了2次。

给定一个数组A和k，请求出A有多少子数组是k-优雅子数组。

子数组是数组中一个或多个连续元素组成的数组。

例如，数组[1,2,3,4]包含10个子数组，分别是：
[1], [1,2], [1,2,3], [1,2,3,4], [2], [2,3], [2,3,4], [3], [3, 4], [4]。

输入描述
第一行输入两个数字，以空格隔开，含义是：A数组长度 k值

第二行输入A数组元素，以空格隔开

输出描述
输出A有多少子数组是k-优雅子数组

用例

| 输入 | 7 3
1 2 3 1 2 3 1 |
| ---- | ----------------- |
| 输出 | 1                 |
| 说明 | 无                |

| 输入 | 7 2
1 2 3 1 2 3 1 |
| ---- | ----------------- |
| 输出 | 10                |
| 说明 | 无                |
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
    const [len, k] = lines[0].split(' ').map(Number);
    const nums = lines[1].split(' ').map(Number);
    console.log(getResult(nums, k, len));
    lines.length = 0;
  }
});

function getResult(nums, k, len) {
  let l = 0, r = 0, res = 0;
  const count = {};
  while(r < len){
    const c = nums[r];
    count[c] = (count[c] || 0) + 1;
    while(count[c] >= k){
      res += len - r;
      count[nums[l]] --;
      l ++;
    }
    r ++;
  }
  return res;
}

const inputStr = `
7 3
1 2 3 1 2 3 1
--------
11 3
1 2 3 1 2 3 1 0 1 1 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

