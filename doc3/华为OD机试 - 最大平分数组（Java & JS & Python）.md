题目描述
给定一个数组nums，可以将元素分为若干个组，使得每组和相等，求出满足条件的所有分组中，最大的平分组个数。

输入描述
第一行输入 m
接着输入m个数，表示此数组
数据范围:1<=M<=50, 1<=nums[i]<=50

输出描述
最大的平分组数个数

用例

输入	7
4 3 2 3 5 2 1
输出	4
说明	
可以等分的情况有：

4 个子集（5），（1,4），（2,3），（2,3）

2 个子集（5, 1, 4），（2,3, 2,3）

最大的平分组数个数为4个。

输入	9
5 2 1 5 2 1 5 2 1
输出	4
说明	
可以等分的情况有：

4 个子集（5，1），（5，1），（5，1），（2，2，2）

2 个子集（5, 1, 5,1），（2,2, 2,5,1）

最大的平分组数个数为4个。

### 题目解析

题解请看leetcode划分划分k个相等子集。

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
    const m = lines[0] - 0;
    const arr = lines[1].split(" ").map(Number);
 
    console.log(getResutlt(m, arr));
 
    lines.length = 0;
  }
});
 
function getResutlt(m, arr) {
  const sum = arr.sort((a, b) => b - a).reduce((p, c) => p + c);
 
  let maxCount = m;
 
  while (maxCount >= 1) {
    if (canPartition([...arr], sum, maxCount)) {
      return maxCount;
    } else {
      maxCount--;
    }
  }
}
 
function canPartition(arr, sum, maxCount) {
  if (sum % maxCount) return false;
 
  const subSum = sum / maxCount;
 
  if (subSum < arr[0]) return false;
 
  while (arr[0] === subSum) {
    arr.shift();
    maxCount--;
  }
 
  const buckets = new Array(maxCount).fill(0);
 
  return partition(0, arr, subSum, buckets);
}
 
function partition(start, arr, subSum, buckets) {
  if (start === arr.length) return true;
 
  const select = arr[start];
 
  for (let i = 0; i < buckets.length; i++) {
    if (i > 0 && buckets[i] === buckets[i - 1]) continue;
 
    if (buckets[i] + select <= subSum) {
      buckets[i] += select;
      if (partition(start + 1, arr, subSum, buckets)) return true;
      buckets[i] -= select;
    }
  }
 
  return false;
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
 
    LinkedList<Integer> link = new LinkedList<>();
    for (int i = 0; i < m; i++) {
      link.add(sc.nextInt());
    }
 
    System.out.println(getResult(link, m));
  }
 
  public static int getResult(LinkedList<Integer> link, int m) {
    link.sort((a, b) -> b - a);
 
    int sum = 0;
    for (Integer ele : link) {
      sum += ele;
    }
 
    while (m >= 1) {
      LinkedList<Integer> link_cp = new LinkedList<>(link);
      if (canPartitionMSubsets(link_cp, sum, m)) return m;
      m--;
    }
 
    return 1;
  }
 
  public static boolean canPartitionMSubsets(LinkedList<Integer> link, int sum, int m) {
    if (sum % m != 0) return false;
 
    int subSum = sum / m;
 
    if (subSum < link.get(0)) return false;
 
    //    while (link.get(0) == subSum) {
    while (link.size() > 0 && link.get(0) == subSum) {
      link.removeFirst();
      m--;
    }
 
    int[] buckets = new int[m];
    return partition(link, 0, buckets, subSum);
  }
 
  public static boolean partition(LinkedList<Integer> link, int index, int[] buckets, int subSum) {
    if (index == link.size()) return true;
 
    int select = link.get(index);
 
    for (int i = 0; i < buckets.length; i++) {
      if (i > 0 && buckets[i] == buckets[i - 1]) continue;
      if (select + buckets[i] <= subSum) {
        buckets[i] += select;
        if (partition(link, index + 1, buckets, subSum)) return true;
        buckets[i] -= select;
      }
    }
 
    return false;
  }
}
```

### Python算法源码

```
# 输入获取
m = int(input())
link = list(map(int, input().split()))
 
 
# 算法入口
def getResult(link, m):
    link.sort(reverse=True)
 
    sumV = 0
    for ele in link:
        sumV += ele
 
    while m >= 1:
        if canPartitionMSubsets(link[:], sumV, m):
            return m
        m -= 1
 
 
def canPartitionMSubsets(link, sumV, m):
    if sumV % m != 0:
        return False
 
    subSum = sumV / m
 
    if subSum < link[0]:
        return False
 
    while len(link) > 0 and link[0] == subSum:
        link.pop(0)
        m -= 1
 
    buckets = [0] * m
 
    return partition(link, 0, buckets, subSum)
 
 
def partition(link, index, buckets, subSum):
    if index == len(link):
        return True
 
    select = link[index]
 
    for i in range(len(buckets)):
        if i > 0 and buckets[i] == buckets[i - 1]:
            continue
 
        if select + buckets[i] <= subSum:
            buckets[i] += select
            if partition(link, index + 1, buckets, subSum):
                return True
            buckets[i] -= select
 
    return False
 
 
# 算法调用
print(getResult(link, m))
```

