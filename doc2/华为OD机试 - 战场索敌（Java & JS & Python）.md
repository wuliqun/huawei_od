题目描述
有一个大小是N*M的战场地图，被墙壁 '#' 分隔成大小不同的区域，上下左右四个方向相邻的空地 '.' 属于同一个区域，只有空地上可能存在敌人'E”，请求出地图上总共有多少区域里的敌人数小于K。

输入描述
第一行输入为N,M,K；

N表示地图的行数，M表示地图的列数， K表示目标敌人数量
N，M<=100
之后为一个NxM大小的字符数组。

输出描述
敌人数小于K的区域数量

用例
输入	3 5 2
..#EE
E.#E.
###..
输出	1
说明	地图被墙壁分为两个区域，左边区域有1个敌人，右边区域有3个敌人，符合条件的区域数量是1
题目解析 
用例图示如下



本题可以用深度优先搜索DFS来解决。

如果一个点满足下面条件，则进入深搜：

未被访问过（未被深搜过）
不是墙
同属一个源头的深搜区域，就是对应一个被墙隔开的独立区域，如果该独立区域深搜过程中，发现'E'，则该区域的敌军数量+1。

如果一个独立区域深搜完成，对应敌军数量<k，则最终题解统计的：敌军小于K的区域数量 + 1。

另外，本题数量级稍大，如果采用深度优先搜索（递归实现），则可能会发生栈内存溢出，即Stack Overflow，因此推荐使用深度优先搜索（栈实现），或者广度优先搜索。

关于深度优先搜索（基于栈）和广度优先搜索（基于队列）的代码模板是非常类似的，但是由于选择的数据结构不同，因此产生深搜和广搜的不同效果。

JS算法源码
广度优先搜索（基于队列结构，先进先出）

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
 
// 矩阵行数，矩阵列数，区域敌军数量上限
let n, m, k;
// 地图矩阵
let matrix;
// 访问矩阵
let visited;
 
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 1) {
    [n, m, k] = lines[0].split(" ").map(Number);
  }
 
  if (n != undefined && lines.length == n + 1) {
    lines.shift();
    matrix = lines;
    visited = new Array(n).fill(0).map(() => new Array(m).fill(false));
 
    console.log(getResult());
 
    lines.length = 0;
  }
});
 
function getResult() {
  let ans = 0;
 
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || matrix[i][j] == "#") continue;
      // 如果(i,j)位置未访问过，且不是墙，则进入广搜，广搜结果是广搜区域内的敌军数量，如果数量小于k，则该区域符合要求
      ans += bfs(i, j) < k ? 1 : 0;
    }
  }
 
  return ans;
}
 
// 上、下、左、右偏移量
const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
 
function bfs(i, j) {
  // 该区域敌军数量
  let count = 0;
 
  // 如果源位置是E，则敌军数量+1
  if (matrix[i][j] == "E") count += 1;
 
  // 标记源位置访问过
  visited[i][j] = true;
 
  // 广搜依赖于队列结构，先进先出
  const queue = [[i, j]];
 
  while (queue.length > 0) {
    const [x, y] = queue.shift();
 
    // 遍历该位置的上下左右
    for (let offset of offsets) {
      const newX = x + offset[0];
      const newY = y + offset[1];
 
      // 如果新位置不越界，且未访问过，且不是墙，则继续广搜
      if (
        newX >= 0 &&
        newX < n &&
        newY >= 0 &&
        newY < m &&
        !visited[newX][newY] &&
        matrix[newX][newY] != "#"
      ) {
        // 如果对应位置是E，则敌军数量+1
        if (matrix[newX][newY] == "E") count += 1;
 
        // 标记该位置访问过
        visited[newX][newY] = true;
 
        queue.push([newX, newY]);
      }
    }
  }
 
  return count;
}
```

深度优先搜索（基于栈结构，后进先出） 

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
 
// 矩阵行数，矩阵列数，区域敌军数量上限
let n, m, k;
// 地图矩阵
let matrix;
// 访问矩阵
let visited;
 
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 1) {
    [n, m, k] = lines[0].split(" ").map(Number);
  }
 
  if (n != undefined && lines.length == n + 1) {
    lines.shift();
    matrix = lines;
    visited = new Array(n).fill(0).map(() => new Array(m).fill(false));
 
    console.log(getResult());
 
    lines.length = 0;
  }
});
 
function getResult() {
  let ans = 0;
 
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || matrix[i][j] == "#") continue;
      // 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
      ans += dfs(i, j) < k ? 1 : 0;
    }
  }
 
  return ans;
}
 
// 上、下、左、右偏移量
const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
 
function dfs(i, j) {
  // 该区域敌军数量
  let count = 0;
 
  // 如果源位置是E，则敌军数量+1
  if (matrix[i][j] == "E") count += 1;
 
  // 标记源位置访问过
  visited[i][j] = true;
 
  // 深搜依赖于栈结构，后进先出
  const stack = [[i, j]];
 
  while (stack.length > 0) {
    const [x, y] = stack.pop();
 
    // 遍历该位置的上下左右
    for (let offset of offsets) {
      const newX = x + offset[0];
      const newY = y + offset[1];
 
      // 如果新位置不越界，且未访问过，且不是墙，则继续深搜
      if (
        newX >= 0 &&
        newX < n &&
        newY >= 0 &&
        newY < m &&
        !visited[newX][newY] &&
        matrix[newX][newY] != "#"
      ) {
        // 如果对应位置是E，则敌军数量+1
        if (matrix[newX][newY] == "E") count += 1;
 
        // 标记该位置访问过
        visited[newX][newY] = true;
 
        stack.push([newX, newY]);
      }
    }
  }
 
  return count;
}
```

