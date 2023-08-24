题目描述
输入一个单词前缀和一个字典，输出包含该前缀的单词

输入描述
单词前缀+字典长度+字典
字典是一个有序单词数组
输入输出都是小写

输出描述
所有包含该前缀的单词，多个单词换行输出

若没有则返回-1

用例
输入	b 3 a b c
输出	b
说明	无
输入	abc 4 a ab abc abcd
输出	
abc

abcd

说明	无
输入	a 3 b c d
输出	-1
说明	无
题目解析
这题200分的，但是感觉很简单，难道有坑？

我感觉这题就是考察字符串的基本操作，一个startsWith方法。

Java解法中，考虑大数量级，输入处理不使用next，nextInt获取，而是用nextLine整行获取。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const tmp = line.split(" ");
  const prefix = tmp[0];
  const n = parseInt(tmp[1]);
  const dict = tmp.slice(2, 2 + n);
 
  getResult(prefix, dict);
});
 
function getResult(prefix, dict) {
  let find = false;
 
  for (let word of dict) {
    if (word.startsWith(prefix)) {
      find = true;
      console.log(word);
    }
  }
 
  if (!find) console.log(-1);
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String[] tmp = sc.nextLine().split(" ");
 
    String prefix = tmp[0];
    int n = Integer.parseInt(tmp[1]);
    String[] dict = Arrays.copyOfRange(tmp, 2, 2 + n);
 
    getResult(prefix, dict);
  }
 
  public static void getResult(String prefix, String[] dict) {
    boolean find = false;
 
    for (String word : dict) {
      if (word.startsWith(prefix)) {
        find = true;
        System.out.println(word);
      }
    }
 
    if (!find) System.out.println(-1);
  }
}
```

py

```
# 输入获取
tmp = input().split()
prefix = tmp[0]
n = int(tmp[1])
words = tmp[2:2+n]
 
 
# 算法入口
def getResult():
    find = False
 
    for word in words:
        if word.startswith(prefix):
            find = True
            print(word)
 
    if not find:
        print(-1)
 
 
# 调用算法
getResult()
```

