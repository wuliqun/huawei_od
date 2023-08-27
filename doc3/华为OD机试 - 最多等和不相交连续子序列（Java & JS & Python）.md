题目描述
给定一个数组，我们称其中连续的元素为连续子序列，称这些元素的和为连续子序列的和。

数组中可能存在几组连续子序列，组内的连续子序列互不相交且有相同的和。

求一组连续子序列，组内子序列的数目最多。

输出这个数目。

输入描述
第一行输入为数组长度N，1<=N<=10^3

第二行为N个用空格分开的整数 Ci，-10^5 <= Ci <= 10^5

输出描述
第一行是一个整数M，表示满足要求的最多的组内子序列的数目。

用例

输入	10
8 8 9 1 9 6 3 9 1 0
输出	4
说明	
四个子序列的第一个元素和最后一个元素的下标分别为

2 2

4 4

5 6

7 7

输入	10
-1 0 4 -3 6 5 -6 5 -7 -3
输出	3
说明	
三个子序列的第一个元素和最后一个元素的下标分别为：

3 3

5 8

9 9

### 题目解析

解题步骤分为两大步：

1、将和相同的连续子序列的区间统计在一起

2、求解每个“和” 下的最大不相交区间数量，保留最大数量作为题解



第一步，我们可以用[动态规划](https://so.csdn.net/so/search?q=动态规划&spm=1001.2101.3001.7020)前缀和的思路求出任意区间的连续子序列的和

求解给定的多个区间的最大不相交区间数量，有固定策略：

假设不相交区间数量为count，则至少为1

1、先将多个区间，按照右边界升序

2、然后取排序后第一个区间的右边界作为 t，并遍历之后的下一个区间[l, r]：

如果 l <= t，则说明当前两个区间有交集，则舍弃遍历的区间，继续遍历下一个区间
如果 l > t，则说明当前两个区间无交集，即不相交，此时 t = r，并且不相交区间数量count++，然后继续下一次遍历
这样最后得到的不相交区间数量count，就是最大不相交区间数量

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
 
  if (lines.length === 2) {
    const n = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, n));
    lines.length = 0;
  }
});
 
function getResult(arr, n) {
  // 记录相同和连续子序列的区间
  const ranges = {};
 
  // 求解arr数组的前缀和数组dp
  const dp = new Array(n).fill(0);
  dp[0] = arr[0];
  for (let i = 1; i < n; i++) {
    dp[i] = dp[i - 1] + arr[i];
  }
 
  // 利用前缀和求差，求出所有连续子序列的和
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (i == 0) {
        const sum = dp[j];
        ranges[sum] ? ranges[sum].push([0, j]) : (ranges[sum] = [[0, j]]);
      } else {
        const sum = dp[j] - dp[i - 1];
        ranges[sum] ? ranges[sum].push([i, j]) : (ranges[sum] = [[i, j]]);
      }
    }
  }
 
  // 求出所有连续子序列的和
  // for (let i = 0; i < n; i++) {
  //   let sum = arr[i];
  //   ranges[sum] ? ranges[sum].push([i, i]) : (ranges[sum] = [[i, i]]);
  //   for (let j = i + 1; j < n; j++) {
  //     sum += arr[j];
  //     ranges[sum] ? ranges[sum].push([i, j]) : (ranges[sum] = [[i, j]]);
  //   }
  // }
 
  // console.log(ranges);
  // console.log("------------------------------");
 
  // 保存相同和不相交连续子序列的最大个数
  let max = 0;
  for (let sum in ranges) {
    max = Math.max(max, disjoint(ranges[sum]));
  }
 
  return max;
}
 
