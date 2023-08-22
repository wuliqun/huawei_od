题目描述
C 语言有一个库函数： char *strstr(const char *haystack, const char *needle) ，实现在字符串 haystack 中查找第一次出现字符串 needle 的位置，如果未找到则返回 null。

现要求实现一个strstr的增强函数，可以使用带可选段的字符串来模糊查询，与strstr一样返回首次查找到的字符串位置。

可选段使用“[]”标识，表示该位置是可选段中任意一个字符即可满足匹配条件。比如“a[bc]”表示可以匹配“ab”或“ac”。

注意目标字符串中可选段可能出现多次。

输入描述
与strstr函数一样，输入参数是两个字符串指针，分别是源字符串和目标字符串。

输出描述
与strstr函数不同，返回的是源字符串中，匹配子字符串相对于源字符串地址的偏移（从0开始算），如果没有匹配返回-1。

补充说明：源字符串中必定不包含‘[]’；目标字符串中‘[]’必定成对出现，且不会出现嵌套。

输入的字符串长度在[1,100]之间。

用例
输入	abcd
b[cd]
输出	1
说明	相当于是在源字符串中查找bc或者bd，bc子字符串相对于abcd的偏移是1
题目解析
本题最简单的解题策略是套皮正则表达式。

即将第二行输入的目标串直接当成正则表达式使用，因为其中[]的逻辑，刚好就是正则表达式“字符组”的功能。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 2) {
    console.log(getResult(lines[0], lines[1]));
    lines.length = 0;
  }
});
 
function getResult(src, tar) {
  const res = new RegExp(tar).exec(src);
 
  if (res.length > 0) {
    return src.indexOf(res[0]);
  } else {
    return -1;
  }
}
```

java

```
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String src = sc.nextLine();
    String tar = sc.nextLine();
 
    System.out.println(getResult(src, tar));
  }
 
  public static int getResult(String src, String tar) {
    Matcher matcher = Pattern.compile(tar).matcher(src);
 
    if (matcher.find()) {
      return src.indexOf(matcher.group());
    } else {
      return -1;
    }
  }
}
```

py

```
# 输入获取
import re
 
src = input()
tar = input()
 
 
# 核心代码
def getResult():
    res = re.search(tar, src)
 
    if res is None:
        return -1
    else:
        return res.start()
 
 
# 算法调用
print(getResult())
```

