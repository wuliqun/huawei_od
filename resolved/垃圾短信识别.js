
/**
题目描述
大众对垃圾短信深恶痛绝，希望能对垃圾短信发送者进行识别，为此，很多软件增加了垃圾短信的识别机制。
经分析，发现正常用户的短信通常具备交互性，而垃圾短信往往都是大量单向的短信，按照如下规则进行垃圾短信识别：

本题中，发送者A符合以下条件之一的，则认为A是垃圾短信发送者：

A发送短信的接收者中，没有发过短信给A的人数L > 5；
A发送的短信数 – A接收的短信数M > 10；
如果存在X，A发送给X的短信数 – A接收到X的短信数N > 5；
输入描述
第一行是条目数，接下来几行是具体的条目，每个条目，是一对ID，第一个数字是发送者ID，后面的数字是接收者ID，中间空格隔开，所有的ID都为无符号整型，ID最大值为100；

同一个条目中，两个ID不会相同（即不会自己给自己发消息）

最后一行为指定的ID

输出描述
输出该ID是否为垃圾短信发送者，并且按序列输出 L M 的值（由于 N 值不唯一，不需要输出）；
输出均为字符串。

用例

输入	15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
1
输出	true 13 13
说明	true 表示1是垃圾短信发送者，两个数字，代表发送者1对应的L和M值。
true 13 13中间以一个空格分割。注意true是字符串输出。
输入	15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
2
输出	false 0 -1
说明	无
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === Number(lines[0]) + 2){
    const id = Number(lines.at(-1));
    const arr = lines.slice(1, -1).map(l=>l.split(' ').map(Number));
    console.log(getResult(arr, id));
    lines.length = 0;
  }
});

/**
 * 
 * @param {number[][]} arr 
 * @param {number} id
 * @returns 
 */
function getResult(arr, id){
  let M = 0;
  let L = 0;
  let N = false;
  const map = {};
  for(const [sender, receiver] of arr){
    if(sender === id){
      map[receiver] = map[receiver] || [0, 0];
      map[receiver][0] ++;
      M ++;
    }else if(receiver === id){
      map[sender] = map[sender] || [0, 0];
      map[sender][1] ++;
      M --;
    }
  }
  for(const key in map){
    if(map[key][1] === 0) L++;
    if(!N && map[key][0] - map[key][1] > 5){
      N = true;
    }
  }

  return `${L > 5 || M > 10 || N} ${L} ${M}`;
}


const inputStr = `
15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
1
---------
15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
2
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

