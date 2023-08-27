
/**
题目描述

有一个64×64的[矩阵](https://so.csdn.net/so/search?q=矩阵&spm=1001.2101.3001.7020)，每个元素的默认值为0，现在向里面填充数字，相同的数字组成一个实心图形，如下图所示是矩阵的局部（空白表示填充0）：

[![image.png](https://img-blog.csdnimg.cn/52ca08262cb9437dab0b430f7f370a9b.png)]

数字1组成了蓝色边框的实心图形，数字2组成了红色边框的实心图形。

单元格的边长规定为1个单位。

请根据输入，计算每个非0值填充出来的实心圆形的周长。

输入描述
第一行输入N，表示N个图形，N > 0 且 N < 64 × 64
矩阵左上角单元格坐标记作(0, 0)，第一个数字表示行号，第二个数字表示列号
接下来是N行，每行第一个数是矩阵单元格填充的数字，后续每两个一组，表示填充该数字的单元格坐标
答题者无需考虑数据格式非法的场景，题目用例不考察数据格式
题目用例保证同一个填充值只会有一行输入数据
输出描述
一共输出N个数值，每个数值表示某一行输入表示图形的周长
输出顺序需和输入的隔行顺序保持一致，即第1个数是输入的第1个图形的周长，第2个数是输入的第2个图形的周长，以此类推。
用例
输入	2
1 1 3 2 2 2 3 2 4 3 2 3 3 3 4 4 1 4 2 4 3 4 4 5 2 5 3
2 3 7 3 8 4 5 4 6 4 7 4 8 5 4 5 5 5 6 5 7 5 8 6 4 6 5 6 6 6 7 6 8 7 4 7 5 7 6 7 7 7 8
输出	18 20
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
  if(lines.length === Number(lines[0]) + 1){
    const matrix = new Array(64).fill(0).map(()=>new Array(64).fill(0));
    const graphs = lines.slice(1).map(l=>l.split(' ').map(Number));
    graphs.map(nums=>{
      for(let i = 1;i < nums.length;i += 2){
        matrix[nums[i]][nums[i + 1]] = nums[0];
      }
    });
    graphs.map(nums=>{
      console.log(getResult(matrix, nums[0], [[nums[1], nums[2]]]));
    });
    lines.length = 0;
  }
});


const directions = [
  {
    x: -1,
    y: 0,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 0,
    y: 1,
  },
]
function getResult(matrix, num, init){  
  let stack = init.slice();
  let res = 0;
  const visited = {};
  while(stack.length){
    let newStack = [], newX, newY;
    for(const [i, j] of stack){
      if(visited[`${i}-${j}`]) continue;
      visited[`${i}-${j}`] = true;
      for(const { x, y } of directions){
        newX = i + x;
        newY = j + y;
        if(newX >= 0 && newX < 64 && newY >= 0 && newY < 64){
          if(matrix[newX][newY] !== num){
            res ++;
          }else{
            newStack.push([newX, newY]);
          }
        }
      }
    }
    stack = newStack;
  }
  return res;
}




