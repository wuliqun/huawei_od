
/**
题目描述
请按下列描述构建一颗二叉树，并返回该树的根节点：

1、先创建值为-1的根结点，根节点在第0层;

2、然后根据operations依次添加节点： operations[i] = [height, index] 表示对第 height 层的第index 个节点node， 添加值为 i 的子节点：

若node 无「左子节点」，则添加左子节点;
若node 有「左子节点」，但无「右子节点」，则添加右子节点；
否则不作任何处理。
height、index 均从0开始计数；

index 指所在层的创建顺序。

注意：

输入用例保证每次操作对应的节点已存在；
控制台输出的内容是根据返回的树根节点，按照层序遍历二叉树打印的结果。
输入描述
operations

输出描述
根据返回的树根节点，按照层序遍历二叉树打印的结果

备注
1 <= operations.length <= 100
operations[i].length == 2
0 <= operations[i][0] < 100
0 <= operations[i][1] < 100
用例

输入	[[0, 0], [0, 0], [1, 1], [1, 0], [0, 0]]
输出	[-1, 0, 1, 3, null, 2]
说明	
首个值是根节点的值，也是返回值；

null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点

输入	[[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 1], [2, 0], [3, 1], [2, 0]]
输出	[-1, 0, null, 1, 2, 6, 8, 3, 4, null, null, null, null, null, null, 7]
说明	
首个值是根节点的值，也是返回值；

null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  const operations = JSON.parse(line);
  console.log(getResult(operations));
});

class Node {
  constructor(num){
    this.value = num;
    this.left = null;
    this.right = null;
  }
}

function getResult(operations) {
  const root = new Node(-1);
  let stack = [[root]];
  for(let i = 0;i < operations.length;i++){
    const [height, index] = operations[i];
    const node = stack[height][index];
    stack[height + 1] = stack[height + 1] || [];
    if(!node.left){
      stack[height + 1].push((node.left = new Node(i)));
    }else if(!node.right){
      stack[height + 1].push((node.right = new Node(i)));
    }
  }
  const res = [];
  stack =  [root];
  while(stack.length){
    const node = stack.shift();
    if(node){
      stack.push(node.left, node.right);
      res.push(node.value);
    }else{
      res.push(null);
    }
  }
  while(res.at(-1) === null){
    res.length --;
  }
  return JSON.stringify(res);
}



const inputStr = `
[[0, 0], [0, 0], [1, 1], [1, 0], [0, 0]]
[[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 1], [2, 0], [3, 1], [2, 0]]
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

