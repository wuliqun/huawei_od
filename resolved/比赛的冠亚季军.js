/**
题目描述 
有N（3 ≤ N < 10000）个运动员，他们的id为0到N-1,他们的实力由一组整数表示。他们之间进行比赛，需要决出冠亚军。比赛的规则是0号和1号比赛，2号和3号比赛，以此类推，每一轮，相邻的运动员进行比赛，获胜的进入下一轮；实力值大的获胜，实力值相等的情况，id小的情况下获胜；轮空的直接进入下一轮。

输入描述
输入一行N个数字代表N的运动员的实力值(0<=实力值<=10000000000)。

输出描述
输出冠亚季军的id，用空格隔开。

用例
输入	2 3 4 5
输出	3 1 2
说明	
第一轮比赛，

id为0实力值为2的运动员和id为1实力值为3的运动员比赛，1号胜出进入下一轮争夺冠亚军，

id为2的运动员和id为3的运动员比赛，3号胜出进入下一轮争夺冠亚军，

冠亚军比赛，3号胜1号，

故冠军为3号，亚军为1号，2号与0号，比赛进行季军的争夺，2号实力值为4，0号实力值2，故2号胜出，得季军。冠亚季军为3 1 2。
 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];

rl.on('line', function (line) {
    console.log(getResult(line));
});

function getResult(line){
    let athletes = line.split(' ').map((s,index)=>({
        id:index,
        power:Number(s)
    }));
    let tmp = [],res = [];
    while(athletes.length >= 5){
        for(let i = 0;i<athletes.length;i+=2){
            if(i === athletes.length - 1){
                tmp.push(athletes[i]);
            }else{
                if(athletes[i].power >= athletes[i+1].power){
                    tmp.push(athletes[i]);
                }else{
                    tmp.push(athletes[i+1]);
                }
            }
        }
        athletes = tmp;
        tmp = [];
    }
    if(athletes[0].power < athletes[1].power){
        tmp = [athletes[1],athletes[0]];
    }else {
        tmp = athletes.slice(0,2);
    }
    if(athletes.length === 4 && athletes[2].power < athletes[3].power){
        tmp = tmp.concat([athletes[3],athletes[2]])
    }else{
        tmp = tmp.concat(athletes.slice(2));
    }

    if(tmp[0].power < tmp[2].power){
        res[0] = tmp[2].id;
        res[1] = tmp[0].id;
    }else{
        res[0] = tmp[0].id;
        res[1] = tmp[2].id;
    }
    if(tmp.length === 4 && tmp[1].power < tmp[3].power){
        res[2] = tmp[3].id;
    }else{
        res[2] = tmp[1].id;
    }
    return res.join(' ');
}