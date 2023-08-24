题目描述
某长方形停车场，每个车位上方都有对应监控器，当且仅当在当前车位或者前后左右四个方向任意一个车位范围停车时，监控器才需要打开；

给出某一时刻停车场的停车分布，请统计最少需要打开多少个监控器；

输入描述
第一行输入m，n表示长宽，满足1 < m,n <= 20；

后面输入m行，每行有n个0或1的整数，整数间使用一个空格隔开，表示该行已停车情况，其中0表示空位，1表示已停；

输出描述
最少需要打开监控器的数量；

用例
输入	3 3
0 0 0
0 1 0
0 0 0
输出	5
说明	无
题目解析
本题题意比较难以理解，但是画一幅图给大家看下就懂了

![image-20230619182511798](https://i.postimg.cc/0N7Y1MfX/image.png)

停车（1）的位置必须要打开监控器，另外停车位置的上下左右位置（1或0）的监控器也要打开，问最终需要打开多少个监控器？

即，求解上面图示种有颜色的格子数量。



### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const rl = require("readline").createInterface({
  input: process.stdin,
});
 
const lines = [];
let m, n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [m, n] = lines[0].split(" ").map(Number);
  }
 
  if (m && lines.length == m + 1) {
    lines.shift();
    const matrix = lines.map((line) => line.split(" ").map(Number));
    console.log(getResult(matrix, m, n));
    lines.length = 0;
  }
});
 
function getResult(matrix, m, n) {
  let count = 0;
 
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
 
  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (matrix[x][y] === 1) {
        count++;
        continue;
      }
 
      for (let [offsetX, offsetY] of offsets) {
        const newX = x + offsetX;
        const newY = y + offsetY;
 
        if (
          newX >= 0 &&
          newX < m &&
          newY >= 0 &&
          newY < n &&
          matrix[newX][newY] === 1
        ) {
          count++;
          break;
        }
      }
    }
  }
 
  return count;
}
```

### Java算法源码

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
    int n = sc.nextInt();
 
    int[][] matrix = new int[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        matrix[i][j] = sc.nextInt();
      }
    }
 
    System.out.println(getResult(m, n, matrix));
  }
 
  public static int getResult(int m, int n, int[][] matrix) {
    int count = 0;
    int[][] offsets = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};
 
    for (int x = 0; x < m; x++) {
      for (int y = 0; y < n; y++) {
        if (matrix[x][y] == 1) {
          count++;
          continue;
        }
 
        for (int[] offset : offsets) {
          int newX = x + offset[0];
          int newY = y + offset[1];
 
          if (newX >= 0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] == 1) {
            count++;
            break;
          }
        }
      }
    }
 
    return count;
  }
}
```

### Python算法源码

```python
# 输入获取
m, n = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(m)]
 
 
# 算法入口
def getResult():
    count = 0
 
    offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))
 
    for x in range(m):
        for y in range(n):
            if matrix[x][y] == 1:
                count += 1
                continue
 
            for offsetX, offsetY in offsets:
                newX = x + offsetX
                newY = y + offsetY
 
                if m > newX >= 0 and n > newY >= 0 and matrix[newX][newY] == 1:
                    count += 1
                    break
 
    return count
 
 
# 算法调用
print(getResult())
```