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

| 输入 | {A3B1{C}3}3                                                  |
| ---- | ------------------------------------------------------------ |
| 输出 | AAABCCCAAABCCCAAABCCC                                        |
| 说明 | {A3B1{C}3}3代表A字符重复3次，B字符重复1次，花括号中的C字符重复3次，最外层花括号中的AAABCCC重复3次。 |

### 题目解析

我的解题思路是，从左到右遍历输入字符串的每一个字符：

若发现非数字的字符，则直接压入栈stack中；

另外，发现字符“{”时，需要记录它在stack栈中位置到idxs数组中；

若发现数字字符c，则我们需要观察此时stack栈顶元素：

如果栈顶不是 ”}“ 字符，则取出栈顶元素，重复c次后，重新压入栈中。
如果栈顶是 ”}“ 字符，则弹出，并取出idxs中记录的最后一次的 ”{“ 压stack栈的位置idx，然后通过splice操作，将stack栈中idx往后的元素都删除取出为frag，然后重复frag片段c次，后重新压入stack栈中。
按照此逻辑，即可完成本题要求的解压缩。

但是，本题有两个疑点：

是否存在异常情况？由于本题没说如何处理异常，因此我这里默认无异常情况，即输入都是合法的。
数字N会不会出现多位数，比如A13这种情况，如果允许多位数字，则本题会变得更加复杂，由于用例和题目描述中都没有特别说明这种情况，因此我们默认这里的数字不会有多位数。
2023.01.29

本题新增了备注说明，因此上面两个疑点得到了解答。

1、备注说明：保证输入的都是合法有效的压缩字符串

2、数字N范围为[1, 10000]

JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  console.log(getResult(line));
});
 
function getResult(str) {
  const stack = [];
  const idxs = [];
  const repeat = [];
 
  str += " ";
 
  for (let c of str) {
    if (/\d/.test(c)) {
      repeat.push(c);
      continue;
    }
 
    // 如果出现A13,或者{ABC}99这种情况，我们需要把多位数解析出来
    if (repeat.length > 0) {
      const n = parseInt(repeat.join(""));
      repeat.length = 0;
      const top = stack.pop();
      if (top === "}") {
        const frag = stack.splice(idxs.pop()).slice(1).join("");
        stack.push(...new Array(n).fill(frag).join(""));
      } else {
        stack.push(...new Array(n).fill(top));
      }
    }
 
    if (c === "{") {
      idxs.push(stack.length);
    }
 
    stack.push(c);
  }
 
  return stack.join("").trim();
}
```

### Java算法源码

Java这里最好使用LinkedList模拟栈，但是LinkedList模拟的栈是严格栈，即只能每次弹出栈顶元素，不能一下将某个范围元素全部删除，因此在取出栈中 { 和 } 中间内容时，比JS略显复杂，但是处理逻辑相同。 

```
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String str = sc.next();
    System.out.println(getResult(str));
  }
 
  public static String getResult(String str) {
    LinkedList<String> stack = new LinkedList<>();
    // idxs记录 { 出现的索引位置
    LinkedList<Integer> idxs = new LinkedList<>();
    StringBuilder repeat = new StringBuilder();
    str += " ";
 
    for (int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);
      if (c >= '0' && c <= '9') { // 如果压栈遇到数字
        // 如果出现A13,或者{ABC}99这种情况，我们需要把多位数解析出来
        repeat.append(c);
        continue;
      }
 
      if (repeat.length() > 0) {
        int n = Integer.parseInt(repeat.toString());
        repeat = new StringBuilder();
        if ("}".equals(stack.getLast())) { // 如果此时栈顶是 } , 则需要将{,} 中间的内容整体重复repeat次
          int left = idxs.removeLast();
          stack.remove(left); // 去掉 {
          stack.removeLast(); // 去掉 }
          updateStack(stack, left, n); // 将 {,} 中间部分重复 repeat次后重新压栈
        } else { // 如果此时栈顶不是 }，则只需要将栈顶元素重复repeat次即可。
          updateStack(stack, stack.size() - 1, n);
        }
      }
 
      // 记录 { 出现的索引位置
      if (c == '{') {
        idxs.addLast(stack.size());
      }
 
      // 数字外的字符都压入栈中，其中{,}需要再重复操作时删除
      stack.addLast(c + "");
    }
 
    StringBuilder sb = new StringBuilder();
    for (String c : stack) {
      sb.append(c);
    }
    return sb.toString().trim();
  }
 
  // 将stack，从left索引开始到最后的内容，弹栈，并整体重复repeat次后，再重新压入栈
  public static void updateStack(LinkedList<String> stack, int left, int repeat) {
    int count = stack.size() - left;
 
    // frag用于存储弹栈数据
    String[] frag = new String[count];
 
    while (count-- > 0) {
      frag[count] = stack.removeLast();
    }
 
    // 由于重复的是弹栈内容的整体，而不是每个，因此需要将弹栈内容合并
    StringBuilder sb = new StringBuilder();
    for (String s : frag) {
      sb.append(s);
    }
 
    // 将弹栈内容合并后重复repeat次，再重新压入栈中
    String fragment = sb.toString();
    StringBuilder ans = new StringBuilder();
 
    for (int i = 0; i < repeat; i++) {
      ans.append(fragment);
    }
 
    stack.addLast(ans.toString());
  }
}
```

### Python算法源码

```
# 输入获取
s = input()
 
 
# 算法入口
def getResult(s):
    stack = []
    idxs = []
    repeat = []
    
    s = s + " "
 
    for c in s:
        if c.isdigit():
            repeat.append(c)
            continue
        
        if len(repeat) > 0:
            n = int("".join(repeat))
            repeat = []
            top = stack.pop()
            if top == "}":
                start = idxs.pop()
                frag = "".join(stack[start+1:])
                stack = stack[:start]
                stack.extend([frag] * int(n))
            else:
                stack.extend([top]*int(n))
 
        if c == "{":
            idxs.append(len(stack))
 
        stack.append(c)
 
    return "".join(stack).strip()
 
 
# 算法调用
print(getResult(s))
```

