
/**
题目描述
跳房子，也叫跳飞机，是一种世界性的儿童游戏。

游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格，然后获得一次选房子的机会，直到所有房子被选完，房子最多的人获胜。

跳房子的过程中，如果有踩线等违规行为，会结束当前回合，甚至可能倒退几步。

假设房子的总格数是count，小红每回合可能连续跳的步数都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红三个回合跳到最后一格?

如果有，请输出索引和最小的步数组合（数据保证索引和最小的步数组合是唯一的）。

注意：数组中的步数可以重复，但数组中的元素不能重复使用。

输入描述
第一行输入为房子总格数count，它是int整数类型。
第二行输入为每回合可能连续跳的步数，它是int整数数组类型

输出描述
返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

备注
count ≤ 10000
3 ≤ steps.length ≤ 10000
-100000 ≤ steps[i] ≤ 100000
用例
输入	[1,4,5,2,0,2]
9
输出	[4,5,0]
说明	无
输入	[1,5,2,0,2,4]
9
输出	[5,2,2]
说明	无
输入	[-1,2,4,9]
12
输出	[-1,4,9]
说明	无
 */

// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//   console.log(getResult(line), "\n\n");
// });


function getResult(nums, target){  
  const numsWithIndex = nums.map((num, index)=>{ return { num, index } }).sort((a, b)=>a.num - b.num);
  let i, l, r, sum, res = [];
  for(i = 0;i < nums.length;i++){
    l = i + 1;
    r = nums.length - 1;
    while(l < r){
      sum = numsWithIndex[i].num + numsWithIndex[l].num + numsWithIndex[r].num;
      if(sum === target){
        res.push([i, l, r]);
        break;
      }else if(sum > target){
        r --;
      }else{
        l ++
      }
    }
  }
  res.sort((a, b)=>{
    return numsWithIndex[a[0]].index + numsWithIndex[a[1]].index + numsWithIndex[a[2]].index - (numsWithIndex[b[0]].index + numsWithIndex[b[1]].index + numsWithIndex[b[2]].index)
  })
  console.log([numsWithIndex[res[0][0]], numsWithIndex[res[0][1]], numsWithIndex[res[0][2]]].sort((a, b)=>a.index - b.index).map(a=>a.num))
}

getResult([1, 4, 5, 2, 0, 2], 9)
getResult([1, 5, 2, 0, 2, 4], 9)
getResult([-1, 2, 4, 9], 12)



// // test
// const inputStr = `
// hello,2,ok,0,bye,0,test,0,one,1,two,1,a,0
// A,5,A,0,a,0,A,0,a,0,A,0
// A,3,B,2,C,0,D,1,E,0,F,1,G,0,H,1,I,1,J,0,K,1,L,0,M,2,N,0,O,1,P,0
// `;

// !function test(){
//   inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
//     rl.emit("line", line);
//   });
//   process.exit(0)
// }();

