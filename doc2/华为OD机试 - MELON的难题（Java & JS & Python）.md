题目描述
MELON有一堆精美的雨花石（数量为n，重量各异），准备送给S和W。MELON希望送给俩人的雨花石重量一致，请你设计一个程序，帮MELON确认是否能将雨花石平均分配。

输入描述
第1行输入为雨花石个数：n， 0 < n < 31。

第2行输入为空格分割的各雨花石重量：m[0] m[1] ….. m[n - 1]， 0 < m[k] < 1001。

不需要考虑异常输入的情况。

输出描述
如果可以均分，从当前雨花石中最少拿出几块，可以使两堆的重量相等；如果不能均分，则输出-1。

用例
输入	4
1 1 2 2
输出	2
说明	
输入第一行代表共4颗雨花石，

第二行代表4颗雨花石重量分别为1、1、2、2。 

均分时只能分别为1,2，需要拿出重量为1和2的两块雨花石，所以输出2。

输入	10
1 1 1 1 1 9 8 3 7 10
输出	3
说明	
输入第一行代表共10颗雨花石，

第二行代表4颗雨花石重量分别为1、1、1、1、1、9、8、3、7、10 。 

均分时可以1,1,1,1,1,9,7和10,8,3，也可以1,1,1,1,9,8和10,7,3,1，或者其他均分方式，但第一种只需要拿出重量为10,8,3的3块雨花石，第二种需要拿出4块，所以输出3(块数最少)。

题目解析
我的解题思路如下：

首先，将所有雨花石重量之和求出，设为sum，

如果sum % 2 != 0，则说明无法平分，直接返回-1。
如果sum % 2 == 0，则说明“可能”平分。
如果“可能”平分，此时，我们可以将本问题转化为：01背包问题中“装满背包的最少物品数问题”。

其中：

背包承重 = sum / 2
物品 = 所有雨花石
物品重量 = 雨花石重量
如果大家学习过01背包，其实状态转移方程非常容易推导：

（ps：如果没有学习过，则可以先看下算法设计 - 01背包问题_01背包算法_伏城之外的博客-CSDN博客）

我们假设dp[i][j] 表示从 0 ~ i 物品中选择，能装满背包承重 j 的最少物品数量。那么：

如果第 i 个物品（重量为w）选择的话，则 dp[i][j] = dp[i-1][j - w] + 1；（ps：+1代表背包装入了第i个物品）
如果第 i 个物品不选的话，则 dp[i][j] = dp[i-1][j]；
最终 dp[i][j] 取最小值即可，即：dp[i][j] = min(dp[i-1][j]，dp[i-1][j - w] + 1)

另外，我们需要注意dp的初始化，因为后面要求最少物品数量，因此如果将dp[0][0] ~ dp[0][bag] 初始化为0，则会影响后续取最小值（ps：0必然是最少的数量）。

因为我们应该将dp[0][0] ~ dp[0][bag]初始化为一个不可能的较大值，这里由于背包承重是sum/2，因此背包绝对不可能装入 n 个雨花石，因为n个雨花石的重量之和为sum。

JS算法源码

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
 
  if (lines.length == 2) {
    const n = parseInt(lines[0]);
    const nums = lines[1].split(" ").map(Number);
    console.log(getResult(n, nums));
    lines.length = 0;
  }
});
 
function getResult(n, nums) {
  // 所有雨花石重量之和
  const sum = nums.reduce((a, b) => a + b);
 
  // 如果重量之和不能整除2，则必然无法平分
  if (sum % 2 != 0) return -1;
 
  // 背包承重
  const bag = sum / 2;
 
  // 二维数组
  const dp = new Array(n + 1).fill(0).map(() => new Array(bag + 1).fill(0));
 
  // 初始化第一行，n是一个不可能的装满背包的物品数量
  for (let i = 0; i <= bag; i++) dp[0][i] = n;
 
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 1; j <= bag; j++) {
      if (j < num) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - num] + 1);
      }
    }
  }
 
  // 如果装满背包的最少物品数为n, 则说明没有平分方案，因为n个雨花石的重量之和为sumV，而背包的承重是bag = sumV // 2
  if (dp[n][bag] == n) {
    return -1;
  } else {
    return dp[n][bag];
  }
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = Integer.parseInt(sc.nextLine());
    int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
 
    System.out.println(getResult(n, nums));
  }
 
  public static int getResult(int n, int[] nums) {
    // 所有雨花石重量之和
    int sum = Arrays.stream(nums).sum();
 
    // 如果重量之和不能整除2，则必然无法平分
    if (sum % 2 != 0) return -1;
 
    // 背包承重
    int bag = sum / 2;
 
    // 二维数组
    int[][] dp = new int[n + 1][bag + 1];
 
    // 初始化第一行，n是一个不可能的装满背包的物品数量
    for (int i = 0; i <= bag; i++) {
      dp[0][i] = n;
    }
 
    for (int i = 1; i <= n; i++) {
      int num = nums[i - 1];
      for (int j = 1; j <= bag; j++) {
        if (j < num) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - num] + 1);
        }
      }
    }
 
    // 如果装满背包的最少物品数为n, 则说明没有平分方案，因为n个雨花石的重量之和为sumV，而背包的承重是bag = sumV // 2
    if (dp[n][bag] == n) {
      return -1;
    } else {
      return dp[n][bag];
    }
  }
}
```

py

```
# 输入获取
n = int(input())
nums = list(map(int, input().split()))
 
 
# 算法入口
def getResult():
    # 所有雨花石重量之和
    sumV = sum(nums)
 
    # 如果重量之和不能整除2，则必然无法平分
    if sumV % 2 != 0:
        return -1
 
    # 背包承重
    bag = sumV // 2
 
    # 二维数组
    dp = [[0] * (bag + 1) for _ in range(n + 1)]
 
    # 初始化第一行，n是一个不可能的装满背包的物品数量
    for i in range(bag + 1):
        dp[0][i] = n
 
    for i in range(1, n + 1):
        num = nums[i - 1]
        for j in range(1, bag + 1):
            if j < num:
                dp[i][j] = dp[i - 1][j]
            else:
                dp[i][j] = min(dp[i - 1][j], dp[i - 1][j - num] + 1)
 
    # 如果装满背包的最少物品数为n, 则说明没有平分方案，因为n个雨花石的重量之和为sumV，而背包的承重是bag = sumV // 2
    if dp[n][bag] == n:
        return -1
    else:
        return dp[n][bag]
 
 
# 算法调用
print(getResult())
```

