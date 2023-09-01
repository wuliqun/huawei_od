
/**
题目描述
祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;
整体上常年光照良好，但是也有一些地区光照不太好。
某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，
其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。
我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。

输入描述
第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量
之后每行为调研区域每平方公里的发电量

输出描述
输出为这样的区域有多少个

用例

输入	2 5 2 6
1 3 4 5 8
2 3 6 7 1
输出	4
说明	
输入含义：

调研的区域大小为长2宽5的矩形，我们要建设的电站的边长为2，建设电站最低发电量为6.

输出含义：

长宽为2的正方形满足发电量大于等于6的区域有4个。

输入	2 5 1 6
1 3 4 5 8
2 3 6 7 1
输出	3
说明	无
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
    const [n, m, len, min] = lines[0].split(' ').map(Number);
    const matrix = lines.slice(1).map(l=>l.split(' ').map(Number));
    console.log(getResult(matrix, n, m, len, min));
    lines.length = 0;
  }
});


function getResult(matrix, n, m, len, min) {
  const preSum = new Array(n + 1).fill(0).map(()=>new Array(m + 1).fill(0));
  for(let i = 1;i <= n;i++){
    for(let j = 1;j <= m;j++){
      preSum[i][j] = matrix[i - 1][j - 1] + preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1];
    }
  }
  let count = 0;
  for(let i = len;i <= n ;i++){
    for(j = len;j <= m ;j++){
      const sum = preSum[i][j] - preSum[i - len][j] - preSum[i][j - len] + preSum[i - len][j - len];
      if(sum >= min) count ++;
    }
  }
  return count;
}


const inputStr = `
2 5 2 6
1 3 4 5 8
2 3 6 7 1
------
2 5 1 6
1 3 4 5 8
2 3 6 7 1
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

