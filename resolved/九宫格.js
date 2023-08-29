
/**
题目描述
九宫格是一款广为流传的游戏，起源于河图洛书。
游戏规则是：1到9九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之和都等于15.
在金麻名著《射雕英雄传》中黃蓉曾给九宫格的一种解法，口诀：戴九恩一，左三右七，二四有肩，八六为足，五居中央。解法如图所示。


现在有一种新的玩法，给九个不同的数字，将这九个数字放在3×3的格子中，要求每行、每列以及两个对角线上的三数之积相等（三阶积幻方）。其中一个三阶幻方如图：
解释：每行、每列以及两个对角线上的三数之积相等，都为216。请设计一种算法，将给定的九个数宇重新排列后，使其满足三阶积幻方的要求。
排列后的九个数宇中：第1-3个数字为方格的第一行，第4-6个数宇为方格的第二行，第7-9个数字为方格的第三行。

输入描述
九个不同的数宇，每个数字之间用空格分开。
0＜数字<10^7。0<排列后满足要求的每行、每列以及两个对角线上的三数之积 ＜ 2^31-1。

输出描述
九个数字所有满足要求的排列，每个数字之间用空格分开。每行输出一个满足要求的排列。
要求输出的排列升序排序，即：对于排列A (A1.A2.A3…A9)和排列B(B1,B2,B3…B9），从排列的第1个数字开始，遇到Ai<Bi，则排列A<排列B （1<=j<=9)。

说明：用例保证至少有一种排列组合满足条件。

用例

输入	75 36 10 4 30 225 90 25 12
输出	10 36 75 225 30 4 12 25 90
10 225 12 36 30 25 75 4 90
12 25 90 225 30 4 10 36 75
12 225 10 25 30 36 90 4 75
75 4 90 36 30 25 10 225 12
75 36 10 4 30 225 90 25 12
90 4 75 25 30 36 12 225 10
90 25 12 4 30 225 75 36 10
说明	无
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  console.log(getResult(line.split(' ').map(Number)));
});

const LEN = 9;
function getResult(nums) {
  nums.sort((a, b)=>a - b);
  let res = [];
  // 找出全排列  一个个验证
  dfs(nums, [], res, new Set());
  res = res.filter((nums)=>check(nums));
  // 先将原数组排序  这样全排列本身就是有序的 
  // .sort((nums1, nums2)=>{
  //   for(let i = 0;i < LEN;i++){
  //     let t = nums1[i] - nums2[i];
  //     if(t !== 0) return t;
  //   }
  //   return 0;
  // });

  return res.map(nums=>nums.join(' ')).join('\n');
}

function dfs(nums, arr, res, set){
  if(arr.length === LEN){
    res.push([...arr]);
    return;
  }
  for(let i = 0;i < LEN;i++){
    if(set.has(i)) continue;
    arr.push(nums[i]);
    set.add(i);
    dfs(nums, arr, res, set);
    arr.pop();
    set.delete(i);
  }
}

function check(nums, m = 3){
  let product = 1, i, j, rowProduct, colProduct, d = 1, d2 = 1;
  for(i = 0;i < m;i++){
    product *= nums[i];
  }
  for(i = 0;i < m;i++){
    // 行 | 列
    rowProduct = 1;
    colProduct = 1;
    for(j = 0;j < m;j++){
      rowProduct *= nums[i * m + j];
      colProduct *= nums[j * m + i];
      if(i === j) {
        d *= nums[i * m + j];
      }
      if(i + j === m - 1){
        d2 *= nums[i * m + j];
      }
    }
    if(rowProduct !== product || colProduct !== product) return false;
  }
  // 对角线
  if(d !== product || d2 !== product) return false;
  return true;
}

// test
const inputStr = `
75 36 10 4 30 225 90 25 12
-------
75 36 10 4 30 12 90 25 225
`;


!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

