/**
题目描述 
如果矩阵中的许多系数都为零，那么该矩阵就是稀疏的。对稀疏现象有兴趣是因为它的开发可以带来巨大的计算节省，并且在许多大的实践中都会出现矩阵稀疏的问题。

给定一个矩阵，现在需要逐行和逐列地扫描矩阵，如果某一行或者某一列内，存在连续出现的0的个数超过了行宽或者列宽的一半 [W /2] (整除) ，则认为该行或者该列是稀疏的。

扫描给定的矩阵，输出稀疏的行数和列数。

输入描述
第一行输入为M和N，表示矩阵的大小M*N，0 ＜ M ≤ 100，0 ＜ N ≤ 100

接下来M行输入为矩阵的成员，每行N个成员，矩阵成员都是有符号整数，范围-32,768到32,767

输出描述
输出两行，第一行表示稀疏行的个数，第二行表示稀疏列的个数

用例
输入	3 3
1 0 0
0 1 0
0 0 1
输出	
3
3

说明	给定的3*3矩阵里，每一行和每一列内都存在2个0，行宽3，列宽3，[3/2] = 1，因此稀疏行有3个，稀疏列有3个。
输入	5 3
-1 0 1
0 0 0
-1 0 0
0 -1 0
0 0 0
输出	
5

3

说明	给定的5*3矩阵，每行里面0的个数大于等于1表示稀疏行，每列里面0的个数大于等于2表示稀疏行，所以有5个稀疏行,3个稀疏列。

 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [],m,n;

rl.on('line', function (line) {
    lines.push(line);
    if(lines.length === 1){
        [m,n] = lines[0].split(' ').map(Number);
    }
    if(lines.length === m + 1){
        console.log(getResult(lines.slice(1).map(line=>line.split(' ').map(Number))));
        lines.length = 0;
    }
});


/**
 * @param {number[][]} matrix 
 */
function getResult(matrix){
    if(m === 0 || n === 0) return -1;
    const colsCount = new Array(m).fill(0);
    const rowCount = new Array(n).fill(0);
    for(let i = 0;i<m;i++){
        for(let j = 0;j<n;j++){
            if(matrix[i][j] === 0){
                colsCount[i] ++;
                rowCount[j] ++;
            }
        }
    }
    return colsCount.filter(c => c >= (n >> 1)).length + '\n' + rowCount.filter(c => c >= (m >> 1)).length
}

