题目描述
存在一个m*n的二维数组，其成员取值范围为0，1，2。

其中值为1的元素具备同化特性，每经过1S，将上下左右值为0的元素同化为1。

而值为2的元素，免疫同化。

将数组所有成员随机初始化为0或2，再将矩阵的[0, 0]元素修改成1，在经过足够长的时间后求矩阵中有多少个元素是0或2（即0和2数量之和）。

输入描述
输入的前两个数字是矩阵大小。后面是数字矩阵内容。

输出描述
返回矩阵中非1的元素个数。

用例
输入	4 4
0 0 0 0
0 2 2 2
0 2 0 0
0 2 0 0
输出	9
说明	
输入数字前两个数字是矩阵大小。后面的数字是矩阵内容。

起始位置(0,0)被修改为1后，最终只能同化矩阵为：

1 1 1 1

1 2 2 2

1 2 0 0

1 2 0 0

所以矩阵中非1的元素个数为9

题目解析
本题可以使用广度优先搜索BFS解决。

关于广度优先搜索，可以看：华为OD机试 - 计算疫情扩散时间（Java & JS & Python）_在一个地图中(地图由n*n个区域组成)_伏城之外的博客-CSDN博客

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let m, n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 1) {
    [m, n] = lines[0].split(" ").map(Number);
  }
 
  if (m && lines.length == m + 1) {
    lines.shift();
 
    const matrix = lines.map((s) => s.split(" ").map(Number));
    matrix[0][0] = 1;
 
    console.log(getResult(m, n, matrix));
  }
});
 
function getResult(m, n, matrix) {
  // 上、下、左、右偏移量
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
 
  // 广搜队列, 初始时只有矩阵[0,0]位置元素为1
  const queue = [[0, 0]];
 
  // count记录矩阵中值为1的元素的个数
  let count = 1;
 
  // 广搜
  while (queue.length > 0) {
    const [x, y] = queue.shift();
 
    for (let offset of offsets) {
      const newX = x + offset[0];
      const newY = y + offset[1];
 
      if (
        newX >= 0 &&
        newX < m &&
        newY >= 0 &&
        newY < n &&
        matrix[newX][newY] == 0
      ) {
        matrix[newX][newY] = 1;
        count++;
        queue.push([newX, newY]);
      }
    }
  }
 
  return m * n - count;
}
```

java

```
import java.util.LinkedList;
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
 
    matrix[0][0] = 1;
 
    System.out.println(getResult(m, n, matrix));
  }
 
  public static int getResult(int m, int n, int[][] matrix) {
    // 上、下、左、右偏移量
    int[][] offsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
 
    // 广搜队列
    LinkedList<int[]> queue = new LinkedList<>();
 
    // 初始时只有矩阵[0,0]位置元素为1
    queue.add(new int[] {0, 0});
 
    // count记录矩阵中值为1的元素的个数
    int count = 1;
 
    // 广搜
    while (queue.size() > 0) {
      int[] pos = queue.removeFirst();
 
      int x = pos[0];
      int y = pos[1];
 
      for (int[] offset : offsets) {
        int newX = x + offset[0];
        int newY = y + offset[1];
 
        if (newX >= 0 && newX < m && newY >= 0 && newY < n && matrix[newX][newY] == 0) {
          matrix[newX][newY] = 1;
          count++;
          queue.add(new int[] {newX, newY});
        }
      }
    }
 
    return m * n - count;
  }
}
```

py

```
# 输入获取
m, n = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(m)]
matrix[0][0] = 1
 
 
# 算法入口
def getResult():
    # 上、下、左、右偏移量
    offsets = ((-1, 0), (1, 0), (0, -1), (0, 1))
 
    # 广搜队列, 初始时只有矩阵[0,0]位置元素为1
    queue = [[0, 0]]
 
    # count记录矩阵中值为1的元素的个数
    count = 1
 
    # 广搜
    while len(queue) > 0:
        x, y = queue.pop(0)
 
        for offset in offsets:
            newX = x + offset[0]
            newY = y + offset[1]
 
            if m > newX >= 0 and n > newY >= 0 and matrix[newX][newY] == 0:
                matrix[newX][newY] = 1
                count += 1
                queue.append([newX, newY])
 
    return m * n - count
 
 
# 算法调用
print(getResult())
```

