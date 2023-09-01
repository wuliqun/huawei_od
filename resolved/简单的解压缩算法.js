
/**
题目描述
现需要实现一种算法，能将一组压缩字符串还原成原始字符串，还原规则如下：

1、字符后面加数字N，表示重复字符N次。例如：压缩内容为A3，表示原始字符串为AAA。
2、花括号中的字符串加数字N，表示花括号中的字符重复N次。例如压缩内容为{AB}3，表示原始字符串为ABABAB。
3、字符加N和花括号后面加N，支持任意的嵌套，包括互相嵌套，例如：压缩内容可以{A3B1{C}3}3

输入描述
输入一行压缩后的字符串

输出描述
输出压缩前的字符串

备注
输入保证，数字不会为0，花括号中的内容不会为空，保证输入的都是合法有效的压缩字符串
输入输出字符串区分大小写
输入的字符串长度范围为[1, 10000]
输出的字符串长度范围为[1, 100000]
数字N范围为[1, 10000]
用例

| 输入 | {A3B1{C}3}30                         
| ---- | ------------------------------------------------------------ |
| 输出 | AAABCCCAAABCCCAAABCCC                                        |
| 说明 | {A3B1{C}3}3代表A字符重复3次，B字符重复1次，花括号中的C字符重复3次，最外层花括号中的AAABCCC重复3次。 |
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  // lines.push(line);
  // if(lines.length === 2){
  //   const amount = Number(lines[0]);
  //   const nums = JSON.parse(lines[1]);
  //   console.log(getResult(nums, amount));
  //   lines.length = 0;
  // }
  console.log(getResult(line));
});


function getResult(str) {
  const stack = [];
  let i, j, k, repeat, repeatStr, s, n = str.length;
  for(i = 0;i < n;i++){
    s = str[i];
    if(/\d/.test(s)){
      j = i + 1;
      while(/\d/.test(str[j])){
        j ++;
      }
      repeat = Number(str.slice(i, j));
      if(stack.at(-1) === '}'){
        k = stack.length - 2;
        while(stack[k] !== '{'){
          k --;
        }
        repeatStr = stack.slice(k + 1, -1).join('');
        stack.length = k;
        stack.push(new Array(repeat).fill(repeatStr).join(''));
      }else{
        stack.push(new Array(repeat).fill(stack.pop()).join(''));
      }
      i = j - 1;
    }else{
      stack.push(s);
    }
  }

  return stack.join('');
}



const inputStr = `
{A3B1{C}3}3
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

