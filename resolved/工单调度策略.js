
/**
题目描述
当小区通信设备上报警时，系统会自动生成待处理的工单，华为工单调度系统需要根据不同的策略，调度外线工程师（FME）上站修复工单对应的问题。

根据与运营商签订的合同，不同严重程度的工单被处理并修复的时长要求不同，这个要求被修复的时长我们称之为SLA时间。

假设华为和运营商A签订了运维合同，部署了一套调度系统，只有1个外线工程师（FME），每个工单根据问题严重程度会给一个评分，在SLA时间内完成修复的工单，华为获得工单评分对应的积分，超过SLA完成的工单不获得积分，但必须完成该工单。运营商最终会根据积分进行付款。

请设计一种调度策略，根据现状得到调度结果完成所有工单，让这个外线工程师处理的工单获得的总积分最多。

假设从某个调度时刻开始，当前工单数量为N，不会产生新的工单，每个工单处理修复耗时为1小时，请设计你的调度策略，完成业务目标。

不考虑外线工程师在小区之间行驶的耗时。

输入描述
第一行为一个整数N，表示工单的数量。

接下来N行，每行包括两个整数。第一个整数表示工单的SLA时间（小时），第二个数表示该工单的积分。

输出描述
输出一个整数表示可以获得的最大积分。

备注
工单数量N ≤ 10^6
SLA时间 ≤ 7 * 10^5
答案的最大积分不会超过2147483647
用例
假设有7个工单的SLA时间（小时）和积分如下：

| 工单编号 | SLA  | 积分 |
| -------- | ---- | ---- |
| 1        | 1    | 6    |
| 2        | 1    | 7    |
| 3        | 3    | 2    |
| 4        | 3    | 1    |
| 5        | 2    | 4    |
| 6        | 2    | 5    |
| 7        | 6    | 1    |

| 输入 | 7 1 6 1 7 3 2 3 1 2 4 2 5 6 1        
| ---- | ------------------------------------------------------------ |
| 输出 | 15                                                           |
| 说明 | 最多可获得15积分，其中一个调度结果完成工单顺序为2，6，3，1，7，5，4（可能还有其他顺序） |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === Number(lines[0]) + 1){
    const n = Number(lines[0]);
    const tickets = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult(tickets, n));
    lines.length = 0;
  }
});

/**
 * @param {number[][]} tickets 
 * @param {number} n 
 */
function getResult(tickets, n) {
  tickets.sort((a, b)=>{
    return b[0] - a[0];
  });
  let i = tickets[0][0];
  let queue = [];
  let res = 0, ticket;
  while(i > 0){
    while(tickets.length && tickets[0][0] === i){
      ticket = tickets.shift();
      insertTo(queue, ticket[1]);
    }
    if(queue.length){
      res += queue.shift();
    }
    i--;
  }
  return res;
}

/**
 * 倒序排列有序数组  二分插入
 * @param {number[]} arr 
 * @param {number} num 
 * @returns 
 */
function insertTo(arr, num){
  let n = arr.length;
  if(n === 0){
    arr.push(num);
    return ;
  }
  let l = 0, r = n - 1, mid;
  if(num >= arr[l]){
    arr.unshift(num);
    return ;
  }
  if(num <= arr[r]){
    arr.push(num);
    return ;
  }
  while(l <= r){
    mid = (l + r) >> 1;
    if(arr[mid] > num){
      if(arr[mid + 1] <= num){
        arr.splice(mid + 1, 0, num);
        break;
      }
      l = mid + 1;
    }else if(arr[mid] < num){
      if(arr[mid - 1] >= num){
        arr.splice(mid, 0, num);
        break;
      }
      r = mid - 1;
    }else{
      arr.splice(mid, 0, num);
      break;
    }
  }
}



const inputStr = `
7
1 6
1 7
3 2
3 1
2 4
2 5
6 1 
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

