
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
 
const lines = [];
let t, c, n, m;
let matrix;
let count = 0;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 2) {
    [t, c] = lines[0].split(" ").map(Number);
    [n, m] = lines[1].split(" ").map(Number);
  }
 
  if (n && lines.length === n + 2) {
    matrix = lines.slice(2).map((line) => line.split(""));
    console.log(getResult());
    console.log(count);
    count = 0;
    lines.length = 0;
  }
});
 
function getResult() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == "S") {
        return dfs(i, j, 0, 0, undefined, new Set([`${i}-${j}`]))
          ? "YES"
          : "NO";
      }
    }
  }
}
 
const offsets = [
  [-1, 0, "up"],
  [1, 0, "down"],
  [0, -1, "left"],
  [0, 1, "right"],
];
 
/**
 * @param {*} si 当前位置横坐标
 * @param {*} sj 当前位置纵坐标
 * @param {*} ut 已拐弯次数
 * @param {*} uc 已破壁次数
 * @param {*} lastDirect 上一次运动方向，初始为undefined，表示第一次运动不会造成拐弯
 * @param {*} path 行动路径，用于记录走过的位置，避免走老路
 * @returns
 */
function dfs(si, sj, ut, uc, lastDirect, path) {
  count ++;
  // 如果当前位置就是目的地，则返回true
  if (matrix[si][sj] == "T") {
    return true;
  }
 
  // 有四个方向选择走下一步
  for (let offset of offsets) {
    const [offsetX, offsetY, direct] = offset;
    const newI = si + offsetX;
    const newJ = sj + offsetY;
 
    // flag1记录是否拐弯
    let flag1 = false;
    // flag2记录是否破壁
    let flag2 = false;
 
    // 如果下一步位置没有越界，则进一步检查
    if (newI >= 0 && newI < n && newJ >= 0 && newJ < m) {
      // 如果下一步位置已经走过了，则是老路，可以不走
      const pos = `${newI}-${newJ}`;
      if (path.has(pos)) continue;
 
      // 如果下一步位置需要拐弯
      if (lastDirect && lastDirect != direct) {
        // 如果拐弯次数用完了，则不走
        if (ut + 1 > t) continue;
        // 否则就走
        flag1 = true;
      }
 
      // 如果下一步位置需要破壁
      if (matrix[newI][newJ] == "*") {
        // 如果破壁次数用完了，则不走
        if (uc + 1 > c) continue;
        // 否则就走
        flag2 = true;
      }
 
      // 记录已走过的位置
      path.add(pos);
 
      // 继续下一步递归
      const res = dfs(
        newI,
        newJ,
        ut + (flag1 ? 1 : 0), // 如果拐弯了，则已使用的拐弯次数++
        uc + (flag2 ? 1 : 0), // 如果破壁了，则已使用的破壁次数++
        direct,
        path
      );
 
      // 如果某路径可以在给定的t,c下，到达目的地T，则返回true
      if (res) return true;
 
      // 否则，回溯
      path.delete(pos);
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