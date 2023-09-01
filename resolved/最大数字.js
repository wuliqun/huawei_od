
/**
题目描述
给定一个由纯数字组成以字符串表示的数值，现要求字符串中的每个数字最多只能出现2次，超过的需要进行删除；

删除某个重复的数字后，其它数字相对位置保持不变。

如”34533″，数字3重复超过2次，需要删除其中一个3，删除第一个3后获得最大数值”4533″

请返回经过删除操作后的最大的数值，以字符串表示。

输入描述
第一行为一个纯数字组成的字符串，长度范围：[1,100000]

输出描述
输出经过删除操作后的最大的数值

用例

| 输入 | 34533 |
| ---- | ----- |
| 输出 | 4533  |
| 说明 | 无    |

| 输入 | 5445795045 |
| ---- | ---------- |
| 输出 | 5479504    |
| 说明 | 无         |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  console.log(getResult(line));
});

function getResult(str) {
  // 连续超过两个数字  替换成2个数字
  str = str.replace(/(\d)\1+/g, s=>s.slice(0, 2));
  const count = {};
  let i, j,  s, n = str.length, res = [];
  // 扫描  碰到重复超过两个数字  就选合适的删一个
  for(i = 0;i < n;i++){
    s = str[i];
    count[s] = (count[s] || 0);
    res.push(s);
    if(count[s] === 2){
      for(j = 0;j < res.length;j++){
        if(res[j] === s && (j === res.length - 1 || res[j] < res[j + 1])){
          res.splice(j, 1);
          break;
        }
      }
    }else{
      count[s] ++;
    }
  }
  return res.join('');
}


const inputStr = `
34533
------
5445795045
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

