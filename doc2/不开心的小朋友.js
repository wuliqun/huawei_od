
/**
题目描述
游乐场里增加了一批摇摇车，非常受小朋友欢迎，但是每辆摇摇车同时只能有一个小朋友使用，如果没有空余的摇摇车，需要排队等候，或者直接离开，最后没有玩上的小朋友会非常不开心。

请根据今天小朋友的来去情况，统计不开心的小朋友数量。

摇摇车数量为N，范围是: 1 ≤ N < 10；
每个小朋友都对应一个编码，编码是不重复的数字，今天小朋友的来去情况，可以使用编码表示为：1 1 2 3 2 3。(若小朋友离去之前有空闲的摇摇车，则代表玩耍后离开；不考虑小朋友多次玩的情况)。小朋友数量 ≤ 100
题目保证所有输入数据无异常且范围满足上述说明。
输入描述
第一行: 摇摇车数量
第二行: 小朋友来去情况

输出描述
返回不开心的小朋友数量

用例
输入	1
1 2 1 2
输出	0
说明	第一行，1个摇摇车
第二行，1号来 2号来(排队) 1号走 2号走 (1号走后摇摇车已有空闲，所以玩后离开)
输入	1
1 2 2 3 1 3
输出	1
说明	
第一行，1个摇摇车

第二行，1号来 2号来(排队) 2号走(不开心离开) 3号来(排队) 1号走 3号走(1号走后摇摇车已有空闲，所以玩后离开)

 */
// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//     lines.push(line);
//     if(lines.length === 2){
//         const nums = lines[1].split(' ').map(Number)
//         console.log(getResult(nums));
//         lines.length = 0;
//     }
// });
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 2) {
    const count = parseInt(lines[0]);
    const nums = lines[1].split(" ").map(Number);
    console.log(getResult(count, nums));
    lines.length = 0;
  }
});
// 1playing  0end -1waiting
function getResult(count,nums) {
  let index = 0,playingStatus = {},waitList = [],res = 0;
  while(index < nums.length){
    if(!playingStatus[nums[index]]){
      playingStatus[nums[index]] = -1;
      waitList.push(nums[index]);
    }else if(playingStatus[nums[index]] === 1){
      playingStatus[nums[index]] = 0;
      count ++;
    }else if(playingStatus[nums[index]] === -1){
      res ++;
      playingStatus[nums[index]] = 0;
      for(let i = 0;i<waitList.length;i++){
        if(waitList[i] === nums[index]){
          waitList.splice(i,1);
          break;
        }
      }
    }


    while(count > 0 && waitList.length > 0){
      let id = waitList.shift();
      playingStatus[id] = 1;
      count --;
    }
    index ++;
  }

  return res;

}
