题目描述
祖国西北部有一片大片荒地，其中零星的分布着一些湖泊，保护区，矿区;
整体上常年光照良好，但是也有一些地区光照不太好。
某电力公司希望在这里建设多个光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，
其中不能建设的区域发电量为0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量x千瓦。
我们希望能够找到其中集中的矩形区域建设电站，能够获得良好的收益。

输入描述
第一行输入为调研的地区长，宽，以及准备建设的电站【长宽相等，为正方形】的边长最低要求的发电量
之后每行为调研区域每平方公里的发电量

输出描述
输出为这样的区域有多少个

用例

输入	2 5 2 6
1 3 4 5 8
2 3 6 7 1
输出	4
说明	
输入含义：

调研的区域大小为长2宽5的矩形，我们要建设的电站的边长为2，建设电站最低发电量为6.

输出含义：

长宽为2的正方形满足发电量大于等于6的区域有4个。

输入	2 5 1 6
1 3 4 5 8
2 3 6 7 1
输出	3
说明	无

### 题目解析

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let len, wid, sid, min;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [len, wid, sid, min] = lines[0].split(" ").map(Number);
  }
 
  if (len && lines.length === len + 1) {
    const matrix = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(len, wid, sid, min, matrix));
    lines.length = 0;
  }
});
 
/**
 * @param {*} r 调研区域的长
 * @param {*} c 调研区域的宽
 * @param {*} s 正方形电站的边长
 * @param {*} min 正方形电站的最低发电量
 * @param {*} matrix 调研区域每单位面积的发电量矩阵
 */
