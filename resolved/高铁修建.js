
/**
题目描述
高铁城市圈对人们的出行、经济的拉动效果明显。每年都会规划新的高铁城市圈建设。

在给定：城市数量，可建设高铁的两城市间的修建成本列表、以及结合城市商业价值会固定建设的两城市建高铁。


请你设计算法，达到修建城市高铁的最低成本。

注意，需要满足城市圈内城市间两两互联可达(通过其他城市中转可达也属于满足条件）。

输入描述
第一行，包含此城市圈中城市的数量、可建设高铁的两城市间修建成本列表数量、必建高铁的城市列表。三个数字用空格间隔。
可建设高铁的两城市间的修建成本列表，为多行输入数据，格式为3个数字，用空格分隔，长度不超过1000。
固定要修建的高铁城市列表，是上面参数2的子集，可能为多行，每行输入为2个数字，以空格分隔。
城市id从1开始编号，建设成本的取值为正整数，取值范围均不会超过1000

输出描述
修建城市圈高铁的最低成本，正整数。如果城市圈内存在两城市之间无法互联，则返回-1。

用例

输入	3 3 0
1 2 10
1 3 100
2 3 50
输出	60
说明	3 3 0城市圈数量为3，表示城市id分别为1,2,3
1 2 10城市1，2间的高铁修建成本为10
1 3 100城市1，3间的高铁修建成本为100
2 3 50城市2，3间的高铁修建成本为50
满足修建成本最低，只需要建设城市1，2间，城市2，3间的高铁即可，城市1，3之间可通过城市2中转来互联。这样最低修建成本就是60。
输入	3 3 1
1 2 10
1 3 100
2 3 50
1 3
输出	110
说明	无
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let M, N1, N2;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 1){
    [M, N1, N2] = lines[0].split(' ').map(Number);
  }else if(lines.length === N1 + N2 + 1){
    const costs = lines.slice(1, 1 + N1).map(l=>l.split(' ').map(Number));
    const needs = lines.slice(N1 + 1).map(l=>l.split(' ').map(Number));

    console.log(getResult(costs, needs, M));
    lines.length = 0;
  }
});

function getResult(costs, needs, M){
  const costsMap = new Map();
  for(let [i, j, c] of costs){
    if(i > j){
      [i, j] = [j, i];
    }
    costsMap.set(`${i}-${j}`, c);
  }
  
  const dp = new Array(M + 1).fill(0);
  for(let i = 2;i <= M;i++){
    let min = 0;
    for(let [x, y] of needs){
      if(x > y){
        [x, y] = [y, x];
      }
      if(y === i){
        if(costsMap.has(`${x}-${y}`)){
          min += costsMap.get(`${x}-${y}`);
        }else{
          return -1;
        }
      }
    }
    if(!min){
      for(let j = 1;j < i;j++){
        if(costsMap.has(`${j}-${i}`)){
          let c = costsMap.get(`${j}-${i}`);
          if(!min || min > c){
            min = c;
          }
        }
      }
    }
    if(!min) return -1;
    dp[i] = dp[i - 1] + min;
  }

  return dp[M];
}


const inputStr = `
3 3 0
1 2 10
1 3 100
2 3 50
------
3 3 1
1 2 10
1 3 100
2 3 50
1 3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

