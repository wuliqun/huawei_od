
/**
题目描述
对于任意两个正整数A和B，定义它们之间的差异值和相似值：
差异值：A、B转换成二进制后，对于二进制的每一位，对应位置的bit值不相同则为1，否则为0；
相似值：A、B转换成二进制后，对于二进制的每一位，对应位置的bit值都为1则为1，否则为0；
现在有n个正整数A0到A（n-1），问有多少(i, j) (0<=i<j<n），Ai和Aj的差异值大于相似值。
假设A=5，B=3；则A的二进制表示101；B的二进制表示011；
则A与B的差异值二进制为110；相似值二进制为001；
A与B的差异值十进制等于6，相似值十进制等于1，满足条件。

输入描述
一个n接下来n个正整数

数据范围：1<=n<=10^5，1<=A[i]<2^30

输出描述
满足差异值大于相似值的对数

用例

| 输入 | 4 4 3 5 2                                     |
| ---- | --------------------------------------------- |
| 输出 | 4                                             |
| 说明 | 满足条件的分别是(0,1)(0,3)(1,2)(2,3)，共4对。 |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  console.log(getResult2(line.split(' ').map(Number)));
});

function getResult(nums) {
  let count = 0;
  for(let i = 0;i < nums.length;i++){
    for(let j = i + 1;j < nums.length;j++){
      if((nums[i] ^ nums[j]) > (nums[i] & nums[j])) count ++;
    }
  }

  return count;
}

// 高位相同 必然不符合  高位不同符合
function getResult2(nums){
  let highBit = new Array(60).fill(0);
  let res = 0;
  for(const num of nums){
    const binary = num.toString(2);
    if(binary === '0'){
      highBit[0] ++;
    }else{
      highBit[binary.length] ++;
    }
  }
  highBit = highBit.filter(c=>c);
  for(let i = 0;i < highBit.length;i++){
    for(j = i + 1;j < highBit.length;j++){
      res += highBit[j] * highBit[i];
    }
  }
  return res;
}


// test
const inputStr = `
4 3 5 2
`;


!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

