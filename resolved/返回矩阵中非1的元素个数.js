
/**
题目描述
存在一个m*n的二维数组，其成员取值范围为0，1，2。

其中值为1的元素具备同化特性，每经过1S，将上下左右值为0的元素同化为1。

而值为2的元素，免疫同化。

将数组所有成员随机初始化为0或2，再将矩阵的[0, 0]元素修改成1，在经过足够长的时间后求矩阵中有多少个元素是0或2（即0和2数量之和）。

输入描述
输入的前两个数字是矩阵大小。后面是数字矩阵内容。

输出描述
返回矩阵中非1的元素个数。

用例
输入	4 4
0 0 0 0
0 2 2 2
0 2 0 0
0 2 0 0
输出	9
说明	
输入数字前两个数字是矩阵大小。后面的数字是矩阵内容。

起始位置(0,0)被修改为1后，最终只能同化矩阵为：

1 1 1 1

1 2 2 2

1 2 0 0

1 2 0 0

所以矩阵中非1的元素个数为9
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
let lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 1){
    const [m, n] = lines[0].split(' ').map(Number)
    const matrix = lines.slice(1).map(line=>line.split(' ').map(Number));
    console.log(getResult(matrix, m, n))
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
    y: 1,
  },
  {
    x: 0,
    y: -1,
  },
]

function getResult(matrix, m, n){ 
  let count = 1;
  matrix[0][0] = 1;
  let list = [[0, 0]], newX, newY;
  while(list.length > 0){
    let newList = [];
    for(const [i, j] of list){
      for(const { x, y } of directions){
        newX = i + x;
        newY = j + y;
        if(newX >= 0 && newX < m && newY >= 0 && newY < n){
          if(matrix[newX][newY] === 0){
            count ++;
            matrix[newX][newY] = 1;
            newList.push([newX, newY])
          }
        }
      }
    }
    list = newList;
  }

  return m * n - count;
}



// test
const inputStr = `
4 4
0 0 0 0
0 2 2 2
0 2 0 0
0 2 0 0
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0)
}();

