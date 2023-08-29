
/**
题目描述
去除文本多余空格，但不去除配对单引号之间的多余空格。给出关键词的起始和结束下标，去除多余空格后刷新关键词的起始和结束下标。

条件约束：
1，不考虑关键词起始和结束位置为空格的场景；
2，单词的的开始和结束下标保证涵盖一个完整的单词，即一个坐标对开始和结束下标之间不会有多余的空格；
3，如果有单引号，则用例保证单引号成对出现；
4，关键词可能会重复；
5，文本字符长度length取值范围：[0, 100000];

输入描述
输入为两行字符串：

第一行：待去除多余空格的文本，用例保证如果有单引号，则单引号成对出现，且单引号可能有多对。

第二行：关键词的开始和结束坐标，关键词间以逗号区分，关键词内的开始和结束位置以单空格区分。

输出描述
输出为两行字符串：

第一行：去除多余空格后的文本
第二行：去除多余空格后的关键词的坐标开始和结束位置，为数组方式输出。

用例

输入	Life is painting a  picture, not doing 'a  sum'.
8 15,20 26,43 45
输出	Life is painting a picture, not doing 'a  sum'.
[8, 15][19, 25][42, 44]
说明	
a和picture中间多余的空格进行删除

输入	Life is painting a picture, not doin 'a  sum'.
8 15,19 25,42 44
输出	
Life is painting a picture, not doing 'a  sum'.
[8, 15][19, 25][42, 44]

说明	a和sum之间有多余的空格，但是因为有成对单引号，不去除多余空格
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
    const keywords = lines[1].split(',').map(s=>s.split(' ').map(Number));
    console.log(getResult(lines[0], keywords));
    lines.length = 0;
  }
});


function getResult(str, keywords){
  let deleteCount = 0, flag = false, keyIndex = 0, res = [];
  for(let i = 0;i < str.length;i++){
    switch(str[i]){
    case ' ':
      if(i !== 0 && str[i - 1] === ' ' && !flag) {
        deleteCount ++;        
      }else{
        res.push(str[i]);
      }
      break;
    case "'":
      flag = !flag;
    default:
      res.push(str[i]);
      break;
    }
    if(keyIndex < keywords.length){
      if(keywords[keyIndex][0] === i){
        keywords[keyIndex][0] -= deleteCount;
      }else if(keywords[keyIndex][1] === i){
        keywords[keyIndex][1] -= deleteCount;
        keyIndex ++;
      }
    }
  }
  return res.join('') + '\n' + keywords.map(k=>JSON.stringify(k)).join('');
}

function getCount(points, start, end, startIndex, n){
  let max = start, i;
  for(i = startIndex;i < n;i++){
    if(points[i][0] <= start){
      if(points[i][1] > max){
        max = points[i][1];
      }
    }else{
      break;
    }
  }
  if(max >= end) return 1;
  else{
    return 1 + getCount(points, max + 1, end, i, n);
  }
}


const inputStr = `
Life is painting a  picture, not doing 'a  sum'.
8 15,20 26,43 45
------
Life is painting a   picture, not   doin   'a  sum'.
8 15,19 25,42 44
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

