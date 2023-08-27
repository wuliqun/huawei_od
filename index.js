
/**
题目描述
一个设备由N种类型元器件组成(每种类型元器件只需要一个，类型type编号从0~N-1)，

每个元器件均有可靠性属性reliability，可靠性越高的器件其价格price越贵。

而设备的可靠性由组成设备的所有器件中可靠性最低的器件决定。

给定预算S，购买N种元器件( 每种类型元器件都需要购买一个)，在不超过预算的情况下，请给出能够组成的设备的最大可靠性。

输入描述
S N // S总的预算，N元器件的种类

total // 元器件的总数，每种型号的元器件可以有多种;

此后有total行具体器件的数据

type reliability price // type 整数类型，代表元器件的类型编号从0 ~ N-1; reliabilty 整数类型 ，代表元器件的可靠性; price 整数类型 ，代表元器件的价格

输出描述
符合预算的设备的最大可靠性，如果预算无法买齐N种器件，则返回 -1

备注
0 <= S,price <= 10000000
0 <= N <= 100
0 <= type <= N-1
0 <= total <= 100000
0 < reliability <= 100000
用例
输入	500 3
6
0 80 100
0 90 200
1 50 50
1 70 210
2 50 100
2 60 150
输出	60
说明	
预算500，设备需要3种元件组成，方案

类型0的第一个(可靠性80),

类型1的第二个(可靠性70),

类型2的第二个(可靠性60),

可以使设备的可靠性最大 60

输入	100 1
1
0 90 200
输出	-1
说明	组成设备需要1个元件，但是元件价格大于预算，因此无法组成设备，返回-1
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




