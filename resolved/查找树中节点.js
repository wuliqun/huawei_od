
/**
题目描述

已知[树形结构](https://so.csdn.net/so/search?q=树形结构&spm=1001.2101.3001.7020)的所有节点信息，现要求根据输入坐标（x,y）找到该节点保存的内容值，其中x表示节点所在的层数，根节点位于第0层，根节点的子节点位于第1层，依次类推；y表示节点在该层内的相对偏移，从左至右，第一个节点偏移0，第二个节点偏移1，依次类推；

![image-20230409220204194](https://www.hualigs.cn/image/6432c561110e9.jpg)

举例：上图中，假定圆圈内的数字表示节点保存的内容值，则根据坐标(1,1)查到的内容值是23。 

输入描述
每个节点以一维数组（int[]）表示，所有节点信息构成二维数组（int[][]），二维数组的0位置存放根节点；
表示单节点的一维数组中，0位置保存内容值，后续位置保存子节点在二维数组中的索引位置。
对于上图中：

根节点的可以表示为{10，1，2}，
树的整体表示为{{10,1,2},{-21,3,4},{23,5},{14},{35},{66}}
查询条件以长度为2的一维数组表示，上图查询坐标为(1,1)时表示为{1,1}

使用Java标准IO键盘输入进行录入时，

先录入节点数量
然后逐行录入节点
最后录入查询的位置
对于上述示例为：

6
10 1 2
-21 3 4
23 5
14
35
66
1 1

输出描述
查询到内容时，输出{内容值}，查询不到时输出{}
上图中根据坐标(1,1)查询输出{23}，根据坐标(1,2)查询输出{}

用例

| 输入 | 6 10 1 2 -21 3 4 23 5 14 35 66 1 1 |
| ---- | ---------------------------------- |
| 输出 | {23}                               |
| 说明 | 无                                 |

2023.1.16新增用例说明，之前代码只是根据用例1写的，误以为题目中说的树是二叉树，因此代码存在问题，后面发现了原题更多的用例说明，意识到本题的树是多叉树，但是本题代码中多叉树的处理逻辑和二叉树相同，只需要微调代码即可

输入	14
0 1 2 3 4
-11 5 6 7 8
113 9 10 11
24 12
35
66 13
77
88
99
101
102
103
25
104
2 5
输出	{102}
说明	无
输入	14
0 1 2 3 4
-11 5 6 7 8
113 9 10 11
24 12
35
66 13
77
88
99
101
102
103
25
104
3 2
输出	{}
说明	无
输入	1
1000
0 0
输出	{1000}
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
  if(lines.length === Number(lines[0]) + 2){
    const n = Number(lines[0]);
    const nodes = lines.slice(1, -1).map(l=>l.split(' ').map(Number));
    const point = lines.at(-1).split(' ').map(Number);
    console.log(getResult(nodes, point, n));
    lines.length = 0;
  }
});


function getResult(nodes, point, n) {
  const [x, y] = point;
  let level = 0, stack = [nodes[0]], newStack;
  while(stack.length){
    if(level === x){
      return `{${stack[y]?.[0] || ''}}`;
    }
    newStack = [];
    for(const node of stack){
      for(let i = 1;i < node.length;i++){
        newStack.push(nodes[node[i]]);
      }
    }
    stack = newStack;
    level ++;
  }
  return '{}';
}


const inputStr = `
14
0 1 2 3 4
-11 5 6 7 8
113 9 10 11
24 12
35
66 13
77
88
99
101
102
103
25
104
2 5
------
14
0 1 2 3 4
-11 5 6 7 8
113 9 10 11
24 12
35
66 13
77
88
99
101
102
103
25
104
3 2
---------
1
1000
0 0
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

