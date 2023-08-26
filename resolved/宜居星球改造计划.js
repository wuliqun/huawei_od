
/**
题目描述 
2XXX年，人类通过对火星的大气进行宜居改造分析，使得火星已在理论上具备人类宜居的条件；

由于技术原因，无法一次性将火星大气全部改造，只能通过局部处理形式；

假设将火星待改造的区域为row * column的网格，每个网格有3个值，宜居区、可改造区、死亡区，使用YES、NO、NA代替，YES表示该网格已经完成大气改造，NO表示该网格未进行改造，后期可进行改造，NA表示死亡区，不作为判断是否改造完的宜居，无法穿过；

初始化下，该区域可能存在多个宜居区，并目每个宜居区能同时在每个大阳日单位向上下左右四个方向的相邻格子进行扩散，自动将4个方向相邻的真空区改造成宜居区；

请计算这个待改造区域的网格中，可改造区是否能全部成宜居区，如果可以，则返回改造的大阳日天教，不可以则返回-1

输入描述
输入row * column个网格数据，每个网格值枚举值如下: YES，NO，NA；

样例:

YES YES NO
NO NO NO
NA NO YES

输出描述
可改造区是否能全部变成宜居区，如果可以，则返回改造的太阳日天数，不可以则返回-1。

备注
grid[i][j]只有3种情况，YES、NO、NA

row == grid.length
column == grid[i].length
1 ≤ row, column ≤ 8
用例
输入	YES YES NO
NO NO NO
YES NO NO
输出	2
说明	经过2个太阳日，完成宜居改造
输入	YES NO NO NO
NO NO NO NO
NO NO NO NO
NO NO NO NO
输出	6
说明	经过6个太阳日，可完成改造
输入	NO NA
输出	-1
说明	无改造初始条件，无法进行改造
输入	YES NO NO YES
NO NO YES NO
NO YES NA NA
YES NO NA NO
输出	-1
说明	-1 // 右下角的区域，被周边三个死亡区挡住，无法实现改造
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  if(line === ''){
    console.log(getResult(lines.map(l=>l.split(' '))));
    lines.length = 0;
  }else{
    lines.push(line);
  }
});

const directions = [
  {
    x:-1,
    y:0
  },{
    x:1,
    y:0
  },{
    x:0,
    y:-1,
  },{
    x:0,
    y:1
  }
]

function getResult(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let list = [],count = 0,days = 0;
  for(let i = 0;i<m;i++){
    for(let j = 0;j<n;j++){
      switch(matrix[i][j]){
        case 'YES':
          list.push([i,j]);
          break;
        case 'NO':
          count ++;
          break;
      }
    }
  }
  while(list.length > 0 && count > 0){
    days ++;
    let newList = [];
    for(const [i,j] of list){
      for(const {x,y} of directions){
        let newX = i + x;
        let newY = j + y;
        if(newX >=0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] === 'NO'){
          matrix[newX][newY] = 'YES';
          newList.push([newX,newY]);
          count --;
        }
      }
    }
    list = newList;
  }

  if(count !== 0) return -1;
  return days;
}
