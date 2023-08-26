
/**
题目描述
小明玩一个游戏。

系统发1+n张牌，每张牌上有一个整数。

第一张给小明，后n张按照发牌顺序排成连续的一行。

需要小明判断，后n张牌中，是否存在连续的若干张牌，其和可以整除小明手中牌上的数字。

输入描述
输入数据有多组，每组输入数据有两行，输入到文件结尾结束。

第一行有两个整数n和m，空格隔开。m代表发给小明牌上的数字。

第二行有n个数，代表后续发的n张牌上的数字，以空格隔开。

输出描述
对每组输入，如果存在满足条件的连续若干张牌，则输出1;否则，输出0

备注
1 ≤ n ≤ 1000
1 ≤ 牌上的整数 ≤ 400000
输入的组数，不多于1000
用例确保输入都正确，不需要考虑非法情况。
用例
输入	6 7
2 12 6 3 5 5
10 11
1 1 1 1 1 1 1 1 1 1
输出	
1

0

说明	两组输入。第一组小明牌的数字为7，再发了6张牌。第1、2两张牌教字和为14，可以整除7，输出1，第二组小明牌的教字为11，再发了10张牌，这10张牌数字和为10，无法整除11，输出0。
 */

// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//   if(line === ''){
//     console.log(getResult(lines.map(l=>l.split(' '))));
//     lines.length = 0;
//   }else{
//     lines.push(line);
//   }
// });



/**
 * 
 * @param {number[]} nums 
 * @param {number} n 
 * @returns 
 */
function getResult(nums,n) {
  const memo = {};
  for(let i = 0;i<nums.length;i++){
    if(dfs(nums,i,n,0,memo)){
      return 1;
    }
  }
  return 0;
}

function dfs(nums,startIndex,target,tail,memo){
  const key = `${startIndex}-${target}-${tail}`;
  if(typeof memo[key] === "boolean") return memo[key];
  let res = false;
  if(startIndex < nums.length){
    const newTail = nums[startIndex] % target;
    if(newTail === tail){
      res = true;
    }else{
      res = dfs(nums,startIndex + 1,target,(target + tail - newTail) % target,memo);
    }
  }

  memo[key] = res;
  return res;
}


const testCases = [
  [[2, 12, 6, 3, 5, 5],10],
  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],11]
];

const testCaseResult = [1,1];
for(let i = 0;i<testCases.length;i++){
  console.log(getResult(...testCases[i]) === testCaseResult[i]);
}
