
/**
题目描述
给一个无向图染色，可以填红黑两种颜色，必须保证相邻两个节点不能同时为红色，输出有多少种不同的染色方案？

输入描述
第一行输入M(图中节点数) N(边数)

后续N行格式为：V1 V2表示一个V1到V2的边。

数据范围：1 <= M <= 15,0 <= N <= M * 3，不能保证所有节点都是连通的。

输出描述
输出一个数字表示染色方案的个数。

用例

输入	4 4
1 2
2 4
3 4
1 3
输出	7
说明	
4个节点，4条边，1号节点和2号节点相连，

2号节点和4号节点相连，3号节点和4号节点相连，

1号节点和3号节点相连，

若想必须保证相邻两个节点不能同时为红色，总共7种方案。

输入	3 3
1 2
1 3
2 3
输出	4
说明	无
输入	4 3
1 2
2 3
3 4
输出	8
说明	无
输入	4 3
1 2
1 3
2 3
输出	8
说明	无
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let count = 0;
rl.on("line", (line) => {
  lines.push(line);
  if(parseInt(lines[0].split(' ')[1]) + 1 === lines.length){
    const [M, N] = lines[0].split(' ').map(Number);
    const arr = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult(arr, M, N));
    lines.length = 0;
    count = 0;
  }
});

function getResult(arr, M, N){
  const linkArr = new Array(M).fill(0).map(()=>new Set());
  for(const [i, j] of arr){
    linkArr[i - 1].add(j - 1);
    linkArr[j - 1].add(i - 1);
  }
  dfs(linkArr, M, [], 0);
  return count;
}

// 0黑 1红
function dfs(linkArr, M, path, startIndex){
  if(startIndex === M){
    count ++;
    return ;
  }
  path.push(0);
  dfs(linkArr, M, path, startIndex + 1);
  path.pop();
  
  let hasRed = false;
  for(const i of linkArr[startIndex]){
    if(path[i] === 1) {
      hasRed = true;
      break;
    }
  }

  if(!hasRed){
    path.push(1);
    dfs(linkArr, M, path, startIndex + 1);
    path.pop();
  }
}



const inputStr = `
4 4
1 2
2 4
3 4
1 3
------
3 3
1 2
1 3
2 3
------
4 3
1 2
2 3
3 4
------
4 3
1 2
1 3
2 3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

