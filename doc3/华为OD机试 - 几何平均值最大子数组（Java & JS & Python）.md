题目描述


从一个长度为N的正数数组numbers中找出长度至少为L且几何平均值最大子数组，并输出其位置和大小。（K个数的几何平均值为K个数的乘积的K次方根）

若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。

若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。

输入描述
第一行输入为N、L

N表示numbers的大小（1 ≤ N ≤ 100000）
L表示子数组的最小长度（1 ≤ L ≤ N）
之后N行表示numbers中的N个数，每个一行（10^-9 ≤ numbers[i] ≤ 10^9）

输出描述
输出子数组的位置（从0开始计数）和大小，中间用一个空格隔开。

备注
用例保证除几何平均值为最大值的子数组外，其他子数组的几何平均值至少比最大值小10^-10倍

用例

输入	3 2
2
2
3
输出	1 2
说明	长度至少为2的子数组共三个，分别是{2,2}、{2,3}、{2,2,3}，其中{2,3}的几何平均值最大，故输出其位置1和长度2
输入	10 2
0.2
0.1
0.2
0.2
0.2
0.1
0.2
0.2
0.2
0.2
输出	2 2
说明	有多个长度至少为2的子数组的几何平均值为0.2，其中长度最短的为2，也有多个，长度为2且几何平均值为0.2的子数组最前面的那个为从第二个数开始的两个0.2组成的子数组

题目解析
本题其实就是 LeetCode - 644 子数组最大平均数 II_伏城之外的博客-CSDN博客

的变种题。但是本题更难。

建议大家先把leetcode 644 这题做会了，再来看本题。

本题和leetcode 644的区别在于，leetcode 644求解的长度大于等于k的 最大算术平均值 的连续子序列，而本题求解的是 长度大于等于k的 最大几何平均值 的连续子序列。

一个数组的nums = [a1, a2, a3, ..., aN]的

算术平均值 = (a1 + a2 + a3 + ... + aN) / N
几何平均值 = N √(a1 * a2 * a3 * .... * aN) 
因此，在求解 长度大于等于k 的子序列时，我们不能在沿用leetcode 644的解法，leetcode 644解法如下

首先，求出 0~i 子序列的和 sum

然后，求出 0~0  到  0~i-k  中所有子序列的最小和 min_pre_sum

最后，sum - min_pre_sum >= 0的话，说明midVal可能取小了

本题需要换成除法

首先，求出 0~i 子序列的所有元素乘积 fact

然后，求出 0~0 到 0~i-k 中所有子序列的最小乘积 min_pre_fact

最后，fact / min_pre_fact >= 1的话，说明midVal可能取小了

原理如下：有一个数组nums = [a1, a2, a3, ..., aN]，假设其几何平均值为avg，则有等式如下：

N √ （a1 * a2 * a3 * ... * aN） == avg

再转换一下，如下：

a1 * a2 * a3 * ... * aN == avg ^ N

再转换一下，如下：

(a1 / avg) * (a2 / avg) * (a3 / avg) * ... * (aN / avg) == 1

如果avg取大了，则 (a1 / avg) * (a2 / avg) * (a3 / avg) * ... * (aN / avg)  < 1

如果avg取小了，则 (a1 / avg) * (a2 / avg) * (a3 / avg) * ... * (aN / avg)  > 1

另外，本题需要输出最大几何平均值对应的子数组的起始位置和长度，这个很简单，只需要记录每次被挖去的最小平均值子数组的结尾索引即可

2023.04.09 根据网友指正，本题之前的解法没有考虑：存在多个最大几何平均值的子数组的情况，比如用例2，就有多个最大几何平均值，下面用JS通过暴力解法，求出所有子数组的几何平均值

比如 [2, 2, '0.200000000000'] 的含义就是：起点索引2，长度2，的子数组的几何平均值就是0.2

因此，基于上面算法，当我们可以保存最后一轮二分求得的avg对应的：所有子数组的起点和长度（保存进ans），然后进行排序：先按照长度（较短者排前面），再按照起点（靠前者排在前面）、

JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n, l;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [n, l] = lines[0].split(" ").map(Number);
  }
 
  if (n && lines.length === n + 1) {
    const numbers = lines.slice(1).map((line) => Number(line));
    console.log(getResult(n, l, numbers));
    lines.length = 0;
  }
});
 
function getResult(n, l, numbers) {
  const sorted_numbers = numbers.slice().sort((a, b) => a - b);
  let minAvg = sorted_numbers.at(0);
  let maxAvg = sorted_numbers.at(-1);
  // const diff = maxAvg / Math.pow(10, 10);
 
  let ans = [];
 
  // 其他子数组的几何平均值至少比最大值小10^-10倍
  while (maxAvg - minAvg >= maxAvg / Math.pow(10, 10)) {
    // 不保留历史avg对应的ans，只保留最后一个avg，即最大avg的ans
    ans = [];
    let midAvg = (minAvg + maxAvg) / 2;
 
    if (check(n, l, numbers, midAvg, ans)) {
      minAvg = midAvg;
    } else {
      maxAvg = midAvg;
    }
  }
 
  // 若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。
  // 若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。
  ans.sort((a, b) => (a[1] != b[1] ? a[1] - b[1] : a[0] - b[0]));
 
  return ans[0].join(" ");
}
 
