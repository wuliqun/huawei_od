/**
题目描述
疫情期间课堂的座位进行了特殊的调整，不能出现两个同学紧挨着，必须隔至少一个空位。

给你一个整数数组 desk 表示当前座位的占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1 表示占位。

在不改变原有座位秩序情况下，还能安排坐几个人？

输入描述
第一行是个子数组表示作为占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1 表示占位

输出描述
输出数值表示还能坐几个人

备注
 1 ≤ desk.length ≤ 2 * 10^4

用例
输入	1 0 0 0 1
输出	1
说明	只有desk[2]的位置可以坐一个人
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    console.log(getResult(line.split(' ').map(Number)))
});

/**
 * @param {number[]} nums
 */
function getResult(nums){
    let res = 0;
    let count = 0;
    for(let i = 0;i<nums.length;i++){
        if(nums[i] === 0){
            count ++;
        }else{
            res += count >> 1;
            count = 0;
            i ++;
        }
    }
    res += (count + 1) >> 1;
    return res;
}