深度优先搜索（基于递归），容易超出执行栈内存，即Stack Overflow 

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
 
// 矩阵行数，矩阵列数，区域敌军数量上限
let n, m, k;
// 地图矩阵
let matrix;
// 访问矩阵
let visited;
 
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 1) {
    [n, m, k] = lines[0].split(" ").map(Number);
  }
 
  if (n != undefined && lines.length == n + 1) {
    lines.shift();
    matrix = lines;
    visited = new Array(n).fill(0).map(() => new Array(m).fill(false));
 
    console.log(getResult());
 
    lines.length = 0;
  }
});
 
function getResult() {
  let ans = 0;
 
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || matrix[i][j] == "#") continue;
      // 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
      ans += dfs(i, j, 0) < k ? 1 : 0;
    }
  }
 
  return ans;
}
 
// 上、下、左、右偏移量
const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
 
function dfs(x, y, count) {
  // 如果对应位置是E，则敌军数量+1
  if (matrix[x][y] == "E") count += 1;
  // 标记该位置访问过
  visited[x][y] = true;
 
  // 遍历该位置的上下左右
  for (let offset of offsets) {
    const newX = x + offset[0];
    const newY = y + offset[1];
 
    // 如果新位置不越界，且未访问过，且不是墙，则继续深搜
    if (
      newX >= 0 &&
      newX < n &&
      newY >= 0 &&
      newY < m &&
      !visited[newX][newY] &&
      matrix[newX][newY] != "#"
    ) {
      // 更新count
      count = dfs(newX, newY, count);
    }
  }
 
  return count;
}
```

### Java算法源码

广度优先搜索（基于队列结构，先进先出）

```
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  static int n; // 地图行数
  static int m; // 地图列数
  static int k; // 区域敌军人数上限值
  static char[][] matrix; // 地图矩阵
  static boolean[][] visited; // 访问矩阵
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] tmp = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    n = tmp[0];
    m = tmp[1];
    k = tmp[2];
 
    visited = new boolean[n][m];
 
    matrix = new char[n][];
    for (int i = 0; i < n; i++) {
      matrix[i] = sc.nextLine().toCharArray();
    }
 
    System.out.println(getResult());
  }
 
  public static int getResult() {
    int ans = 0;
 
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        if (visited[i][j] || matrix[i][j] == '#') continue;
        // 如果(i,j)位置未访问过，且不是墙，则进入广搜，广搜结果是广搜区域内的敌军数量，如果数量小于k，则该区域符合要求
        ans += bfs(i, j) < k ? 1 : 0;
      }
    }
 
    return ans;
  }
 
  // 上、下、左、右偏移量
  static int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
  public static int bfs(int i, int j) {
    // 该区域敌军数量
    int count = 0;
 
    // 标记该位置访问过
    visited[i][j] = true;
 
    // 如果对应位置是E，则敌军数量+1
    if (matrix[i][j] == 'E') count += 1;
 
    // 广搜依赖于队列结构，先进先出
    LinkedList<int[]> queue = new LinkedList<>();
    queue.add(new int[] {i, j});
 
    while (queue.size() > 0) {
      int[] pos = queue.removeFirst();
      int x = pos[0], y = pos[1];
 
      // 遍历该位置的上下左右
      for (int[] offset : offsets) {
        int newX = x + offset[0];
        int newY = y + offset[1];
 
        // 如果新位置不越界，且未访问过，且不是墙，则继续广搜
        if (newX >= 0
            && newX < n
            && newY >= 0
            && newY < m
            && !visited[newX][newY]
            && matrix[newX][newY] != '#') {
          // 标记该位置访问过
          visited[newX][newY] = true;
 
          // 如果对应位置是E，则敌军数量+1
          if (matrix[newX][newY] == 'E') count += 1;
 
          queue.add(new int[] {newX, newY});
        }
      }
    }
 
    return count;
  }
}
```

深度优先搜索（基于栈结构，后进先出） 

```
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  static int n; // 地图行数
  static int m; // 地图列数
  static int k; // 区域敌军人数上限值
  static char[][] matrix; // 地图矩阵
  static boolean[][] visited; // 访问矩阵
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] tmp = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    n = tmp[0];
    m = tmp[1];
    k = tmp[2];
 
    visited = new boolean[n][m];
 
    matrix = new char[n][];
    for (int i = 0; i < n; i++) {
      matrix[i] = sc.nextLine().toCharArray();
    }
 
    System.out.println(getResult());
  }
 
  public static int getResult() {
    int ans = 0;
 
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        if (visited[i][j] || matrix[i][j] == '#') continue;
        // 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
        ans += dfs(i, j) < k ? 1 : 0;
      }
    }
 
    return ans;
  }
 
  // 上、下、左、右偏移量
  static int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
  public static int dfs(int i, int j) {
    // 该区域敌军数量
    int count = 0;
 
    // 标记该位置访问过
    visited[i][j] = true;
 
    // 如果对应位置是E，则敌军数量+1
    if (matrix[i][j] == 'E') count += 1;
 
    // 深搜依赖于栈结构，后进先出
    LinkedList<int[]> stack = new LinkedList<>();
    stack.add(new int[] {i, j});
 
    while (stack.size() > 0) {
      int[] pos = stack.removeLast();
      int x = pos[0], y = pos[1];
 
      // 遍历该位置的上下左右
      for (int[] offset : offsets) {
        int newX = x + offset[0];
        int newY = y + offset[1];
 
        // 如果新位置不越界，且未访问过，且不是墙，则继续深搜
        if (newX >= 0
            && newX < n
            && newY >= 0
            && newY < m
            && !visited[newX][newY]
            && matrix[newX][newY] != '#') {
          // 标记该位置访问过
          visited[newX][newY] = true;
 
          // 如果对应位置是E，则敌军数量+1
          if (matrix[newX][newY] == 'E') count += 1;
 
          stack.add(new int[] {newX, newY});
        }
      }
    }
 
    return count;
  }
}
```

深度优先搜索（基于递归），容易超出执行栈内存，即Stack Overflow 

```import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  static int n; // 地图行数
  static int m; // 地图列数
  static int k; // 区域敌军人数上限值
  static char[][] matrix; // 地图矩阵
  static boolean[][] visited; // 访问矩阵
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] tmp = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    n = tmp[0];
    m = tmp[1];
    k = tmp[2];
 
    visited = new boolean[n][m];
 
    matrix = new char[n][];
    for (int i = 0; i < n; i++) {
      matrix[i] = sc.nextLine().toCharArray();
    }
 
    System.out.println(getResult());
  }
 
  public static int getResult() {
    int ans = 0;
 
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        if (visited[i][j] || matrix[i][j] == '#') continue;
        // 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
        ans += dfs(i, j, 0) < k ? 1 : 0;
      }
    }
 
    return ans;
  }
 
  // 上、下、左、右偏移量
  static int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
  public static int dfs(int x, int y, int count) {
    // 如果对应位置是E，则敌军数量+1
    if (matrix[x][y] == 'E') count += 1;
    // 标记该位置访问过
    visited[x][y] = true;
 
    // 遍历该位置的上下左右
    for (int[] offset : offsets) {
      int newX = x + offset[0];
      int newY = y + offset[1];
 
      // 如果新位置不越界，且未访问过，且不是墙，则继续深搜
      if (newX >= 0
          && newX < n
          && newY >= 0
          && newY < m
          && !visited[newX][newY]
          && matrix[newX][newY] != '#') {
        // 更新count
        count = dfs(newX, newY, count);
      }
    }
 
    return count;
  }
}
```

### Python算法源码

广度优先搜索（基于队列结构，先进先出）

```
# 输入获取
n, m, k = map(int, input().split())  # 地图行数, 地图列数, 区域敌军人数上限值
matrix = [input() for _ in range(n)]  # 地图矩阵
visited = [[False for _ in range(m)] for _ in range(n)]  # 访问矩阵
offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))  # 上、下、左、右偏移量
 
 
# 广度优先搜索
def bfs(i, j):
    count = 0
 
    # 如果对应位置是E，则敌军数量+1
    if matrix[i][j] == 'E':
        count += 1
 
    # 标记该位置访问过
    visited[i][j] = True
 
    queue = [(i, j)]
 
    while len(queue) > 0:
        # 广搜依赖于队列结构，先进先出
        x, y = queue.pop(0)
 
        # 遍历该位置的上下左右
        for offsetX, offsetY in offsets:
            newX = x + offsetX
            newY = y + offsetY
 
            # 如果新位置不越界，且未访问过，且不是墙，则继续广度
            if n > newX >= 0 and m > newY >= 0 and not visited[newX][newY] and matrix[newX][newY] != '#':
                # 如果对应位置是E，则敌军数量+1
                if matrix[newX][newY] == 'E':
                    count += 1
 
                # 标记该位置访问过
                visited[newX][newY] = True
 
                queue.append((newX, newY))
 
    return count
 
 
