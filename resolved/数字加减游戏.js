
/**
题目描述
小明在玩一个数字加减游戏，只使用加法或者减法，将一个数字s变成数字t。
每个回合，小明可以用当前的数字加上或减去一个数字。
现在有两种数字可以用来加减，分别为a,b(a!=b)，其中b没有使用次数限制。
请问小明最少可以用多少次a，才能将数字s变成数字t。
题目保证数字s一定能变成数字t。

输入描述
输入的唯一一行包含四个正整数s,t,a,b(1<=s,t,a,b<=105)，并且a!=b。

输出描述
输出的唯一一行包含一个整数，表示最少需要使用多少次a才能将数字s变成数字t。

用例

| 输入 | 1 10 5 2                                                   |
| ---- | ---------------------------------------------------------- |
| 输出 | 1                                                          |
| 说明 | 初始值1加一次a变成6，然后加两次b变成10，因此a的使用次数为1 |

| 输入 | 1 10 5 2 11 33 4 10                                              |
| ---- | ------------------------------------------------------- |
| 输出 | 2                                                       |
| 说明 | 11减两次a变成3，然后加三次b变成33，因此a的使用次数为2次 |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  const [s, t, a, b] = line.split(' ').map(Number);
  console.log(getResult(s, t, a, b));
});

function getResult(s, t, a, b){
  if(s > t){
    [s, t] = [t, s];
  }
  if((t - s) % b === 0) return 0;
  let i;
  for(i = 1;;i++){
    if((t - s - a * i) % b === 0 || (t - s + a * i) % b === 0) break;
  }
  return i;
}



const inputStr = `
1 10 5 2
11 33 4 10
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

