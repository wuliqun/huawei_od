题目描述
给你一个由 '0' (空地)、'1' (银矿)、'2'(金矿) 组成的的地图，矿堆只能由上下左右相邻的金矿或银矿连接形成。超出地图范围可以认为是空地。

假设银矿价值1，金矿价值2 ，请你找出地图中最大价值的矿堆并输出该矿堆的价值。

输入描述
地图元素信息如：

22220
00000
00000
11111

地图范围最大 300*300
0 ≤ 地图元素 ≤ 2
输出描述
矿堆的最大价值

用例
输入	22220
00000
00000
01111
输出	8
说明	无
输入	22220
00020
00010
01111
输出	15
说明	无
输入	20000
00020
00000
00111
输出	3
说明	无
题目解析
本题可以使用深度优先搜索解决。

首先，根据输入得到一个地图矩阵。

然后，定义一个visited集合，用于记录访问过的点的坐标，或者将访问过的点赋值为0，避免一些点被二次访问。

之后，开始遍历矩阵的每一个元素，如果

该元素的值>0（代表有价值）
该元素位置未被访问过
那么就可以从该点向上、下、左、右四个方向开始深搜，对于新点依旧按照上面规则判断是否可以继续深搜。

2023.05.25

经过测试，本题的深度优先搜索（递归实现）在地图矩阵达到50*50以上时就会发生栈内存溢出，因此本题可以使用深度优先搜索（栈实现）。

深度优先搜索的栈实现，非常类似于广度优先搜索，其实就是将广度优先搜索的队列结构，换成栈结构，具体区别可以看：

深度优先搜索-栈实现
Java算法源码

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.stream.Collectors;
 
public class Main {
  // 地图矩阵
  static ArrayList<ArrayList<Integer>> matrix;
 
  // 记录地图矩阵的行数row，列数col
  static int row;
  static int col;
 
  // 上下左右，四个方向的偏移量
  static int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    matrix = new ArrayList<>();
 
    while (sc.hasNextLine()) {
      String line = sc.nextLine();
 
      // 由于本题没有说明输入截止条件，因此使用空行作为输入截止条件
      if ("".equals(line)) {
        System.out.println(getResult());
        break;
      } else {
        matrix.add(
            new ArrayList<>(
                Arrays.stream(line.split("")).map(Integer::parseInt).collect(Collectors.toList())));
      }
    }
  }
 
  public static int getResult() {
    row = matrix.size();
    if (row == 0) return 0;
 
    col = matrix.get(0).size();
 
    // 记录最大矿堆价值
    int ans = 0;
 
    // 遍历矩阵元素
    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        // 如果点(i,j)没有被访问过，且点(i,j)上有矿，则进入深搜
        if (matrix.get(i).get(j) > 0) {
          ans = Math.max(ans, dfs(i, j));
        }
      }
    }
 
    return ans;
  }
 
  public static int dfs(int i, int j) {
    int sum = matrix.get(i).get(j);
    matrix.get(i).set(j, 0);
 
    LinkedList<int[]> stack = new LinkedList<>();
    stack.add(new int[] {i, j});
 
    while (stack.size() > 0) {
      int[] pos = stack.removeLast();
      int x = pos[0], y = pos[1];
 
      for (int[] offset : offsets) {
        int newX = x + offset[0];
        int newY = y + offset[1];
 
        if (newX >= 0 && newX < row && newY >= 0 && newY < col && matrix.get(newX).get(newY) > 0) {
          System.out.println(newX + " " + newY);
          sum += matrix.get(newX).get(newY);
          matrix.get(newX).set(newY, 0);
          stack.add(new int[] {newX, newY});
        }
      }
    }
 
    return sum;
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
 
const lines = [];
// 地图矩阵
let matrix;
rl.on("line", (line) => {
  lines.push(line);
 
  // 由于本题没有说明输入截止条件，因此使用空行作为输入截止条件
  if (line == "") {
    matrix = lines.map((s) => [...s].map(Number));
    console.log(getResult(matrix));
    lines.length = 0;
  }
});
 
// 记录地图矩阵的行数row，列数col
let row, col;
 
function getResult(matrix) {
  // 记录地图矩阵的行数row
  row = matrix.length;
  if (row == 0) return 0;
 
  // 记录地图矩阵的列数col
  col = matrix[0].length;
 
  // 记录最大矿堆价值
  let ans = 0;
 
  // 遍历矩阵元素
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] > 0) {
        ans = Math.max(ans, dfs(i, j));
      }
    }
  }
 
  return ans;
}
 
// 上下左右，四个方向的偏移量
const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
 
function dfs(x, y) {
  let sum = matrix[x][y];
  matrix[x][y] = 0;
 
  const stack = [[x, y]];
 
  while (stack.length > 0) {
    const [x, y] = stack.pop();
 
    for (let offset of offsets) {
      const newX = x + offset[0];
      const newY = y + offset[1];
 
      if (
        newX >= 0 &&
        newX < row &&
        newY >= 0 &&
        newY < col &&
        matrix[newX][newY] > 0
      ) {
        sum += matrix[newX][newY];
        matrix[newX][newY] = 0;
        stack.push([newX, newY]);
      }
    }
  }
 
  return sum;
}
```

py

```
# 上下左右，四个方向的偏移量
offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))
 
 
# 广搜
def dfs(x, y, matrix, row, col):
    total = matrix[x][y]
    matrix[x][y] = 0
 
    stack = [[x, y]]
 
    while len(stack) > 0:
        x, y = stack.pop()
 
        for offset in offsets:
            newX = x + offset[0]
            newY = y + offset[1]
 
            if row > newX >= 0 and col > newY >= 0 and matrix[newX][newY] > 0:
                total += matrix[newX][newY]
                matrix[newX][newY] = 0
                stack.append([newX, newY])
 
    return total
 
 
# 算法入口
def getResult(matrix):
    # 记录地图矩阵的行数row
    row = len(matrix)
 
    if row == 0:
        return 0
 
    # 记录地图矩阵的行数col
    col = len(matrix[0])
 
    # 记录最大矿堆价值
    ans = 0
 
    # 遍历矩阵元素
    for i in range(row):
        for j in range(col):
            # 如果点(i,j)没有被访问过，且点(i,j)上有矿，则进入深搜
            if matrix[i][j] > 0:
                ans = max(ans, dfs(i, j, matrix, row, col))
 
    return ans
 
 
# 输入获取
matrix = []
while True:
    line = input()
 
    # 由于本题没有说明输入截止条件，因此使用空行作为输入截止条件
    if line == "":
        print(getResult(matrix))
        break
    else:
        matrix.append(list(map(int, list(line))))
```

