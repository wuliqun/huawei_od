/**
题目描述
一个文件目录的数据格式为：目录id，本目录中文件大小，(子目录id列表）。

其中目录id全局唯一，取值范围[1, 200]，本目录中文件大小范围[1, 1000]，子目录id列表个数[0,10]例如 : 1 20 (2,3) 表示目录1中文件总大小是20，有两个子目录，id分别是2和3

现在输入一个文件系统中所有目录信息，以及待查询的目录 id ，返回这个目录和及该目录所有子目录的大小之和。

输入描述
第一行为两个数字M，N，分别表示目录的个数和待查询的目录id,

1 ≤ M ≤ 100
1 ≤ N ≤ 200
接下来M行，每行为1个目录的数据：

目录id 本目录中文件大小 (子目录id列表)

子目录列表中的子目录id以逗号分隔。

输出描述
 待查询目录及其子目录的大小之和

用例
输入	3 1
3 15 ()
1 20 (2)
2 10 (3)
输出	45
说明	目录1大小为20，包含一个子目录2 (大小为10)，子目录2包含一个子目录3(大小为15)，总的大小为20+10+15=45
输入	4 2
4 20 ()
5 30 ()
2 10 (4,5)
1 40 ()
输出	60
说明	目录2包含2个子目录4和5，总的大小为10+20+30 = 60
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
let len,id;
rl.on('line', function (line) {
    lines.push(line);
    if(lines.length === 1){
        [len, id] = line.split(' ').map(Number);
    }
    if(len === lines.length - 1){
        console.log(getResult(lines.slice(1),id));
        lines.length = 0;
    }
});

function getResult(lines,id){
    let res = 0;
    let map = {};
    for(const line of lines){
        const [id,size,subIds] = line.split(' ').map((str,index)=>{
            if(index < 2) return Number(str);
            else return str.length > 2 ? str.slice(1,-1).split(',').map(Number) : [];
        });

        map[id] = {size,subIds};
    }
    let stack = [id];
    while(stack.length){
        id = stack.pop();
        res += map[id].size;
        stack.push(...map[id].subIds);
    }

    return res;
}

