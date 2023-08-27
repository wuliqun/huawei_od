题目描述
某个充电站，可提供n个充电设备，每个充电设备均有对应的输出功率。任意个充电设备组合的输出功率总和，均构成功率集合P的1个元素。功率集合P的最优元素，表示最接近充电站最大输出功率p_max的元素。

输入描述
输入为3行：

第1行为充电设备个数n
第2行为每个充电设备的输出功率
第3行为充电站最大输出功率p_max
输出描述
功率集合P的最优元素

备注
充电设备个数 n > 0
最优元素必须小于或等于充电站最大输出功率p_max
用例

| 输入 | 4 50 20 20 60 90                                             |
| ---- | ------------------------------------------------------------ |
| 输出 | 90                                                           |
| 说明 | 当充电设备输出功率50、20、20组合时，其输出功率总和为90，最接近充电站最大充电输出功率，因此最优元素为90。 |

| 输入 | 2 50 40 30                                                   |
| ---- | ------------------------------------------------------------ |
| 输出 | 0                                                            |
| 说明 | 所有充电设备的输出功率组合，均大于充电站最大充电输出功率30，此时最优元素值为0。 |

## 题目解析

本题可以当成[01背包问题](https://so.csdn.net/so/search?q=01背包问题&spm=1001.2101.3001.7020)处理。其中：

第3行充电站最大输出功率p_max 可以当成 背包承重

第2行每个充电设备的输出功率 可以当成 不同物品的重量以及价值，即重量=价值

现在要求：背包承重下能装入的最大价值。

## 01背包二维数组解法

### JavaScript算法源码

```javascript
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 3) {
    const n = lines[0] - 0;
    const p = lines[1].split(" ").map(Number);
    const p_max = lines[2] - 0;
 
    console.log(getResult(n, p, p_max));
    lines.length = 0;
  }
});
 
function getResult(n, p, p_max) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(p_max + 1).fill(0));
 
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= p_max; j++) {
      if (i === 0 || j === 0) continue;
 
      // 注意这里p[i-1]中i-1不会越界，因为i=0时不会走到这一步，另外i-1是为了防止尾越界，因为dp矩阵的行数是n+1，因此p[i]可能会尾越界，而p[i-1]就不会越界了
      if (p[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], p[i - 1] + dp[i - 1][j - p[i - 1]]);
      }
    }
  }
 
  return dp[n][p_max];
}
```

### Java算法源码

```java
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] p = new int[n];
    for (int i = 0; i < n; i++) {
      p[i] = sc.nextInt();
    }
 
    int p_max = sc.nextInt();
 
    System.out.println(getResult(n, p, p_max));
  }
 
  public static int getResult(int n, int[] p, int p_max) {
    int[][] dp = new int[n + 1][p_max + 1];
 
    for (int i = 0; i <= n; i++) {
      for (int j = 0; j <= p_max; j++) {
        if (i == 0 || j == 0) continue;
 
        // 注意这里p[i-1]中i-1不会越界，因为i=0时不会走到这一步，另外i-1是为了防止尾越界，因为dp矩阵的行数是n+1，因此p[i]可能会尾越界，而p[i-1]就不会越界了
        if (p[i - 1] > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], p[i - 1] + dp[i - 1][j - p[i - 1]]);
        }
      }
    }
 
    return dp[n][p_max];
  }
}
```

### Python算法源码

```python
n = int(input())
p = list(map(int, input().split()))
p_max = int(input())
 
dp = [[0 for i in range(p_max + 1)] for j in range(n + 1)]
 
for i in range(n + 1):
    for j in range(p_max + 1):
        if i == 0 or j == 0:
            continue
 
        if p[i - 1] > j:
            dp[i][j] = dp[i - 1][j]
        else:
            dp[i][j] = max(dp[i - 1][j], p[i - 1] + dp[i - 1][j - p[i - 1]])
 
print(dp[n][p_max])
```

## 01背包滚动数组优化解法

###  Java算法源码

```java
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] p = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      p[i] = sc.nextInt();
    }
 
    int p_max = sc.nextInt();
 
    System.out.println(getResult(n, p, p_max));
  }
 
  public static int getResult(int n, int[] p, int p_max) {
    // 01背包滚动数组优化解法
    int[] dp = new int[p_max + 1];
 
    for (int i = 1; i <= n; i++) {
      // 注意使用滚动数组优化时，关于背包承重的遍历应该倒序
      for (int j = p_max; j >= p[i]; j--) {
        dp[j] = Math.max(dp[j], dp[j - p[i]] + p[i]);
      }
    }
 
    return dp[p_max];
  }
}
```

### JavaScript算法源码

```javascript
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 3) {
    const n = lines[0] - 0;
    const p = lines[1].split(" ").map(Number);
    const p_max = lines[2] - 0;
 
    console.log(getResult(n, p, p_max));
    lines.length = 0;
  }
});
 
function getResult(n, p, p_max) {
  p = [0, ...p];
 
  // 01背包滚动数组优化解法
  const dp = new Array(p_max + 1).fill(0);
 
  for (let i = 1; i <= n; i++) {
    // 注意使用滚动数组优化时，关于背包承重的遍历应该倒序
    for (let j = p_max; j >= p[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - p[i]] + p[i]);
    }
  }
 
  return dp[p_max];
}
```

### Python算法源码

```python
# 输入获取
n = int(input())
p = list(map(int, input().split()))
p_max = int(input())
 
 
# 算法入口
def getResult(n, p, p_max):
    p.insert(0, 0)
 
    # 01背包滚动数组优化解法
    dp = [0 for _ in range(p_max + 1)]
 
    for i in range(1, n + 1):
        # 注意使用滚动数组优化时，关于背包承重的遍历应该倒序
        for j in range(p_max, p[i] - 1, -1):
            dp[j] = max(dp[j], dp[j - p[i]] + p[i])
 
    print(dp[p_max])
 
 
# 算法调用
getResult(n, p, p_max)
```