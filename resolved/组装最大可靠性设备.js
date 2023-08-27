
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
  if(lines.length === Number(lines[1]) + 2){
    const [budget, n] = lines[0].split(' ').map(Number);
    const units = new Array(n).fill(0).map(()=>[]);
    lines.slice(2).map((line)=>{
      const [type, reliability, price] = line.split(' ').map(Number);
      units[type].push([reliability, price]);
    });
    units.forEach(u=>u.sort((a, b)=>a[0] - b[0]));
    console.log(getResult(budget, n, units));
    lines.length = 0;
  }
});


function getResult(budget, n, units){  
  let choices = [], sum = 0, minReliability = 100;
  for(let i = 0;i < n;i++){
    const [reliability, price] = units[i][0];
    choices.push({
      unitIndex: 0,
      reliability,
      price,
    });
    sum += price;
    if(reliability < minReliability){
      minReliability = reliability;
    }
  }
  if(sum > budget) return -1;
  let curReliability = 100;
  ww:while(sum <= budget){
    for(let i = 0;i < n;i++){
      const {
        unitIndex, reliability, price, 
      } = choices[i];
      if(reliability === minReliability){
        if(unitIndex === units[i].length - 1) break ww;
        else{
          const newUnit = units[i][unitIndex + 1];
          choices[i] = {
            unitIndex: unitIndex + 1,
            reliability: newUnit[0],
            price: newUnit[1],
          }
          sum = sum - price + newUnit[1];
          if(newUnit[0] < curReliability){
            curReliability = newUnit[0]
          }
        }
      }else{
        if(reliability < curReliability){
          curReliability = reliability;
        }
      }
    }
    if(sum <= budget) {
      minReliability = curReliability;
    }
  }

  return minReliability;
}



// test
const inputStr = `
500 3
6
0 80 100
0 90 200
1 50 50
1 70 210
2 50 100
2 60 150
---------
100 1
1
0 90 200
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0)
}()

