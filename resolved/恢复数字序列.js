/**
题目描述
对于一个连续正整数组成的序列，可以将其拼接成一个字符串，再将字符串里的部分字符打乱顺序。如序列8 9 10 11 12，拼接成的字符串为89101112，打乱一部分字符后得到90811211，原来的正整数10就被拆成了0和1。

现给定一个按如上规则得到的打乱字符的字符串，请将其还原成连续正整数序列，并输出序列中最小的数字。

输入描述
输入一行，为打乱字符的字符串和正整数序列的长度，两者间用空格分隔，字符串长度不超过200，正整数不超过1000，保证输入可以还原成唯一序列。

输出描述
输出一个数字，为序列中最小的数字。

用例
输入	19801211 5
输出	8
说明	无
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    console.log(getResult(line))
});

/**
 * 滑动窗口法
 * @param {string} str
 */
function getResult(str){
    const [numStr,countStr] = str.split(' ');
    const count = Number(countStr);
    const digitCount = new Array(10).fill(0);
    const windowDigitCount = new Array(10).fill(0);
    // 目标字符串各数字数量
    for(const s of numStr){
        digitCount[Number(s)] ++;
    }
    const digitCountStr = digitCount.join(','); // 用字符串, 方便比较

    let start = 1,end = count;
    new Array(end-start+1).fill(0).map((_,index)=>index + start).join('').split('').map(s=>{
        windowDigitCount[Number(s)] ++;
    });

    while(end <= 1000){
        if(windowDigitCount.join(',')=== digitCountStr) break;
        String(start).split('').map(s=>{
            windowDigitCount[Number(s)] --;
        });
        start ++;
        end ++;
        String(end).split('').map(s=>{
            windowDigitCount[Number(s)] ++;
        });
    }

    return start;
}


