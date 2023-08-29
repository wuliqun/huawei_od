
/**
题目描述
公司老板做了一笔大生意，想要给每位员工分配一些奖金，想通过游戏的方式来决定每个人分多少钱。
按照员工的工号顺序，每个人随机抽取一个数字。
按照工号的顺序往后排列，遇到第一个数字比自己数字大的，那么，前面的员工就可以获得“距离*数字差值”的奖金。
如果遇不到比自己数字大的，就给自己分配随机数数量的奖金。
例如，按照工号顺序的随机数字是：2,10,3。
那么第2个员工的数字10比第1个员工的数字2大，
所以，第1个员工可以获得1*（10-2）=8。第2个员工后面没有比他数字更大的员工，
所以，他获得他分配的随机数数量的奖金，就是10。
第3个员工是最后一个员工，后面也没有比他更大数字的员工，所以他得到的奖金是3。

请帮老板计算一下每位员工最终分到的奖金都是多少钱。

输入描述
第一行n表示员工数量（包含最后一个老板）
第二是每位员工分配的随机数字

输出描述
最终每位员工分到的奖金数量

注：随机数字不重复，员工数量（包含老板）范围1~10000，随机数范围1~100000

用例

输入
3
2 10 3
输出
8 10 3
说明 无
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


function getResult(nums, n) {
  const res = nums.slice();
  const stack = [];
  for(let i = 0;i < n;i ++){
    while(stack.length && stack.at(-1)[0] < nums[i]){
      const [num, index] = stack.pop();
      res[index] = nums[i] - num;
    }
    stack.push([nums[i], i]);
  }
  return res.join(' ');
}



const inputStr = `
3
2 10 3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

