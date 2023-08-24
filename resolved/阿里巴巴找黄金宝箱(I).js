/**
题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字，箱子中可能有一个黄金宝箱。

黄金宝箱满足排在它之前的所有箱子数字和等于排在它之后的所有箱子数字之和；

第一个箱子左边部分的数字和定义为0；最后一个箱子右边部分的数字和定义为0.

请帮阿里巴巴找到黄金宝箱，输出第一个满足条件的黄金宝箱编号，如果不存在黄金宝箱，请返回-1。

输入描述
箱子上贴的数字列表，使用逗号分隔，例如1，-1，0
宝箱的数量不小于1个，不超过10000
宝箱上贴的数值范围不低于-1000，不超过1000

输出描述
第一个黄金宝箱的编号

用例
输入	2,5,-1,8,6
输出	3
说明	
下标3之前的数字和为：2 + 5 + -1 = 6

下标3之后的数字和为：6 = 6

输入	8,9
输出	-1
说明	不存在符合要求的位置
输入	11
输出	0
说明	
下标0之前的数字和为：0

下标0之后的数字和为：0

 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
    const nums = line.split(' ').map(Number);
    console.log(getResult(nums));
});

function getResult(nums) {
    let lSum = 0,rSum = nums.slice(1).reduce((a,b)=>a+b,0),index = 0;

    while(index < nums.length){
        if(lSum === rSum) return index;
        lSum += nums[index];
        index ++;
        rSum -= nums[index];
    }
    return -1;
}
