题目描述
给定坐标轴上的一组线段，线段的起点和终点均为整数并且长度不小于1，请你从中找到最少数量的线段，这些线段可以覆盖柱所有线段。

输入描述
第一行输入为所有线段的数量，不超过10000，后面每行表示一条线段，格式为"x,y"，x和y分别表示起点和终点，取值范围是[-10^5，10^5]。

输出描述
最少线段数量，为正整数

用例

| 输入 | 3 1,4 2,5 3,6 |
| ---- | ------------- |
| 输出 | 2             |
| 说明 | 无            |

### 题目解析

用例1图示如下

![image-20230409215336636](https://www.hualigs.cn/image/6432c36a974c4.jpg)

可以发现，只要选择[]1,4[和[3,6]就可以覆盖住所有给定线段。

我的解题思路如下：

首先，将所有区间ranges按照开始位置升序。

然后，创建一个辅助的栈stack，初始时将排序后的第一个区间压入栈中。

然后，遍历出1~ranges.length范围内的每一个区间ranges[i]，将遍历到ranges[i]和stack栈顶区间对比：

如果stack栈顶区间可以包含ranges[i]区间，则range[i]不压入栈顶
如果stack栈顶区间被ranges[i]区间包含，则弹出stack栈顶元素，继续比较ranges[i]和stack新的栈顶元素
如果stack栈顶区间和ranges[i]无法互相包含，只有部分交集，则将ranges[i]区间去除交集部分后，剩余部分区间压入stack
如果stack栈顶区间和ranges[i]区间没有交集，那么直接将ranges[i]压入栈顶
这样的话，最终stack中有多少个区间，就代表至少需要多少个区间才能覆盖所有线段。

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length === n + 1) {
    lines.shift();
    const ranges = lines.map((line) => line.split(",").map(Number));
    console.log(getResult(ranges, n));
 
    lines.length = 0;
  }
});
 
function getResult(ranges, n) {
  ranges.sort((a, b) => a[0] - b[0]);
 
  const stack = [ranges[0]];
 
  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i];
 
    while (true) {
      if (stack.length == 0) {
        stack.push(range);
        break;
      }
 
      const [s0, e0] = stack.at(-1);
      const [s1, e1] = range;
 
      if (s1 <= s0) {
        if (e1 <= s0) {
          break;
        } else if (e1 < e0) {
          break;
        } else {
          stack.pop();
        }
      } else if (s1 < e0) {
        if (e1 <= e0) {
          break;
        } else {
          stack.push([e0, e1]);
          break;
        }
      } else {
        stack.push(range);
        break;
      }
    }
  }
 
  //console.log(stack);
 
  return stack.length;
}
```

### Java算法源码

```
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = Integer.parseInt(sc.nextLine());
 
    Integer[][] ranges = new Integer[n][];
    for (int i = 0; i < n; i++) {
      ranges[i] =
          Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
    }
 
    System.out.println(getResult(ranges));
  }
 
  public static int getResult(Integer[][] ranges) {
    Arrays.sort(ranges, (a, b) -> a[0] - b[0]);
 
    LinkedList<Integer[]> stack = new LinkedList<>();
    stack.add(ranges[0]);
 
    for (int i = 1; i < ranges.length; i++) {
      Integer[] range = ranges[i];
 
      while (true) {
        if (stack.size() == 0) {
          stack.add(range);
          break;
        }
 
        Integer[] top = stack.getLast();
        int s0 = top[0];
        int e0 = top[1];
 
        int s1 = range[0];
        int e1 = range[1];
 
        if (s1 <= s0) {
          if (e1 <= s0) {
            break;
          } else if (e1 < e0) {
            break;
          } else {
            stack.removeLast();
          }
        } else if (s1 < e0) {
          if (e1 <= e0) {
            break;
          } else {
            stack.add(new Integer[] {e0, e1});
            break;
          }
        } else {
          stack.add(range);
          break;
        }
      }
    }
 
    return stack.size();
  }
}
```

### Python算法源码

```
# 输入获取
n = int(input())
rans = [list(map(int, input().split(","))) for i in range(n)]
 
 
# 算法入口
def getResult(rans, n):
    rans.sort(key=lambda x: x[0])
    stack = [rans[0]]
 
    for i in range(1, n):
        ran = rans[i]
 
        while True:
            if len(stack) == 0:
                stack.append(ran)
                break
 
            s0, e0 = stack[-1]
            s1, e1 = ran
 
            if s1 <= s0:
                if e1 <= s0:
                    break
                elif e1 < e0:
                    break
                else:
                    stack.pop()
            elif s1 < e0:
                if e1 <= e0:
                    break
                else:
                    stack.append([e0, e1])
                    break
            else:
                stack.append(ran)
                break
 
    return len(stack)
 
 
# 算法调用
print(getResult(rans, n))
```

