题目描述
有一名科学家想要从一台古董电脑中拷贝文件到自己的电脑中加以研究。

但此电脑除了有一个3.5寸软盘驱动器以外，没有任何手段可以将文件持贝出来，而且只有一张软盘可以使用。

因此这一张软盘是唯一可以用来拷贝文件的载体。

科学家想要尽可能多地将计算机中的信息拷贝到软盘中，做到软盘中文件内容总大小最大。

已知该软盘容量为1474560字节。文件占用的软盘空间都是按块分配的，每个块大小为512个字节。一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术。

输入描述
第1行为一个整数N，表示计算机中的文件数量。1 ≤ N ≤ 1000.
接下来的第2行到第N+1行(共N行)，每行为一个整数，表示每个文件的大小Si，单位为字节。

0 ≤ i < N,0 ≤ Si

输出描述
科学家最多能拷贝的文件总大小

备注
为了充分利用软盘空间，将每个文件在软盘上占用的块记录到本子上。即真正占用软盘空间的只有文件内容本身。

用例
输入	3
737270
737272
737288
输出	1474542
说明	3个文件中，每个文件实际占用的大小分别为737280字节、737280字节、737792字节。
只能选取前两个文件，总大小为1474542字节。虽然后两个文件总大小更大且未超过1474560字节，但因为实际占用的大小超过了1474560字节，所以不能选后两个文件。
输入	6
400000
200000
200000
200000
400000
400000
输出	1400000
说明	
从6个文件中，选择3个大小为400000的文件和1个大小为200000的文件，得到最大总大小为1400000。

也可以选择2个大小为400000的文件和3个大小为200000的文件，得到的总大小也是1400000

题目解析
本题可以当成01背包问题来求解。

本题中：

软盘容量为1474560字节  → 背包承重
文件  →  物品
文件容量  → 物品价值
ceil(文件容量 / 512.0) * 512  → 物品重量
其中，关于物品重量取值的说明：

文件占用的软盘空间都是按块分配的，每个块大小为512个字节。一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术。

这段话的意思是，比如一个文件的大小是513个字节，此时他需要占用软盘的容量不是513字节，而是需要占用两个块，即：2 * 512字节的大小。

但是最终该文件只有513字节大小。

另外，本题中，背包承重和物品重量可以将单位从：字节，优化为：块（512字节每块）

这样的话，可以降低dp数组的长度定义。

而物品的价值只能保持为字节，因为题目最后要求返回的是总字节大小。

Java算法源码
01背包二维数组解法

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
 
    System.out.println(getResult(n, arr));
  }
 
  public static int getResult(int n, int[] arr) {
    int bag = 1474560 / 512; // 背包承重（块）
 
    int[][] dp = new int[n + 1][bag + 1];
 
    for (int i = 1; i <= n; i++) {
      int weight = (int) Math.ceil(arr[i - 1] / 512.0); // 物品的重量（块）
      int worth = arr[i - 1]; // 物品的价值（字节）
      for (int j = 0; j <= bag; j++) {
        if (weight > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + worth);
        }
      }
    }
 
    return dp[n][bag];
  }
}
```

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
 
    System.out.println(getResult(n, arr));
  }
 
  public static int getResult(int n, int[] arr) {
    int bag = 1474560 / 512; // 背包承重（块）
 
    int[] dp = new int[bag + 1];
 
    for (int i = 0; i < n; i++) {
      int weight = (int) Math.ceil(arr[i] / 512.0); // 物品的重量（块）
      int worth = arr[i]; // 物品的价值（字节）
      for (int j = bag; j >= weight; j--) {
        dp[j] = Math.max(dp[j], dp[j - weight] + worth);
      }
    }
 
    return dp[bag];
  }
}
```

### JS算法源码

01背包二维数组解法

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
 
  if (lines.length == 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length == n + 1) {
    lines.shift();
 
    const arr = lines.map(Number);
    console.log(getResult(n, arr));
 
    lines.length = 0;
  }
});
 
function getResult(n, arr) {
  const bag = 1474560 / 512; // 背包承重（块）
 
  const dp = new Array(n + 1).fill(0).map(() => new Array(bag + 1).fill(0));
 
  for (let i = 1; i <= n; i++) {
    const weight = Math.ceil(arr[i - 1] / 512); // 物品的重量（块）
    const worth = arr[i - 1]; // 物品的价值（字节）
    for (let j = 0; j <= bag; j++) {
      if (weight > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + worth);
      }
    }
  }
 
  return dp[n][bag];
}
```

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
 
  if (lines.length == 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length == n + 1) {
    lines.shift();
 
    const arr = lines.map(Number);
    console.log(getResult(n, arr));
 
    lines.length = 0;
  }
});
 
function getResult(n, arr) {
  const bag = 1474560 / 512; // 背包承重（块）
 
  const dp = new Array(bag + 1).fill(0);
 
  for (let i = 0; i < n; i++) {
    const weight = Math.ceil(arr[i] / 512); // 物品的重量（块）
    const worth = arr[i]; // 物品的价值（字节）
    for (let j = bag; j >= weight; j--) {
      dp[j] = Math.max(dp[j], dp[j - weight] + worth);
    }
  }
 
  return dp[bag];
}
```

### Python算法源码

01背包二维数组解法

```
# 输入获取
import math
 
n = int(input())
arr = [int(input()) for _ in range(n)]
 
 
# 算法入口
def getResult():
    bag = 1474560 // 512  # 背包承重（块）
 
    dp = [[0]*(bag+1) for _ in range(n+1)]
 
    for i in range(1, n+1):
        weight = math.ceil(arr[i-1] / 512.0)  # 物品的重量（块）
        worth = arr[i-1]  # 物品的价值（字节）
        for j in range(bag+1):
            if weight > j:
                dp[i][j] = dp[i-1][j]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight] + worth)
 
    return dp[n][bag]
 
 
# 算法调用
print(getResult())
```

```
# 输入获取
import math
 
n = int(input())
arr = [int(input()) for _ in range(n)]
 
 
# 算法入口
def getResult():
    bag = 1474560 // 512  # 背包承重（块）
 
    dp = [0]*(bag+1)
 
    for i in range(n):
        weight = math.ceil(arr[i] / 512.0)  # 物品的重量（块）
        worth = arr[i]  # 物品的价值（字节）
        for j in range(bag, weight-1, -1):
            dp[j] = max(dp[j], dp[j-weight] + worth)
 
    return dp[bag]
 
 
# 算法调用
print(getResult())
```

