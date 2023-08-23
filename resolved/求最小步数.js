/**
题目描述
求从坐标零点到坐标点n的最小步数，一次只能沿横坐标轴向左或向右移动 2 或 3。

注意：途径的坐标点可以为负数

输入描述
坐标点n

输出描述
输出从坐标零点移动到坐标点n的最小步数

备注
1 <= n <= 10^9

用例
输入	4
输出	2
说明	从坐标零点移动到4，最小需要两步，即右移2，再右移2
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];

rl.on('line', function (line) {
    console.log(getResult(Number(line)));
});


/**
 * f(n) = Math.min(f(n-2),f(n-3)) + 1
 * @param {*} num 
 */
function getResult(num){
    if(num < 0) num = -num;
    /** 坐标-3开始 */
    const nums = [1,1,2,0];
    for(let i = 1;i <= num;i++){
        nums[i+3] = Math.min(nums[i + 3 - 2],nums[i + 3 - 3]) + 1;
    }
    return nums[num + 3];
}