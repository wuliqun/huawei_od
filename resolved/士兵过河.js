
/**
题目描述
一支N个士兵的军队正在趁夜色逃亡，途中遇到一条湍急的大河。
敌军在T的时长后到达河面，没到过对岸的士兵都会被消灭。
现在军队只找到了1只小船，这船最多能同时坐上2个士兵。

当1个士兵划船过河，用时为 a[i]；0 <= i < N
当2个士兵坐船同时划船过河时，用时为max(a[j],a[i])两士兵中用时最长的。
当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。
如果士兵下河游泳，则会被湍急水流直接带走，算作死亡。
请帮忙给出一种解决方案，保证存活的士兵最多，且过河用时最短。

输入描述
第一行：N 表示士兵数(0<N<1,000,000)
第二行：T 表示敌军到达时长(0 < T < 100,000,000)
第三行：a[0] a[1] … a[i]… a[N- 1]
a[i]表示每个士兵的过河时长。
(10 < a[i]< 100; 0<= i< N）

输出描述
第一行：”最多存活士兵数” “最短用时”

备注
1）两个士兵的同时划船时，如果划速不同则会导致船原地转圈圈；所以为保持两个士兵划速相同，则需要向划的慢的士兵看齐。
2）两个士兵坐船时，重量增加吃水加深，水的阻力增大；同样的力量划船速度会变慢；
3）由于河水湍急大量的力用来抵消水流的阻力，所以2）中过河用时不是a[i] *2，
而是a[i] * 10。

用例

输入	5
43
12 13 15 20 50
输出	3 40
说明	可以达到或小于43的一种方案：
第一步：a[0] a[1] 过河用时：13
第二步：a[0] 返回用时：12
第三步：a[0] a[2] 过河用时：15
输入	5
130
50 12 13 15 20
输出	5 128
说明	可以达到或小于130的一种方案：
第一步：a[1] a[2] 过河用时：13
第二步：a[1] 返回用时：12
第三步：a[0] a[4] 过河用时：50
第四步：a[2] 返回用时：13
第五步：a[1] a[2] 过河用时：13
第六步：a[1] 返回用时：12
第七步：a[1] a[3] 过河用时：15
所以输出为：
5 128
输入	7
171
25 12 13 15 20 35 20
输出	7 171
说明	
可以达到或小于171的一种方案：
第一步：a[1] a[2] 过桥用时：13
第二步：a[1] 带火把返回用时：12
第三步：a[0] a[5] 过桥用时：35
第四步：a[2] 带火把返回用时：13
第五步：a[1] a[2] 过桥用时：13
第六步：a[1] 带火把返回用时：12
第七步：a[4] a[6] 过桥用时：20
第八步：a[2] 带火把返回用时：13
第九步：a[1] a[3] 过桥用时：15
第十步：a[1] 带火把返回用时：12
第十一步：a[1] a[2] 过桥用时：13

所以输出为：

7 171
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];

rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 3){
    const n = Number(lines[0]);
    const total = Number(lines[1]);
    const nums = lines[2].split(' ').map(Number);
    console.log(getResult(nums, n, total));
    lines.length = 0;
  }
});

/**
 * dp[i]  i个人过河最短用时
 * @param {number[]} nums 
 * @param {number} n 
 * @param {number} total 
 */
function getResult(nums, n, total){
  const dp = new Array(n).fill(0);
  nums.sort((a, b)=>a - b);
  for(let i = 0;i < n;i++){
    if(i > 1){
      dp[i] = Math.min(
        dp[i - 1] + nums[0] + getConsume(nums[0], nums[i]),
        dp[i - 2] + nums[0] + getConsume(nums[i - 1], nums[i]) + nums[1] + getConsume(nums[0], nums[1])
      );
    }else if(i === 1){
      dp[1] = getConsume(nums[0], nums[1]);
    }else{
      dp[0] = nums[0];
    }
    if(dp[i] > total){
      return `${i} ${dp[i - 1]}`;    
    }
  }

  return `${n} ${dp[n - 1]}`;
}

/**
 * ensure t1 <= t2 
 */
function getConsume(t1, t2){
  return t1 * 10 < t2 ? t1 * 10 : t2;
}

const inputStr = `
5
43
12 13 15 20 50
-------
5
130
50 12 13 15 20
---------
7
171
25 12 13 15 20 35 20
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