# 算法入口
def getResult():
    ans = 0
 
    for i in range(n):
        for j in range(m):
            if visited[i][j] or matrix[i][j] == '#':
                continue
 
            # 如果(i,j)位置未访问过，且不是墙，则进入广度，广度结果是广度区域内的敌军数量，如果数量小于k，则该区域符合要求
            ans += 1 if bfs(i, j) < k else 0
 
    return ans
 
 
# 算法调用
print(getResult())
```

深度优先搜索（基于栈结构，后进先出） 

```
# 输入获取
n, m, k = map(int, input().split())  # 地图行数, 地图列数, 区域敌军人数上限值
matrix = [input() for _ in range(n)]  # 地图矩阵
visited = [[False for _ in range(m)] for _ in range(n)]  # 访问矩阵
offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))  # 上、下、左、右偏移量
 
 
# 深搜优先搜索
def dfs(i, j):
    # 该区域敌军数量
    count = 0
 
    visited[i][j] = True
 
    if matrix[i][j] == 'E':
        count += 1
 
    stack = [(i, j)]
 
    while len(stack) > 0:
        # 深搜依赖于栈结构，后进先出
        x, y = stack.pop()
 
        # 遍历该位置的上下左右
        for offsetX, offsetY in offsets:
            newX = x + offsetX
            newY = y + offsetY
 
            # 如果新位置不越界，且未访问过，且不是墙，则继续深搜
            if n > newX >= 0 and m > newY >= 0 and not visited[newX][newY] and matrix[newX][newY] != '#':
                visited[newX][newY] = True
 
                if matrix[newX][newY] == 'E':
                    count += 1
 
                stack.append((newX, newY))
 
    return count
 
 
