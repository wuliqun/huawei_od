
/**
题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0-N的箱子，每个箱子上面贴有一个数字。

阿里巴巴念出一个咒语数字，查看宝箱是否存在两个不同箱子，这两个箱子上贴的数字相同，同时这两个箱了的编号之差的绝对值小于等于咒语数字，
如果存在这样的一对宝箱，请返回最先找到的那对宝箱左边箱子的编号，如果不存在则返回-1.

输入描述
第一行输入一个数字字串，数字之间使用逗号分隔，例如: 1,2,3,1

1 ≤ 字串中数字个数 ≤ 100000
-100000 ≤ 每个数字值 ≤ 100000
第二行输入咒语数字，例如: 3

1 ≤ 咒语数字 ≤ 100000
输出描述
存在这样的一对宝箱，请返回最先找到的那对宝箱左边箱子的编号，如果不存在则返回-1

用例
输入	6,3,1,6
3
输出	1
说明	无
输入	5,6,7,5,6,7
2
输出	0
说明	无
题目解析
本题的用例似乎有问题。

用例1



编号0，和编号3的箱子数字相同，编号差的绝对值 = 3。符合<=咒语3 的要求，因此返回这对箱子左边的箱子编号0。

但是用例1输出的是1，难道箱子编号要从1开始？但是题目描述开头就说了

藏宝地有编号从0-N的箱子

用例2

编号0和编号3的箱子数字相同，编号差的绝对值 = 3

编号1和编号4的箱子数字相同，编号差的绝对值 = 3

编号2和编号5的箱子数字相同，编号差的绝对值 = 3

以上三对箱子没有编号差的绝对值 <= 咒语2的，因此本用例应该返回-1

但是用例2输出的是0

 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
    lines.push(line);
    if(lines.length === 2){
        const nums = lines[0].split(',').map(Number);
        const n = Number(lines[1]);
        console.log(getResult(nums,n));
        lines.length = 0;
    }
});

function getResult(nums,n) {
    const obj = {};
    nums.forEach((num,index)=>{
        if(!obj[num]){
            obj[num] = []
        }
        obj[num].push(index);
    });
    for(let i = 0;i<nums.length;i++){
        const  indexArr = obj[nums[i]];
        if(indexArr.length > 1){
            if(indexArr[1] - indexArr[0] <= n) return indexArr[0]
            else indexArr.shift();
        }
    }

    return -1;
}

