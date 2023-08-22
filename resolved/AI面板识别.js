/**

题目描述

AI识别到面板上有N（1 ≤ N ≤ 100）个指示灯，灯大小一样，任意两个之间无重叠。

由于AI识别误差，每次别到的指示灯位置可能有差异，以4个坐标值描述AI识别的指示灯的大小和位置(左上角x1,y1，右下角x2,y2)，

请输出先行后列排序的指示灯的编号，排序规则：

每次在尚未排序的灯中挑选最高的灯作为的基准灯，
找出和基准灯属于同一行所有的灯进行排序。两个灯高低偏差不超过灯半径算同一行（即两个灯坐标的差 ≤ 灯高度的一半）。
输入描述
第一行为N，表示灯的个数
接下来N行，每行为1个灯的坐标信息，格式为：

编号 x1 y1 x2 y2

编号全局唯一
1 ≤ 编号 ≤ 100
0 ≤ x1 < x2 ≤ 1000
0  ≤  y1 < y2 ≤ 1000
输出描述
排序后的编号列表，编号之间以空格分隔

用例
输入	5
1 0 0 2 2
2 6 1 8 3
3 3 2 5 4
5 5 4 7 6
4 0 4 2 6
输出	1 2 3 4 5
说明	

[![image.png](https://i.postimg.cc/Hs0TqpDW/image.png)](https://postimg.cc/RNFrfxZ2)
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length == n + 1) {
 
    const lights = lines.slice(1).map((line) => {
      const [id, x1, y1, x2, y2] = line.split(" ").map(Number);
      return new Light(id, (x1 + x2) >> 1, (y1 + y2) >> 1, (x2 - x1) >> 1);
    });
 
    console.log(getResult(lights));
 
    lines.length = 0;
  }
});

class Light {
  constructor(id,x,y,r){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

function getResult(lights){
  // 以圆心的y排序
  lights.sort((a,b)=>a.y - b.y);
  let base = lights[0];
  let sameRow = [base];
  let res = [];
  for(let i = 1;i<lights.length;i++){
    if(lights[i].y - base.y <= base.r){
      sameRow.push(lights[i]);
    }else{
      res = res.concat(sameRow.sort((a,b)=>a.x-b.x).map(l=>l.id));
      base = lights[i];
      sameRow = [base];
    }
  }
  res = res.concat(sameRow.sort((a,b)=>a.x-b.x).map(l=>l.id));
  return res.join(' ');
}