function getResult(r, c, s, min, matrix) {
  // 列压缩
  const zip_col_dps = [];
 
  // 列压缩后的列数
  const zip_c = c - s + 1;
 
  for (let row of matrix) {
    const zip_col_dp = new Array(zip_c).fill(0);
 
    for (let i = 0; i < s; i++) {
      zip_col_dp[0] += row[i];
    }
 
    for (let i = 1; i < zip_c; i++) {
      zip_col_dp[i] = zip_col_dp[i - 1] - row[i - 1] + row[i + s - 1];
    }
 
    zip_col_dps.push(zip_col_dp);
  }
 
  matrix = zip_col_dps;
 
  // 行压缩之后的行数
  const zip_r = r - s + 1;
 
  // 题解
  let ans = 0;
 
  for (let j = 0; j < zip_c; j++) {
    const zip_row_dp = new Array(zip_c).fill(0);
 
    for (let i = 0; i < s; i++) {
      zip_row_dp[0] += matrix[i][j];
    }
    if (zip_row_dp[0] >= min) ans++;
 
    for (let i = 1; i < zip_r; i++) {
      zip_row_dp[i] =
        zip_row_dp[i - 1] - matrix[i - 1][j] + matrix[i + s - 1][j];
 
      if (zip_row_dp[i] >= min) ans++;
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
 
    int r = sc.nextInt();
    int c = sc.nextInt();
 
    int s = sc.nextInt();
    int min = sc.nextInt();
 
    int[][] matrix = new int[r][c];
    for (int i = 0; i < r; i++) {
      for (int j = 0; j < c; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }
 
    System.out.println(getResult(matrix, r, c, s, min));
  }
 
  /**
   * @param matrix 调研区域每单元面积的发电量矩阵
   * @param r 调研区域的长
   * @param c 调研区域的宽
   * @param s 正方形电站的边长
   * @param min 正方形电站的最低发电量
   * @return 调研区域内有几个符合要求的正方形发电站
   */
  public static int getResult(int[][] matrix, int r, int c, int s, int min) {
    // 压缩后的行数
    int zip_r = r - s + 1;
    // 压缩后的列数
    int zip_c = c - s + 1;
 
    // 先进行列压缩
    int[][] zip_col_dps = new int[r][zip_c];
 
    for (int i = 0; i < matrix.length; i++) {
      int[] row = matrix[i];
 
      for (int j = 0; j < s; j++) {
        zip_col_dps[i][0] += row[j];
      }
 
      for (int j = 1; j < zip_c; j++) {
        zip_col_dps[i][j] = zip_col_dps[i][j - 1] - row[j - 1] + row[j + s - 1];
      }
    }
 
    // 更新矩阵
    matrix = zip_col_dps;
 
    int ans = 0;
 
    // 再进行行压缩
    int[][] zip_col_row_dps = new int[zip_r][zip_c];
 
    for (int j = 0; j < zip_c; j++) {
      for (int i = 0; i < s; i++) {
        zip_col_row_dps[0][j] += matrix[i][j];
      }
      // 压缩后的每一个区块都是一个边长为s的正方形，只要其发电量>=min即可
      if (zip_col_row_dps[0][j] >= min) ans++;
 
      for (int i = 1; i < zip_r; i++) {
        zip_col_row_dps[i][j] = zip_col_row_dps[i - 1][j] - matrix[i - 1][j] + matrix[i + s - 1][j];
        // 压缩后的每一个区块都是一个边长为s的正方形，只要其发电量>=min即可
        if (zip_col_row_dps[i][j] >= min) ans++;
      }
    }
 
    return ans;
  }
}
```

### Python算法源码

```
r, c, s, minV = map(int, input().split())
 
matrix = []
for i in range(r):
    matrix.append(list(map(int, input().split())))
 
 
def getResult(r, c, s, minV, matrix):
    """
    :param r: 调研区域的长
    :param c: 调研区域的宽
    :param s: 正方形电站的边长
    :param minV: 正方形电站的最低发电量
    :param matrix: 调研区域每单位面积的发电量矩阵
    :return: 返回调研区域有几个符合要求正方形电站
    """
 
    # 列压缩
    zip_col_dps = []
 
    # 列压缩后的列数
    zip_c = c - s + 1
 
    for row in matrix:
        zip_col_dp = [0] * zip_c
 
        for i in range(s):
            zip_col_dp[0] += row[i]
 
        for i in range(1, zip_c):
            zip_col_dp[i] = zip_col_dp[i - 1] - row[i - 1] + row[i + s - 1]
 
        zip_col_dps.append(zip_col_dp)
 
    matrix = zip_col_dps
 
    # 行压缩之后的行数
    zip_r = r - s + 1
 
    # 题解
    ans = 0
 
    for j in range(zip_c):
        zip_row_dp = [0] * zip_c
 
        for i in range(s):
            zip_row_dp[0] += matrix[i][j]
 
        if zip_row_dp[0] >= minV:
            ans += 1
 
        for i in range(1, zip_r):
            zip_row_dp[i] = zip_row_dp[i - 1] - matrix[i - 1][j] + matrix[i + s - 1][j]
 
            if zip_row_dp[i] >= minV:
                ans += 1
 
    print(ans)
 
 
getResult(r, c, s, minV, matrix)
```

## 基于二维矩阵前缀和的求解方法（更简单）

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let len, wid, sid, min;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [len, wid, sid, min] = lines[0].split(" ").map(Number);
  }
 
  if (len && lines.length === len + 1) {
    const matrix = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(len, wid, sid, min, matrix));
    lines.length = 0;
  }
});
 
/**
 * @param {*} r 调研区域的行数
 * @param {*} c 调研区域的列数
 * @param {*} s 正方形电站的边长
 * @param {*} min 正方形电站的最低发电量
 * @param {*} matrix 调研区域每单位面积的发电量矩阵
 */
function getResult(r, c, s, min, matrix) {
  const preSum = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0));
 
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        matrix[i - 1][j - 1];
    }
  }
 
  let ans = 0;
 
  for (let i = s; i <= r; i++) {
    for (let j = s; j <= c; j++) {
      const square =
        preSum[i][j] -
        (preSum[i - s][j] + preSum[i][j - s]) +
        preSum[i - s][j - s];
 
      if (square >= min) ans++;
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
 
    int r = sc.nextInt();
    int c = sc.nextInt();
 
    int s = sc.nextInt();
    int min = sc.nextInt();
 
    int[][] matrix = new int[r][c];
    for (int i = 0; i < r; i++) {
      for (int j = 0; j < c; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }
 
    System.out.println(getResult(matrix, r, c, s, min));
  }
 
  /**
   * @param matrix 调研区域每单元面积的发电量矩阵
   * @param r 调研区域的长，即行数
   * @param c 调研区域的宽，即列数
   * @param s 正方形电站的边长
   * @param min 正方形电站的最低发电量
   * @return 调研区域内有几个符合要求的正方形发电站
   */
  public static int getResult(int[][] matrix, int r, int c, int s, int min) {
    int[][] preSum = new int[r + 1][c + 1];
 
    for (int i = 1; i <= r; i++) {
      for (int j = 1; j <= c; j++) {
        preSum[i][j] =
            preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1];
      }
    }
 
    int ans = 0;
 
    for (int i = s; i <= r; i++) {
      for (int j = s; j <= c; j++) {
        int square = preSum[i][j] - (preSum[i - s][j] + preSum[i][j - s]) + preSum[i - s][j - s];
        if (square >= min) ans++;
      }
    }
 
    return ans;
  }
}
```

### Python算法源码

```
# 输入获取
r, c, s, minV = map(int, input().split())
matrix = [list(map(int, input().split())) for i in range(r)]
 
 
def getResult(r, c, s, minV, matrix):
    """
    :param r: 调研区域的长
    :param c: 调研区域的宽
    :param s: 正方形电站的边长
    :param minV: 正方形电站的最低发电量
    :param matrix: 调研区域每单位面积的发电量矩阵
    :return: 返回调研区域有几个符合要求正方形电站
    """
 
    preSum = [[0 for j in range(c + 1)] for i in range(r + 1)]
 
    for i in range(1, r + 1):
        for j in range(1, c + 1):
            preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1]
 
    ans = 0
 
    for i in range(s, r + 1):
        for j in range(s, c + 1):
            square = preSum[i][j] - (preSum[i - s][j] + preSum[i][j - s]) + preSum[i - s][j - s]
 
            if square >= minV:
                ans += 1
 
    return ans
 
 
# 算法调用
print(getResult(r, c, s, minV, matrix))
```

## 如果“不能建设的区域发电量为0kw“含义是：建设的正方形发电站区域内不能含0

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let len, wid, sid, min;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [len, wid, sid, min] = lines[0].split(" ").map(Number);
  }
 
  if (len && lines.length === len + 1) {
    const matrix = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(len, wid, sid, min, matrix));
    lines.length = 0;
  }
});
 
