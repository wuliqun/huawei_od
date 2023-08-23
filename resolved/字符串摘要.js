/**
题目描述
给定一个字符串的摘要算法，请输出给定字符串的摘要值

去除字符串中非字母的符号。
如果出现连续字符(不区分大小写) ，则输出：该字符 (小写) + 连续出现的次数。
如果是非连续的字符(不区分大小写)，则输出：该字符(小写) + 该字母之后字符串中出现的该字符的次数
对按照以上方式表示后的字符串进行排序：字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前。
输入描述
一行字符串，长度为[1,200]

输出描述
摘要字符串

用例
输入	aabbcc
输出	a2b2c2
说明	无
输入	bAaAcBb
输出	a3b2b2c0
说明	
bAaAcBb:
第一个b非连续字母，该字母之后字符串中还出现了2次(最后的两个Bb) ，所以输出b2

a连续出现3次，输出a3，
c非连续，该字母之后字符串再没有出现过c，输出c0

Bb连续2次，输出b2

对b2a3c0b2进行排序，最终输出a3b2b2c0
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
 * countMap 事先记录所有字符出现的次数
 * 扫描具体字符时 countMap[letter]--  表示当前位置之后还有多少个该字符
 * @param {string} str
 */
function getResult(str){
    const res = [];
    const countMap = {};
    str = str.toLowerCase().replace(/[^a-z]/g,'');
    for(const s of str){
        countMap[s] = (countMap[s] || 0) + 1
    }
    let len = str.length,count;
    for(let i = 0;i < len;i++){
        countMap[str[i]]--;
        if(i === len - 1){
            res.push([str[i],0]);
        }else{
            if(str[i+1] === str[i]){
                count = 2;
                for(let j = i+2;j<len;j++){
                    if(str[j] === str[i]) count ++;
                    else break;
                }
                res.push([str[i],count]);
                i += count - 1;
            }else{
                res.push([str[i],countMap[str[i]]]);
            }
        }
    }

    return res.sort((a,b)=>{
        if(a[0] !== b[0]){
            return a[0] < b[0] ? -1 : 1;
        }else{
            return a[1] - b[1];
        }
    }).map((a)=>a.join('')).join('')
}