// 求不相交区间的最大个数
function disjoint(ranges) {
  let count = 1; // 至少一个
  ranges.sort((a, b) => a[1] - b[1]);
 
  // console.log(ranges);
 
  let t = ranges[0][1];
  for (let i = 1; i < ranges.length; i++) {
    let [l, r] = ranges[i];
    if (t < l) {
      count++;
      t = r;
    }
  }
 
  return count;
}
```

### Java算法源码

```
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }
 
    System.out.println(getResult(arr, n));
  }
 
  public static int getResult(int[] arr, int n) {
    // 记录相同和连续子序列的区间
    HashMap<Integer, ArrayList<Integer[]>> ranges = new HashMap<>();
 
    // 求解arr数组的前缀和数组dp
    int[] dp = new int[n];
    dp[0] = arr[0];
    for (int i = 1; i < n; i++) {
      dp[i] = dp[i - 1] + arr[i];
    }
 
    // 利用前缀和求差，求出所有连续子序列的和
    for (int i = 0; i < n; i++) {
      for (int j = i; j < n; j++) {
        if (i == 0) {
          int sum = dp[j];
          ranges.putIfAbsent(sum, new ArrayList<>());
          ranges.get(sum).add(new Integer[] {0, j});
        } else {
          int sum = dp[j] - dp[i - 1];
          ranges.putIfAbsent(sum, new ArrayList<>());
          ranges.get(sum).add(new Integer[] {i, j});
        }
      }
    }
 
    //    for (int i = 0; i < n; i++) {
    //      int sum = arr[i];
    //      ranges.putIfAbsent(sum, new ArrayList<>());
    //      ranges.get(sum).add(new Integer[] {i, i});
    //
    //      for (int j = i + 1; j < n; j++) {
    //        sum += arr[j];
    //        ranges.putIfAbsent(sum, new ArrayList<>());
    //        ranges.get(sum).add(new Integer[] {i, j});
    //      }
    //    }
 
    // 保存相同和不相交连续子序列的最大个数
    int max = 0;
    for (Integer key : ranges.keySet()) {
      ArrayList<Integer[]> range = ranges.get(key);
      max = Math.max(max, disjoint(range));
    }
 
    return max;
  }
 
  //  求不相交区间的最大个数
  public static int disjoint(ArrayList<Integer[]> ranges) {
    int count = 1; // 至少一个
    ranges.sort((a, b) -> a[1] - b[1]);
 
    Integer t = ranges.get(0)[1];
    for (int i = 1; i < ranges.size(); i++) {
      Integer[] range = ranges.get(i);
      Integer l = range[0];
      Integer r = range[1];
 
      if (t < l) {
        count++;
        t = r;
      }
    }
    return count;
  }
}
```

### Python算法源码

```
# 输入获取
n = int(input())
arr = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr, n):
    # 记录相同和连续子序列的区间
    rans = {}
 
    # 求解arr数组的前缀和数组dp
    dp = [0] * n
    dp[0] = arr[0]
    for i in range(1, n):
        dp[i] = dp[i - 1] + arr[i]
 
    # 利用前缀和求差，求出所有连续子序列的和
    for i in range(n):
        for j in range(i, n):
            if i == 0:
                sumV = dp[j]
                if rans.get(sumV) is None:
                    rans[sumV] = []
                rans[sumV].append([0, j])
            else:
                sumV = dp[j] - dp[i - 1]
                if rans.get(sumV) is None:
                    rans[sumV] = []
                rans[sumV].append([i, j])
 
    # 求出所有连续子序列的和
    # for i in range(n):
    #     sumV = arr[i]
    #     if rans.get(sumV) is None:
    #         rans[sumV] = [[i, i]]
    #     else:
    #         rans[sumV].append([i, i])
    #
    #     for j in range(i+1, n):
    #         sumV += arr[j]
    #         if rans.get(sumV) is None:
    #             rans[sumV] = [[i,j]]
    #         else:
    #             rans[sumV].append([i, j])
 
    # 保存相同和不相交连续子序列的最大个数
    maxV = 0
    for sumV in rans.keys():
        maxV = max(maxV, disjoint(rans[sumV]))
 
    return maxV
 
 
# 求不相交区间的最大个数
def disjoint(rans):
    count = 1  # 至少一个
    rans.sort(key=lambda x: x[1])
 
    t = rans[0][1]
    for i in range(len(rans)):
        l, r = rans[i]
        if t < l:
            count += 1
            t = r
 
    return count
 
 
# 算法调用
print(getResult(arr, n))
```

