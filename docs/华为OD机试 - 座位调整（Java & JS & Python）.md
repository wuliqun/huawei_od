题目描述
疫情期间课堂的座位进行了特殊的调整，不能出现两个同学紧挨着，必须隔至少一个空位。

给你一个整数数组 desk 表示当前座位的占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1 表示占位。

在不改变原有座位秩序情况下，还能安排坐几个人？

输入描述
第一行是个子数组表示作为占座情况，由若干 0 和 1 组成，其中 0 表示没有占位，1 表示占位

输出描述
输出数值表示还能坐几个人

备注
 1 ≤ desk.length ≤ 2 * 10^4

用例
输入	1,0,0,0,1
输出	1
说明	只有desk[2]的位置可以坐一个人
题目解析
我的解题思路如下：

将输入解析为一个整型数组desk，然后遍历每一个元素desk[i]：

如果 desk[i] == 0，则说明desk[i]是一个空位，此时只需要检查desk[i]的左右两边也是空位，则说明desk[i]可以坐人，此时将desk[i]更新为1，表示坐人了，而判断左右是否为空位的逻辑如下：
如果 i == 0 || desk[i-1] == 0，则说明desk[i]左边是空位，i == 0 说明其左边没有其他座位了，也相当于空位。
如果 i == desk.length - 1 || desk[i+1] == 0，则说明desk[i]右边也是空位，i == desk.length - 1说明其右边没有其他座位了，也就相当于空位
如果 desk[i] != 0，则说明desk[i]不是一个空位，坐不了人，且说明了下一个i+1座位也不能坐人
Java算法源码

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] desk = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    System.out.println(getResult(desk));
  }
 
  public static int getResult(int[] desk) {
    int ans = 0;
 
    for (int i = 0; i < desk.length; i++) {
      if (desk[i] == 0) {
        boolean isLeftEmpty = i == 0 || desk[i - 1] == 0;
        boolean isRightEmpty = i == desk.length - 1 || desk[i + 1] == 0;
        if (isLeftEmpty && isRightEmpty) {
          ans++;
          desk[i] = 1;
          i++;
        }
      }
    }
 
    return ans;
  }
}
```

js

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const desk = line.split(",").map(Number);
  console.log(getResult(desk));
});
 
function getResult(desk) {
  let ans = 0;
 
  for (let i = 0; i < desk.length; i++) {
    if (desk[i] == 0) {
      const isLeftEmpty = i == 0 || desk[i - 1] == 0;
      const isRightEmpty = i == desk.length - 1 || desk[i + 1] == 0;
 
      if (isLeftEmpty && isRightEmpty) {
        ans++;
        desk[i] = 1;
        i++;
      }
    }
  }
 
  return ans;
}
```

py

```
# 输入获取
desk = list(map(int, input().split(",")))
 
 
# 算法入口
def getResult():
    ans = 0
 
    i = 0
    while i < len(desk):
        if desk[i] == 0:
            isLeftEmpty = i == 0 or desk[i - 1] == 0
            isRightEmpty = i == len(desk) - 1 or desk[i + 1] == 0
 
            if isLeftEmpty and isRightEmpty:
                ans += 1
                desk[i] = 1
                i += 1
        i += 1
 
    return ans
 
 
# 算法调用
print(getResult())
```

