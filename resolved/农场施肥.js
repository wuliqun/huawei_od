
/**
题目描述
某农场主管理了一大片果园，fields[i]表示不同果林的面积，单位：m^2，现在要为所有的果林施肥且必须在n天之内完成，否则影响收成。小布是果林的工作人员，他每次选择一片果林进行施肥，且一片果林施肥完后当天不再进行施肥作业。

假设施肥机的能效为k，单位：m^2/day，请问至少租赁能效 k 为多少的施肥机才能确保不影响收成？如果无法完成施肥任务，则返回-1。

输入描述
第一行输入为m和n，m表示fields中的元素个数，n表示施肥任务必须在n天内（含n天）完成；

第二行输入为fields，fields[i]表示果林 i 的面积，单位：m^2

输出描述
对于每组数据，输出最小施肥机的能效 k ，无多余空格。

备注
1 ≤ fields.length ≤ 10^4
1 ≤ n ≤ 10^9
1 ≤ fields[i] ≤ 10^9
用例

输入	6 7
5 7 9 15 10 20
输出	9
说明	当能效k为9时，fields[0]需要1天，fields[1]需要1天，fields[2]需要1天，fields[3]需要2天，fields[4]需要2天，共需要7天，不会影响收成。
输入	3 1
2 3 4
输出	-1
说明	由于一天最多完成一片果林的施肥，无论k为多少都至少需要3天才能完成施肥，因此返回-1。
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
    console.log(getResult(nums, len, k));
    lines.length = 0;
  }
});

function getResult(nums, len, k) {
  if(k < len) return -1;
  let min = 1, max = nums[0], mid, res = -1, i;
  for(i = 0;i < len;i++){
    if(max < nums[i]) max = nums[i];
  }
  while(min <= max){
    mid = (min + max) >> 1;
    if(check(nums, mid, k)){
      res = mid;
      max = mid - 1;
    }else{
      min = mid + 1;
    }
  }
  return res;
}

function check(nums, mid, k){
  let res = 0;
  for(const num of nums){
    res += Math.ceil(num / mid);
    if(res > k) break;
  }
  return res <= k;
}

const inputStr = `
6 11
5 7 9 15 10 20
--------
3 1
2 3 4
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

