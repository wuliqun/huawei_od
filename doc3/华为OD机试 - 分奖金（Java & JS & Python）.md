题目描述
公司老板做了一笔大生意，想要给每位员工分配一些奖金，想通过游戏的方式来决定每个人分多少钱。
按照员工的工号顺序，每个人随机抽取一个数字。
按照工号的顺序往后排列，遇到第一个数字比自己数字大的，那么，前面的员工就可以获得“距离*数字差值”的奖金。
如果遇不到比自己数字大的，就给自己分配随机数数量的奖金。
例如，按照工号顺序的随机数字是：2,10,3。
那么第2个员工的数字10比第1个员工的数字2大，
所以，第1个员工可以获得1*（10-2）=8。第2个员工后面没有比他数字更大的员工，
所以，他获得他分配的随机数数量的奖金，就是10。
第3个员工是最后一个员工，后面也没有比他更大数字的员工，所以他得到的奖金是3。

请帮老板计算一下每位员工最终分到的奖金都是多少钱。

输入描述
第一行n表示员工数量（包含最后一个老板）
第二是每位员工分配的随机数字

输出描述
最终每位员工分到的奖金数量

注：随机数字不重复，员工数量（包含老板）范围1~10000，随机数范围1~100000

用例

| 输入 | 3 2 10 3 |
| ---- | -------- |
| 输出 | 8 10 3   |
| 说明 | 无       |

### 题目解析

本题最简单的思路是双重for，但是时间复杂度是O(m^2)，而m取值1~10000，这个数量级非常有可能超时。

利用栈结构通过O(n)时间，找出数组每一个元素的下一个更大值。

## 暴力解法（100%通过）

### Java算法源码

```
import java.util.ArrayList;
import java.util.Scanner;
import java.util.StringJoiner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
 
    int[] arr = new int[m];
    for (int i = 0; i < m; i++) {
      arr[i] = sc.nextInt();
    }
 
    System.out.println(getResult(arr, m));
  }
 
  public static String getResult(int[] arr, int m) {
    ArrayList<Integer> ans = new ArrayList<>();
 
    outer:
    for (int i = 0; i < m; i++) {
      for (int j = i + 1; j < m; j++) {
        if (arr[j] > arr[i]) {
          ans.add((j - i) * (arr[j] - arr[i]));
          continue outer;
        }
      }
      ans.add(arr[i]);
    }
 
    StringJoiner sj = new StringJoiner(" ");
    for (Integer an : ans) sj.add(an + "");
    return sj.toString();
  }
}
```

### JavaScript算法源码

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
 
  if (lines.length === 2) {
    const m = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});
 
function getResult(arr, m) {
  const ans = [];
 
  outter: for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (arr[j] > arr[i]) {
        ans.push((j-i) * (arr[j] - arr[i])); // 距离 * 数字差值
        continue outter;
      }
    }
    ans.push(arr[i]);
  }
 
  return ans.join(" ");
}
```

### Python算法源码

```
# 输入获取
m = int(input())
arr = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr, m):
    ans = []
    for i in range(m):
        flag = True
        for j in range(i+1, m):
            if arr[j] > arr[i]:
                flag = False
                ans.append((j-i) * (arr[j] - arr[i]))
                break
 
        if flag:
            ans.append(arr[i])
 
    return " ".join(map(str, ans))
 
 
# 算法调用
print(getResult(arr, m))
```

## 单调栈解法

### JavaScript算法源码

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
 
  if (lines.length === 2) {
    const m = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});
 
function getResult(arr, m) {
  const stack = [];
  const nextBigger = new Array(m).fill(-1);
 
  for (let i = 0; i < arr.length; i++) {
    while (stack.length) {
      const [idx, val] = stack.at(-1);
      if (arr[i] > val) {
        stack.pop();
        nextBigger[idx] = i;
      } else {
        break;
      }
    }
    stack.push([i, arr[i]]);
  }
 
  const ans = [];
 
  for (let i = 0; i < arr.length; i++) {
    const idx = nextBigger[i];
 
    if (idx === -1) {
      ans.push(arr[i]);
    } else {
      ans.push((idx - i) * (arr[idx] - arr[i])); // 距离 * 数字差值
    }
  }
 
  return ans.join(" ");
}
```

### Java算法源码

```
import java.util.*;
 
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        int m = sc.nextInt();
 
        int[] arr = new int[m];
        for (int i = 0; i < m; i++) {
            arr[i] = sc.nextInt();
        }
 
        System.out.println(getResult(arr, m));
    }
 
    public static String getResult(int[] arr, int m) {
        LinkedList<Integer[]> stack = new LinkedList<>();
        Integer[] nextBigger = new Integer[m];
        Arrays.fill(nextBigger, -1);
 
        for (int i = 0; i < arr.length; i++) {
            while (stack.size() > 0) {
                Integer[] top = stack.peek();
                int idx = top[0];
                int val = top[1];
 
                if (arr[i] > val) {
                    stack.pop();
                    nextBigger[idx] = i;
                } else {
                    break;
                }
            }
 
            Integer[] ele = {i, arr[i]};
            stack.push(ele);
        }
 
        ArrayList<Integer> ans = new ArrayList<>();
 
        for (int i = 0; i < arr.length; i++) {
            Integer idx = nextBigger[i];
 
            if (idx == -1) {
                ans.add(arr[i]);
            } else {
                ans.add((idx - i) * (arr[idx] - arr[i])); // 距离 * 数字差值
            }
        }
 
        StringJoiner sj = new StringJoiner(" ", "", "");
        for (Integer an : ans) sj.add(an + "");
        return sj.toString();
    }
}
```

### Python算法源码

```
# 输入获取
m = int(input())
arr = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr, m):
    stack = []
    nextBigger = [-1] * m
 
    for i in range(m):
        while len(stack) > 0:
            idx, val = stack[-1]
            if arr[i] > val:
                stack.pop()
                nextBigger[idx] = i
            else:
                break
 
        stack.append([i, arr[i]])
 
    ans = []
 
    for i in range(m):
        idx = nextBigger[i]
 
        if idx == -1:
            ans.append(arr[i])
        else:
            ans.append((idx - i) * (arr[idx] - arr[i]))  # 距离 * 数字差值
 
    return " ".join(map(str, ans))
 
 
# 算法调用
print(getResult(arr, m))
```

