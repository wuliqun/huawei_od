题目描述
给一块n*m的地块，相当于n*m的二维数组，每个元素的值表示这个小地块的发电量；

求在这块地上建立正方形的边长为c的发电站，发电量满足目标电量k的地块数量。

输入描述
第一行为四个按空格分隔的正整数，分别表示n, m , c k

后面n行整数，表示每个地块的发电量

输出描述
输出满足条件的地块数量

**用例**

| 输入 | 2 5 2 6 1 3 4 5 8 2 3 6 7 1 |
| ---- | --------------------------- |
| 输出 | 4                           |
| 说明 | 无                          |

### 题目解析

本题最优解题思路是使用：二维矩阵前缀

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n, m, c, k;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [n, m, c, k] = lines[0].split(" ").map(Number);
  }
 
  if (n && lines.length === n + 1) {
    const matrix = lines.slice(1).map((line) => line.split(" ").map(Number));
 
    console.log(getResult(matrix, n, m, c, k));
 
    lines.length = 0;
  }
});
 
/**
 *
 * @param {*} matrix n*m的地块
 * @param {*} n 地块行数
 * @param {*} m 地块列数
 * @param {*} c 正方形的发电站边长为c
 * @param {*} k 目标电量k
 */
function getResult(matrix, n, m, c, k) {
  const preSum = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
 
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        matrix[i - 1][j - 1];
    }
  }
 
  let ans = 0;
 
  for (let i = c; i <= n; i++) {
    for (let j = c; j <= m; j++) {
      const square =
        preSum[i][j] -
        (preSum[i - c][j] + preSum[i][j - c]) +
        preSum[i - c][j - c];
 
      if (square >= k) ans++;
    }
  }
 
  return ans;
}
```

### Java算法源码

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
    int m = sc.nextInt();
    int c = sc.nextInt();
    int k = sc.nextInt();
 
    int[][] matrix = new int[n][m];
 
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }
 
    System.out.println(getResult(matrix, n, m, c, k));
  }
 
  /**
   * @param matrix n*m的地块
   * @param n 地块行数
   * @param m 地块列数
   * @param c 正方形的发电站边长为c
   * @param k 目标电量k
   * @return 可以建设几个发电站
   */
  public static int getResult(int[][] matrix, int n, int m, int c, int k) {
    int[][] preSum = new int[n + 1][m + 1];
 
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= m; j++) {
        preSum[i][j] =
            preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1];
      }
    }
 
    int ans = 0;
 
    for (int i = c; i <= n; i++) {
      for (int j = c; j <= m; j++) {
        int square = preSum[i][j] - (preSum[i - c][j] + preSum[i][j - c]) + preSum[i - c][j - c];
        if (square >= k) ans++;
      }
    }
 
    return ans;
  }
}
```

### Python算法源码

```
# 输入获取
n, m, c, k = map(int, input().split())
matrix = [list(map(int, input().split())) for i in range(n)]
 
 
# 算法入口
def getResult(n, m, c, k, matrix):
    """
    :param n: 调研区域的长，行数
    :param m: 调研区域的宽，列数
    :param c: 正方形电站的边长
    :param k: 正方形电站的最低发电量
    :param matrix: 调研区域每单位面积的发电量矩阵
    :return: 返回调研区域有几个符合要求正方形电站
    """
 
    preSum = [[0 for j in range(m + 1)] for i in range(n + 1)]
 
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1]
 
    ans = 0
 
    for i in range(c, n + 1):
        for j in range(c, m + 1):
            square = preSum[i][j] - (preSum[i - c][j] + preSum[i][j - c]) + preSum[i - c][j - c]
            if square >= k:
                ans += 1
 
    return ans
 
 
# 算法调用
print(getResult(n, m, c, k, matrix))
```

