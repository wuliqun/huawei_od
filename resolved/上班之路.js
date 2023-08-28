
/**
题目描述
Jungle 生活在美丽的蓝鲸城，大马路都是方方正正，但是每天马路的封闭情况都不一样。
地图由以下元素组成：
1）”.” — 空地，可以达到;
2）”*” — 路障，不可达到;
3）”S” — Jungle的家;
4）”T” — 公司.
其中我们会限制Jungle拐弯的次数，同时Jungle可以清除给定个数的路障，现在你的任务是计算Jungle是否可以从家里出发到达公司。

输入描述
输入的第一行为两个整数t,c（0 ≤ t,c ≤ 100）,t代表可以拐弯的次数，c代表可以清除的路障个数。

输入的第二行为两个整数n,m（1 ≤ n,m ≤ 100）,代表地图的大小。

接下来是n行包含m个字符的地图。n和m可能不一样大。

我们保证地图里有S和T。

输出描述
输出是否可以从家里出发到达公司，是则输出YES，不能则输出NO。

用例

输入
2 0
5 5
..S..
****.
T....
****.
.....
输出
YES

输入
1 2
5 5
.*S*.
*****
..*..
*****
T....
输出
NO
说明 该用例中，至少需要拐弯1次，清除3个路障，所以无法到达
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
let matrix, rows, cols;
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[1]) + 2){
    const [turn, smash] = lines[0].split(' ').map(Number);
    [rows, cols] = lines[1].split(' ').map(Number);
    matrix = lines.slice(2).map(line=>line.split(''));
    console.log(getResult(turn, smash) ? 'YES' : 'NO');
    lines.length = 0;
  }
});

const directions = [
  {
    x: -1,
    y: 0,
  }, {
    x: 1,
    y: 0,
  }, {
    x: 0,
    y: 1,
  }, { 
    x: 0,
    y: -1, 
  },
];


/**
 * 
 * @param {Array<Array<string>>} matrix 
 * @param {number} rows 
 * @param {number} cols 
 * @param {number} turn 
 * @param {number} smash 
 */
function getResult(turn, smash){
  let i, j;
  for(i = 0;i < rows;i++){
    for(j = 0;j < cols;j++){
      if(matrix[i][j] === 'S'){
        return canReach(turn, smash, i, j, null, new Set([`${i}-${j}`]));
      }
    }
  }
}

function canReach(turn, smash, x, y, lastDirection, path){
  if(turn < 0 || smash < 0) return false;
  if(matrix[x][y] === 'T') return true;
  for(const direction of directions){
    const newX = x + direction.x;
    const newY = y + direction.y;
    if(newX >= 0 && newX < rows && newY >= 0 && newY < cols){
      if(path.has(`${newX}-${newY}`)) continue;
      path.add(`${newX}-${newY}`);
      let turned = 0, smashed = 0;
      if(lastDirection && lastDirection !== direction){
        turned = 1;
      }
      if(matrix[newX][newY] === '*'){
        smashed = 1;
      }

      if(canReach(turn - turned, smash - smashed, newX, newY, direction, path)){
        return true;
      }

      path.delete(`${newX}-${newY}`);
    }
  }

  return false;
}


// test
const inputStr = `
2 0
5 5
..S..
****.
T....
****.
.....
-------
1 2
5 5
.*S*.
*****
..*..
*****
T....
`;


!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();