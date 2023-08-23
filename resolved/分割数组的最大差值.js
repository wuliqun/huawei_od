/**
题目描述 
给定一个由若干整数组成的数组nums ，可以在数组内的任意位置进行分割，将该数组分割成两个非空子数组（即左数组和右数组），分别对子数组求和得到两个值，计算这两个值的差值，请输出所有分割方案中，差值最大的值。

输入描述
第一行输入数组中元素个数n，1 < n ≤ 100000
第二行输入数字序列，以空格进行分隔，数字取值为4字节整数

输出描述
输出差值的最大取值

用例
输入	6
1 -2 3 4 -9 7
输出	10
说明	
将数组 nums 划分为两个非空数组的可行方案有:

左数组 = [1] 且 右数组 = [-2,3,4,-9,7]，和的差值 = | 1 - 3 | = 2
左数组 = [1,-2] 且 右数组 = [3,4,-9,7]，和的差值 = | -1 - 5 | =6
左数组 = [1,-2,3] 且 右数组 = [4,-9,7]，和的差值 = | 2 - 2 | = 0
左数组 = [1,-2,3,4] 且右数组=[-9,7]，和的差值 = | 6 - (-2) | = 8，
左数组 = [1,-2,3,4,-9] 且 右数组 = [7]，和的差值 = | -3 - 7| = 10最大的差值为10

 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    lines.push(line);
    if(lines.length === 2){
        console.log(getResult(lines[1].split(' ').map(Number)));
        lines.length = 0;
    }
});

/**
 * 
 * @param {*} nums number[]
 */
function getResult(nums){
    let leftSum = 0;
    let rightSum = nums.reduce((a,b)=>a+b);
    let maxDiff = -1;
    for(let i = 0;i < nums.length - 1;i++){
        leftSum += nums[i];
        rightSum -= nums[i];
        maxDiff = Math.max(maxDiff,Math.abs(rightSum - leftSum));
    }

    return maxDiff;
}