/**
 * @param {*} r 调研区域的行数
 * @param {*} c 调研区域的列数
 * @param {*} s 正方形电站的边长
 * @param {*} min 正方形电站的最低发电量
 * @param {*} matrix 调研区域每单位面积的发电量矩阵
 */
function getResult(r, c, s, min, matrix) {
  const preSum = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0));
 
  const zero = [];
 
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      if (matrix[i - 1][j - 1] == 0) {
        zero.push([i, j]);
      }
 
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        matrix[i - 1][j - 1];
    }
  }
 
  let ans = 0;
 
  for (let i = s; i <= r; i++) {
    for (let j = s; j <= c; j++) {
      const square =
        preSum[i][j] -
        (preSum[i - s][j] + preSum[i][j - s]) +
        preSum[i - s][j - s];
 
      if (square >= min && !isIn(zero, [i, j], s)) ans++;
    }
  }
 
  return ans;
}
 
/**
 * @param {*} tars 不能建设的发电站的地块，即发电量为0的地块的位置集合
 * @param {*} end 建设发电站正方形区域的右下角点位置
 * @param {*} size 正方形的边长
 * @returns 正方形内是否包含0发电量地块位置
 */
function isIn(tars, end, size) {
  const [ex, ey] = end;
  const sx = ex - size + 1;
  const sy = ey - size + 1;
 
  for (let tar of tars) {
    const [tx, ty] = tar;
    if (tx <= ex && tx >= sx && ty <= ey && ty >= sy) return true;
  }
 
  return false;
}
```

### Java算法源码

```
import java.util.ArrayList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int r = sc.nextInt();
    int c = sc.nextInt();
 
    int s = sc.nextInt();
    int min = sc.nextInt();
 
    int[][] matrix = new int[r][c];
    for (int i = 0; i < r; i++) {
      for (int j = 0; j < c; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }
 
    System.out.println(getResult(matrix, r, c, s, min));
  }
 
  /**
   * @param matrix 调研区域每单元面积的发电量矩阵
   * @param r 调研区域的长，即行数
   * @param c 调研区域的宽，即列数
   * @param s 正方形电站的边长
   * @param min 正方形电站的最低发电量
   * @return 调研区域内有几个符合要求的正方形发电站
   */
  public static int getResult(int[][] matrix, int r, int c, int s, int min) {
    int[][] preSum = new int[r + 1][c + 1];
    ArrayList<Integer[]> zero = new ArrayList<>();
 
    for (int i = 1; i <= r; i++) {
      for (int j = 1; j <= c; j++) {
        if (matrix[i - 1][j - 1] == 0) {
          zero.add(new Integer[] {i, j});
        }
 
        preSum[i][j] =
            preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1];
      }
    }
 
    int ans = 0;
 
    for (int i = s; i <= r; i++) {
      for (int j = s; j <= c; j++) {
        int square = preSum[i][j] - (preSum[i - s][j] + preSum[i][j - s]) + preSum[i - s][j - s];
        if (square >= min && !isIn(zero, new int[] {i, j}, s)) ans++;
      }
    }
 
    return ans;
  }
 
  /**
   * @param tars 不能建设的发电站的地块，即发电量为0的地块的位置集合
   * @param end 建设发电站正方形区域的右下角点位置
   * @param size 正方形的边长
   * @return 正方形内是否包含0发电量地块位置
   */
  public static boolean isIn(ArrayList<Integer[]> tars, int[] end, int size) {
    int ex = end[0];
    int ey = end[1];
 
    int sx = ex - size + 1;
    int sy = ey - size + 1;
 
    for (Integer[] tar : tars) {
      int tx = tar[0];
      int ty = tar[1];
 
      if (tx <= ex && tx >= sx && ty <= ey && ty >= sy) return true;
    }
 
    return false;
  }
}
```

### Python算法源码

```
# 输入获取
r, c, s, minV = map(int, input().split())
matrix = [list(map(int, input().split())) for i in range(r)]
 
 
def isIn(tars, end, size):
    """
    :param tars: 不能建设的发电站的地块，即发电量为0的地块的位置集合
    :param end: 建设发电站正方形区域的右下角点位置
    :param size: 正方形的边长
    :return: 正方形内是否包含0发电量地块位置
    """
    ex, ey = end
    sx, sy = ex - size + 1, ey - size + 1
 
    for tar in tars:
        tx, ty = tar
        if sx <= tx <= ex and sy <= ty <= ey:
            return True
 
    return False
 
 
def getResult(r, c, s, minV, matrix):
    """
    :param r: 调研区域的长
    :param c: 调研区域的宽
    :param s: 正方形电站的边长
    :param minV: 正方形电站的最低发电量
    :param matrix: 调研区域每单位面积的发电量矩阵
    :return: 返回调研区域有几个符合要求正方形电站
    """
 
    preSum = [[0 for j in range(c + 1)] for i in range(r + 1)]
    zero = []
 
    for i in range(1, r + 1):
        for j in range(1, c + 1):
            if matrix[i - 1][j - 1] == 0:
                zero.append([i, j])
            preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1]
 
    ans = 0
 
    for i in range(s, r + 1):
        for j in range(s, c + 1):
            square = preSum[i][j] - (preSum[i - s][j] + preSum[i][j - s]) + preSum[i - s][j - s]
 
            if square >= minV and not isIn(zero, [i, j], s):
                ans += 1
 
    return ans
 
 
# 算法调用
print(getResult(r, c, s, minV, matrix))
```

