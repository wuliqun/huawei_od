
/**
题目描述
给定两个字符串string1和string2。
string1是一个被加扰的字符串。

string1由小写英文字母（’a’~’z’）和数字字符（’0’~’9’）组成，而加扰字符串由’0’~’9’、’a’~’f’组成。

string1里面可能包含0个或多个加扰子串，剩下可能有0个或多个有效子串，这些有效子串被加扰子串隔开。

string2是一个参考字符串，仅由小写英文字母（’a’~’z’）组成。

你需要在string1字符串里找到一个有效子串，这个有效子串要同时满足下面两个条件：

（1）这个有效子串里不同字母的数量不超过且最接近于string2里不同字母的数量，即小于或等于string2里不同字母的数量的同时且最大。

（2）这个有效子串是满足条件（1）里的所有子串（如果有多个的话）里字典序最大的一个。

如果没有找到合适条件的子串的话，请输出”Not Found”

输入描述
input_string1
input_string2

输出描述
output_string

用例

输入	123admyffc79pt
ssyy
输出	pt
说明	
将输入字符串1里的加扰子串“123ad”、“ffc79”去除后得到有效子串序列："my"、"pt"，其中"my"里不同字母的数量为2（有‘m’和'y'两个不同字母），“pt”里不同字母的数量为2（有'p'和't'两个不同字母）；输入字符串2里不同字母的数量为2（有‘s’和'y'两个不同字母）。

可得到最终输出结果为“pt”，其不同字母的数量最接近与“ssyy”里不同字母的数量的同时字典序最大。

输入	123admyffc79ptaagghi2222smeersst88mnrt
ssyyfgh
输出	mnrt
说明	将输入字符串1里的加扰子串“123ad”、“ffc79”、"aa"、"2222"、"ee"、"88"去除后得到有效子串序列：“my”、“pt”、“gghi”、"sm"、“rsst”、"mnrt"；输入字符串2里不同字母的数量为5（有's'、'y'、'f'、'g'、'h'5个不同字母）。可得到最终输出结果为“mnrt”，其不同字母的数量（为4）最接近于“ssyyfgh”里不同字母的数量，其他有效子串不同字母的数量都小于“mnrt”。
输入	
abcmnq
rt

输出	Not Found
说明	将输入字符串1里的加扰子串“abc”去除后得到有效子串序列：“mnq”；输入字符串2里不同字母的数量为2（有'r'、't'两个不同的字母）。可得到最终的输出结果为“Not Found”，没有符合要求的有效子串，因有效子串里的不同字母的数量（为3），大于输入字符串2里的不同字母的数量。
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
    console.log(getResult(lines[0], lines[1]));
    lines.length = 0;
  }
});

function getResult(str1, str2){
  let cache = {};
  let count = 0;
  for(const s of str2){
    if(!cache[s]){
      count ++;
      cache[s] = true;
    }
  }
  const strs = str1.split(/[a-f0-9]+/).map(str=>{
    let c = 0;
    cache = {};
    for(const s of str){
      if(!cache[s]){
        c ++;
        cache[s] = true;
      }
    }
    return [str, c];
  }).filter(([_, len])=>{
    return len !== 0 && len <= count;
  }).sort(([str1, len1], [str2, len2])=>{
    if(len1 !== len2){
      return len2 - len1;
    }else{
      return str1 < str2 ? 1 : -1;
    }
  });
  return strs.length ? strs[0][0] : 'Not Found';
}

const inputStr = `
123admyffc79pt
ssyy
-------
123admyffc79ptaagghi2222smeersst88mnrt
ssyyfgh
---------
abcmnq
rt
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

