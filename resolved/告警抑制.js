/**
题目描述
告警抑制，是指高优先级告警抑制低优先级告警的规则。高优先级告警产生后，低优先级告警不再产生。请根据原始告警列表和告警抑制关系，给出实际产生的告警列表。

不会出现循环抑制的情况。
告警不会传递，比如A->B,B->C，这种情况下A不会直接抑制C。但被抑制的告警仍然可以抑制其他低优先级告警。
输入描述
第一行为数字N，表示告警抑制关系个数，0 ≤ N ≤ 120
接下来N行，每行是由空格分隔的两个告警ID，例如: id1 id2，表示id1抑制id2，告警ID的格式为：

大写字母+0个或者1个数字

最后一行为告警产生列表，列表长度[1,100]

输出描述
真实产生的告警列表

备注
告警ID之间以单个空格分隔

用例
输入	2
A B
B C
A B C D E
输出	A D E
说明	A抑制了B，B抑制了C，最后实际的告警为A D E
输入	4
F G
C B
A G
A0 A
A B C D E
输出	A C D E
说明	无
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    lines.push(line);
    if(lines.length - 2 === Number(lines[0])){
        console.log(getResult(lines.slice(1,-1),lines[lines.length - 1].split(' ')));
        lines.length = 0;
    }
});

/**
 * 
 * @param {*} restrainList string[]
 * @param {*} alertList string[]
 */
function getResult(restrainList,alertList){
    const muted = {};
    const alertSet = new Set(alertList);
    for(const restrain of restrainList){
        const [a,b] = restrain.split(' ');
        if(alertSet.has(a) && alertSet.has(b)){
            muted[b] = true;
        }
    }
    return alertList.filter((a)=>!muted[a]).join(' ');
}
