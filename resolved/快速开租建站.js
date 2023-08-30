
/**
题目描述
当前IT部门支撑了子公司颗粒化业务，该部门需要实现为子公司快速开租建站的能力，建站是指在一个全新的环境部署一套IT服务。

每个站点开站会由一系列部署任务项构成，每个任务项部署完成时间都是固定和相等的，设为1。
部署任务项之间可能存在依赖，假如任务2依赖任务1，那么等任务1部署完，任务2才能部署。
任务有多个依赖任务则需要等所有依赖任务都部署完该任务才能部署。
没有依赖的任务可以并行部署，优秀的员工们会做到完全并行无等待的部署。
给定一个站点部署任务项和它们之间的依赖关系，请给出一个站点的最短开站时间。

输入描述
第一行是任务数taskNum,第二行是任务的依赖关系数relationsNum

接下来 relationsNum 行，每行包含两个id，描述一个依赖关系，格式为：IDi IDj，表示部署任务i部署完成了，部署任务j才能部署，IDi 和 IDj 值的范围为：[0, taskNum)

注：输入保证部署任务之间的依赖不会存在环。

输出描述
一个整数，表示一个站点的最短开站时间。

备注
1 ＜ taskNum ≤ 100
1 ≤ relationsNum ≤ 5000
用例

| 输入 | 
5
5
0 4
1 2
1 3
2 3
2 4      |
| ---- | ---------------------------- |
| 输出 | 3                            |
| 说明 | 有5个部署任务项，5个依赖关系 |
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
    const taskNum = Number(lines[0]);
    const n = Number(lines[1]);
    const relations = lines.slice(2).map(l=>l.split(' ').map(Number));
    console.log(getResult(relations, n, taskNum));
    lines.length = 0;
  }
});

function getResult(relations, n, taskNum){
  // arr[i]  表示i的依赖
  const arr = new Array(taskNum).fill(0).map(()=>new Set());
  let day = 0;
  for(const [i, j] of relations){
    arr[j].add(i);
  }
  const curFinish = new Set();
  while(true){
    curFinish.clear();
    for(let i = 0;i < n;i++){
      if(arr[i] && !arr[i].size){
        curFinish.add(i);
        arr[i] = null;
      }
    }
    if(curFinish.size){
      day ++;
      for(let i = 0;i < n;i++){
        if(arr[i]){
          for(const j of arr[i]){
            if(curFinish.has(j)){
              arr[i].delete(j);
            }
          }
        }
      }
    }else{
      break;
    }    
  }
  return day;
}

const inputStr = `
5
5
0 4
1 2
1 3
2 3
2 4
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

