题目描述
网络信号经过传递会逐层衰减，且遇到阻隔物无法直接穿透，在此情况下需要计算某个位置的网络信号值。
注意:网络信号可以绕过阻隔物。

array[m][n] 的二维数组代表网格地图，
array[i][j] = 0代表i行j列是空旷位置;
array[i][j] = x(x为正整数)代表i行j列是信号源，信号强度是x;
array[i][j] = -1代表i行j列是阻隔物。
信号源只有1个，阻隔物可能有0个或多个
网络信号衰减是上下左右相邻的网格衰减1
现要求输出对应位置的网络信号值。

输入描述
输入为三行，第一行为 m 、n ，代表输入是一个 m × n 的数组。
第二行是一串 m × n 个用空格分隔的整数.
每连续 n 个数代表一行，再往后 n 个代表下一行，以此类推。
对应的值代表对应的网格是空旷位置，还是信号源，还是阻隔物。
第三行是 i 、 j，代表需要计算array[i][j]的网络信号值。
注意：此处 i 和 j 均从 0 开始，即第一行 i 为 0。

例如

6 5
0 0 0 -1 0 0 0 0 0 0 0 0 -1 4 0 0 0 0 0 0 0 0 0 0 -1 0 0 0 0 0
1 4
代表如下地图

![image-20230409215739559](https://www.hualigs.cn/image/6432c45a0e05d.jpg)

需要输出第1行第4列的网络信号值，如下图，值为2。



### 输出描述

输出对应位置的网络信号值，如果网络信号未覆盖到，也输出0。
一个网格如果可以途径不同的传播衰减路径传达，取较大的值作为其信号值。



### 用例

入	6 5
0 0 0 -1 0 0 0 0 0 0 0 0 -1 4 0 0 0 0 0 0 0 0 0 0 -1 0 0 0 0 0
1 4
输出	2
说明	无
输入	6 5
0 0 0 -1 0 0 0 0 0 0 0 0 -1 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
2 1
输出	0
说明	无
题目解析

[用例图](https://so.csdn.net/so/search?q=用例图&spm=1001.2101.3001.7020)示如下

![image-20230409215824426](https://www.hualigs.cn/image/6432c4a419aae.jpg)

因此[1,4]位置（如上图红框位置）的值为2。



通过图示，我们可以很容易想到解题思路是图的多源[BFS](https://so.csdn.net/so/search?q=BFS&spm=1001.2101.3001.7020)。

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
 
  if (lines.length === 3) {
    const [m, n] = lines[0].split(" ").map(Number);
    const arr = lines[1].split(" ").map(Number);
    const pos = lines[2].split(" ").map(Number);
    console.log(getResult(arr, m, n, pos));
    lines.length = 0;
  }
});
 
function getResult(arr, m, n, pos) {
  let queue = [];
 
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i * n + j] > 0) {
        queue.push([i, j]);
        break;
      }
    }
  }
 
  // 上下左右偏移量
  const offset = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
 
  while (queue.length) {
    const newQueue = []; // 此时不使用queue.shift操作，因为此步操每次都需要O(n)时间，无法应对大数量级情况
 
    for (const [i, j] of queue) {
      const x = arr[i * n + j] - 1;
 
      if (x === 0) break;
 
      for (let [offsetX, offsetY] of offset) {
        const newI = i + offsetX;
        const newJ = j + offsetY;
 
        if (
          newI >= 0 &&
          newI < m &&
          newJ >= 0 &&
          newJ < n &&
          arr[newI * n + newJ] === 0
        ) {
          arr[newI * n + newJ] = x;
          newQueue.push([newI, newJ]);
        }
      }
    }
 
    queue = newQueue;
  }
 
  const [tarI, tarJ] = pos;
  return arr[tarI * n + tarJ];
}
```

### Java算法源码

```
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
    int n = sc.nextInt();
 
    int[] arr = new int[m * n];
    for (int i = 0; i < m * n; i++) {
      arr[i] = sc.nextInt();
    }
 
    int tarI = sc.nextInt();
    int tarJ = sc.nextInt();
 
    System.out.println(getResult(arr, m, n, tarI, tarJ));
  }
 
  public static int getResult(int[] arr, int m, int n, int tarI, int tarJ) {
    LinkedList<Integer[]> queue = new LinkedList<>();
 
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (arr[i * n + j] > 0) {
          queue.addLast(new Integer[] {i, j});
          break;
        }
      }
    }
 
    // 上下左右偏移量
    int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
    while (queue.size() > 0) {
      Integer[] pos = queue.removeFirst();
      int i = pos[0];
      int j = pos[1];
 
      int x = arr[i * n + j] - 1;
 
      if (x == 0) break;
 
      for (int[] offset : offsets) {
        int newI = i + offset[0];
        int newJ = j + offset[1];
 
        if (newI >= 0 && newI < m && newJ >= 0 && newJ < n && arr[newI * n + newJ] == 0) {
          arr[newI * n + newJ] = x;
          queue.addLast(new Integer[] {newI, newJ});
        }
      }
    }
 
    return arr[tarI * n + tarJ];
  }
}
```

### Python算法源码

```
# 输入获取
m, n = map(int, input().split())
arr = list(map(int, input().split()))
pos = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr, m, n, pos):
    queue = []
 
    for i in range(m):
        for j in range(n):
            if arr[i * n + j] > 0:
                queue.append([i, j])
                break
 
    offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))
 
    while len(queue) > 0:
 
        newQueue = []
 
        for i, j in queue:
            x = arr[i * n + j] - 1
 
            if x == 0:
                break
 
            for offsetX, offsetY in offsets:
                newI = i + offsetX
                newJ = j + offsetY
 
                if 0 <= newI < m and 0 <= newJ < n and arr[newI * n + newJ] == 0:
                    arr[newI * n + newJ] = x
                    newQueue.append([newI, newJ])
 
        queue = newQueue
 
    tarI, tarJ = pos
    return arr[tarI * n + tarJ]
 
 
# 算法调用
print(getResult(arr, m, n, pos))
```