function check(n, l, numbers, avg, ans) {
  // 该flag为True表示avg取小了，为False表示avg取大了，默认为False
  let flag = false;
  let fact = 1;
 
  for (let i = 0; i < l; i++) {
    fact *= numbers[i] / avg;
  }
 
  if (fact >= 1) {
    flag = true;
    // ans的元素含义：[目标子数组起始位置，目标子数组长度]
    ans.push([0, l]);
  }
 
  let pre_fact = 1;
  let min_pre_fact = Infinity;
  let min_pre_fact_end = 0;
 
  for (let i = l; i < n; i++) {
    fact *= numbers[i] / avg; // 对应0~i区间
    pre_fact *= numbers[i - l] / avg; // 对应0~i-l区间
 
    if (pre_fact < min_pre_fact) {
      min_pre_fact = pre_fact; // 对应0~i-l区间内 几何平均值最小的子数列
      min_pre_fact_end = i - l;
    }
 
    if (fact / min_pre_fact >= 1) {
      flag = true;
      // ans的元素含义：[目标子数组起始位置，目标子数组长度]
      ans.push([min_pre_fact_end + 1, i - min_pre_fact_end]);
    }
  }
 
  return flag;
}
```

### Java算法源码

```java
import java.util.ArrayList;
import java.util.Objects;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
    int l = sc.nextInt();
 
    double[] numbers = new double[n];
    for (int i = 0; i < n; i++) {
      numbers[i] = sc.nextDouble();
    }
 
    System.out.println(getResult(n, l, numbers));
  }
 
  public static String getResult(int n, int l, double[] numbers) {
    double minAvg = Integer.MAX_VALUE;
    double maxAvg = Integer.MIN_VALUE;
    for (double num : numbers) {
      minAvg = Math.min(num, minAvg);
      maxAvg = Math.max(num, maxAvg);
    }
 
    //    double diff = maxAvg / Math.pow(10, 10);
 
    ArrayList<Integer[]> ans = new ArrayList<>();
 
    // 其他子数组的几何平均值至少比最大值小10^-10倍
    while (maxAvg - minAvg >= maxAvg / Math.pow(10, 10)) {
      // 不保留历史avg对应的ans，只保留最后一个avg，即最大avg的ans
      ans = new ArrayList<>();
      double midAvg = (minAvg + maxAvg) / 2;
 
      if (check(n, l, numbers, midAvg, ans)) {
        minAvg = midAvg;
      } else {
        maxAvg = midAvg;
      }
    }
 
    // 若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。
    // 若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。
    ans.sort((a, b) -> !Objects.equals(a[1], b[1]) ? a[1] - b[1] : a[0] - b[0]);
 
    Integer[] tmp = ans.get(0);
    return tmp[0] + " " + tmp[1];
  }
 
  public static boolean check(
      int n, int l, double[] numbers, double avg, ArrayList<Integer[]> ans) {
    // 该flag为True表示avg取小了，为False表示avg取大了，默认为False
    boolean flag = false;
    double fact = 1;
 
    for (int i = 0; i < l; i++) {
      fact *= numbers[i] / avg;
    }
 
    if (fact >= 1) {
      flag = true;
      // ans的元素含义：[目标子数组起始位置，目标子数组长度]
      ans.add(new Integer[] {0, l});
    }
 
    double pre_fact = 1;
    double min_pre_fact = Integer.MAX_VALUE;
    int min_pre_fact_end = 0;
 
    for (int i = l; i < n; i++) {
      fact *= numbers[i] / avg; // 对应0~i区间
      pre_fact *= numbers[i - l] / avg; // 对应0~i-l区间
 
      if (pre_fact < min_pre_fact) {
        min_pre_fact = pre_fact; // 对应0~i-l区间内 几何平均值最小的子数列
        min_pre_fact_end = i - l;
      }
 
      if (fact / min_pre_fact >= 1) {
        flag = true;
        // ans的元素含义：[目标子数组起始位置，目标子数组长度]
        ans.add(new Integer[] {min_pre_fact_end + 1, i - min_pre_fact_end});
      }
    }
 
    return flag;
  }
}
```

### Python算法源码

```python
import sys
 
# 输入获取
n, l = map(int, input().split())
numbers = [float(input()) for i in range(n)]
 
 
# 算法入口
def getResult(n, l, numbers):
    minAvg = min(numbers)
    maxAvg = max(numbers)
    # diff = maxAvg / 10 ** 10
 
    ans = []
 
    # 其他子数组的几何平均值至少比最大值小10^-10倍
    while maxAvg - minAvg >= maxAvg / 10 ** 10:
        # 不保留历史avg对应的ans，只保留最后一个avg，即最大avg的ans
        ans = []
        midAvg = (minAvg + maxAvg) / 2
 
        if check(n, l, numbers, midAvg, ans):
            minAvg = midAvg
        else:
            maxAvg = midAvg
 
    # 若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。
    # 若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。
    ans.sort(key=lambda x: (x[1], x[0]))
    return " ".join(map(str, ans[0]))
 
 
def check(n, l, numbers, avg, ans):
    # 该flag为True表示avg取小了，为False表示avg取大了，默认为False
    flag = False
    fact = 1
 
    for i in range(l):
        fact *= numbers[i] / avg
 
    if fact >= 1:
        flag = True
        # ans的元素含义：[目标子数组起始位置，目标子数组长度]
        ans.append([0, l])
 
    pre_fact = 1
    min_pre_fact = sys.maxsize
    min_pre_fact_end = 0
 
    for i in range(l, n):
        fact *= numbers[i] / avg  # 对应0~i区间
        pre_fact *= numbers[i - l] / avg  # 对应0~i-l区间
 
        if pre_fact < min_pre_fact:
            min_pre_fact = pre_fact  # 对应0~i-l区间内 几何平均值最小的子数列
            min_pre_fact_end = i - l
 
        if fact / min_pre_fact >= 1:
            flag = True
            # ans的元素含义：[目标子数组起始位置，目标子数组长度]
            ans.append([min_pre_fact_end + 1, i - min_pre_fact_end])
 
    return flag
 
 
# 算法调用
print(getResult(n, l, numbers))
```