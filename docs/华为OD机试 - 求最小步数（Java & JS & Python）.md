题目描述
求从坐标零点到坐标点n的最小步数，一次只能沿横坐标轴向左或向右移动 2 或 3。

注意：途径的坐标点可以为负数

输入描述
坐标点n

输出描述
输出从坐标零点移动到坐标点n的最小步数

备注
1 <= n <= 10^9

用例
输入	4
输出	2
说明	从坐标零点移动到4，最小需要两步，即右移2，再右移2
题目解析
本题可以从简单的小数量级问题种推导出复杂的大数量级问题的规律：

1  = -2 + 3
2  = 2
3  = 3

4  = 2 + 2
5  = 3 + 2
6  = 3 + 3

7  = 3 + 2 + 2
8  = 3 + 3 + 2
9  = 3 + 3 + 3

10 = 3 + 3 + 2 + 2
11 = 3 + 3 + 3 + 2
12 = 3 + 3 + 3 + 3

13 = 3 + 3 + 3 + 2 + 2
14 = 3 + 3 + 3 + 3 + 2
15 = 3 + 3 + 3 + 3 + 3

16 = 3 + 3 + 3 + 3 + 2 + 2

从上面推导过程，

我们可以发现，n=1,2,3时不具备规律，但是当n>=4时，n每增加3，则对应最少步数+1，

其实原因也很简单，通过上面过程我们可以发现，

其实n>=4开始，

如果n的分解数中存在2，那么n+1，其实就是将2变为3，此时最小步数保持不变。

4  = 2 + 2
5  = 3 + 2

如果n的分解数种不存在2，那么n+1，其实就是将3变为2+2，此时会产生最小步数+1的效果。

6  = 3 + 3

7  = 3 + 2 + 2

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  console.log(getResult(parseInt(line)));
});
 
function getResult(n) {
  if (n == 1) return 2;
  if (n == 2) return 1;
  if (n == 3) return 1;
 
  let base = 2;
  return Math.floor((n - 4) / 3) + base;
}
```

Java算法源码

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    System.out.println(getResult(n));
  }
 
  public static int getResult(int n) {
    if (n == 1) return 2; // -2 + 3
    if (n == 2) return 1; // 2
    if (n == 3) return 1; // 3
 
    int base = 2;
    return (n - 4) / 3 + base;
  }
}
```

Python算法源码

```
# 输入获取
n = int(input())
 
 
# 算法入口
def getResult():
    if n == 1:
        return 2
 
    if n == 2:
        return 1
 
    if n == 3:
        return 1
 
    base = 2
    return (n - 4) // 3 + base
 
 
# 算法调用
print(getResult())
```