# 算法入口
def getResult():
    ans = 0
 
    for i in range(n):
        for j in range(m):
            if visited[i][j] or matrix[i][j] == '#':
                continue
 
            # 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
            ans += 1 if dfs(i, j) < k else 0
 
    return ans
 
 
# 算法调用
print(getResult())
```

深度优先搜索（基于递归），容易超出执行栈内存，即Stack Overflow 

```
# 输入获取
n, m, k = map(int, input().split())  # 地图行数, 地图列数, 区域敌军人数上限值
matrix = [input() for _ in range(n)]  # 地图矩阵
visited = [[False for _ in range(m)] for _ in range(n)]  # 访问矩阵
offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))  # 上、下、左、右偏移量
 
 
# 深搜
def dfs(x, y, count):
    # 如果对应位置是E，则敌军数量+1
    if matrix[x][y] == 'E':
        count += 1
 
    # 标记该位置访问过
    visited[x][y] = True
 
    # 遍历该位置的上下左右
    for offsetX, offsetY in offsets:
        newX = x + offsetX
        newY = y + offsetY
 
        # 如果新位置不越界，且未访问过，且不是墙，则继续深搜
        if n > newX >= 0 and m > newY >= 0 and not visited[newX][newY] and matrix[newX][newY] != '#':
            # 更新count
            count = dfs(newX, newY, count)
 
    return count
 
 
# 算法入口
def getResult():
    ans = 0
 
    for i in range(n):
        for j in range(m):
            if visited[i][j] or matrix[i][j] == '#':
                continue
 
            # 如果(i,j)位置未访问过，且不是墙，则进入深搜，深搜结果是深搜区域内的敌军数量，如果数量小于k，则该区域符合要求
            ans += 1 if dfs(i, j, 0) < k else 0
 
    return ans
 
 
# 算法调用
print(getResult())
```

