
/**
题目描述
快递业务范围有N个站点，A站点与B站点可以中转快递，则认为A-B站可达，如果A-B可达，B-C可达，则A-C可达。
现在给N个站点编号0、1、…n-1，用s[i][j]表示i-j是否可达，s[i][j]=1表示i-j可达，s[i][j]=0表示i-j不可达。

现用二维数组给定N个站点的可达关系，请计算至少选择从几个主站点出发，才能可达所有站点（覆盖所有站点业务）。

说明：s[i][j]与s[j][i]取值相同。

输入描述
第一行输入为N（1 < N < 10000），N表示站点个数。
之后N行表示站点之间的可达关系，第i行第j个数值表示编号为i和j之间是否可达。

输出描述
输出站点个数，表示至少需要多少个主站点。

用例

输入	4
1 1 1 1
1 1 1 0
1 1 1 0
1 0 0 1
输出	1
说明	选择0号站点作为主站点，0站点可达其他所有站点，
所以至少选择1个站点作为主站才能覆盖所有站点业务。
输入	4
1 1 0 0
1 1 0 0
0 0 1 0
0 0 0 1
输出	3
说明	
选择0号站点可以覆盖0、1站点，

选择2号站点可以覆盖2号站点，

选择3号站点可以覆盖3号站点，

所以至少选择3个站点作为主站才能覆盖所有站点业务
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 1){
    const n = Number(lines[0]);
    const matrix = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult(matrix, n));
    lines.length = 0;
  }
});


function getResult(matrix, n) {
  let count = 0;
  const set = new Set();
  const arr = [0];
  while(arr.length){
    let i = arr.pop();
    if(set.has(i)) continue;
    count ++;
    for(let j = 0;j < n;j++){
      if(matrix[i][j] === 1){
        set.add(j);
      }else if(!set.has(j)){
        arr.push(j);
      }
    }
  }
  return count;
}


const inputStr = `
4
1 1 1 1
1 1 1 0
1 1 1 0
1 0 0 1
------
4
1 1 0 0
1 1 0 0
0 0 1 0
0 0 0 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

