/**
题目描述
小牛的孩子生日快要到了，他打算给孩子买蛋糕和小礼物，蛋糕和小礼物各买一个，他的预算不超过x元。蛋糕cake和小礼物gift都有多种价位的可供选择。

请返回小牛共有多少种购买方案。

输入描述
第一行表示cake的单价，以逗号分隔

第二行表示gift的单价，以逗号分隔

第三行表示x预算

输出描述
输出数字表示购买方案的总数

备注
1 ≤ cake.length ≤ 10^5
1 ≤ gift.length ≤10^5
1 ≤ cake[i]，gift[i] ≤ 10^5
1 ≤ X ≤ 2*10^5
用例
输入	10,20,5
5,5,2
15
输出	6
说明	
解释: 小牛有6种购买方案，所选蛋糕与所选礼物在数组中对应的下标分别是：

第1种方案: cake [0] + gift [0] = 10 + 5 = 15;
第2种方案: cake [0] + gift [1]= 10 + 5 = 15;
第3种方案: cake [0] + gift [2] = 10 + 2 = 12;

第4种方案: cake [2] + gift [0] = 5 + 5 = 10;

第5种方案: cake [2] + gift [1]= 5 + 5 = 10;
第6种方案: cake [2] + gift [2] = 5 + 2 = 7。
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];

rl.on('line', function (line) {
    lines.push(line);
    if(lines.length === 3){
        console.log(getResult(lines));
        lines.length = 0;
    }
});


/**
 * @param {string[]} lines 
 */
function getResult(lines){
    const cakePrices = lines[0].split(',').map(Number);
    const giftPrices = lines[1].split(',').map(Number).sort((a,b)=>a-b);
    const budget = Number(lines[2]);
    let res = 0,spare;
    for(let i = 0;i<cakePrices.length;i++){
        spare = budget - cakePrices[i];
        if(spare > 0){
            console.log(spare,binaryFind(giftPrices,spare))
            res += binaryFind(giftPrices,spare) + 1;
        }
    }
    return res;
}
/**
 * 查找 <= num 的最大下标
 * @param {number[]} nums 
 * @param {number} num 
 */
function binaryFind(nums,num){
    let l = 0,r = nums.length - 1,mid;
    if(nums[l] > num) return -1;
    if(nums[r] <= num) return r;
    while(l < r){
        mid = (l + r) >> 1;
        if(nums[mid] > num){
            r = mid - 1;
        }else{
            if(l === mid) break;
            l = mid;
        }
    }
    return l;
}

// [2 5 5]  5
