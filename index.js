/**
题目描述
某公司为了更高效的编写代码，邀请你开发一款代码编辑器程序。

程序的输入为 已有的代码文本和指令序列，程序需输出编辑后的最终文本。指针初始位置位于文本的开头。
支持的指令(X为大于等于0的整数, word 为无空格的字符串)：

FORWARD X 指针向前(右)移动X,如果指针移动位置超过了文本末尾，则将指针移动到文本末尾
BACKWARD X 指针向后(左)移动X,如果指针移动位置超过了文本开头，则将指针移动到文本开头
SEARCH-FORWARD word 从指针当前位置向前查找 word 并将指针移动到word的起始位置，如果未找到则保持不变
SEARCH-BACKWARD word 在文本中向后查我 word 并将指针移动到word的起始位置，如果未找到则保持不变
INSERT word 在指针当前位置前插入word，并将指针移动到word的结尾
REPLACE word 在指针当前位置替换并插入字符(删除原有字符，并增加新的字符)
DELETE X 在指针位置删除X个字符
输入描述
输入的第一行为命令列表的长度K

输入的第二行为文件中的原始文本

接下来的K行，每行为一个指令

输出描述
编辑后的最终结果

备注
文本最长长度不超过 256K

用例
输入	1
ello
INSERT h
输出	hello
说明	在文本开头插入
输入	2
hllo
FORWARD 1
INSERT e
输出	hello
说明	在文本的第一个位置插入
输入	2
hell
FORWARD 1000
INSERT o
输出	hello
说明	在文本的结尾插入
输入	1
hello
REPLACE HELLO
输出	HELLO
说明	替换
输入	1
hello
REPLACE HELLO_WORLD
输出	HELLO_WORLD
说明	超过文本长度替换
输入	2
hell
FORWARD 10000
REPLACE O
输出	hellO
说明	超出文本长度替换

 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    
});


function getResult(nums,cur){
  
}
