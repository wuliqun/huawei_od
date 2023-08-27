题目描述
如果一个数组中出现次数最多的元素出现大于等于K次，被称为 k-优雅数组 ，k也可以被称为优雅阈值。
例如，数组1，2，3，1、2，3，1，它是一个3-优雅数组，因为元素1出现次数大于等于3次，
数组[1, 2, 3, 1, 2]就不是一个3-优雅数组，因为其中出现次数最多的元素是1和2，只出现了2次。

给定一个数组A和k，请求出A有多少子数组是k-优雅子数组。

子数组是数组中一个或多个连续元素组成的数组。

例如，数组[1,2,3,4]包含10个子数组，分别是：
[1], [1,2], [1,2,3], [1,2,3,4], [2], [2,3], [2,3,4], [3], [3, 4], [4]。

输入描述
第一行输入两个数字，以空格隔开，含义是：A数组长度 k值

第二行输入A数组元素，以空格隔开

输出描述
输出A有多少子数组是k-优雅子数组

用例

| 输入 | 7 3 1 2 3 1 2 3 1 |
| ---- | ----------------- |
| 输出 | 1                 |
| 说明 | 无                |

| 输入 | 7 2 1 2 3 1 2 3 1 |
| ---- | ----------------- |
| 输出 | 10                |
| 说明 | 无                |

题目解析
我的解题思路如下：

利用双指针（即一个双重for）找到所有子数组（有点暴力），外层 i 指针指向子数组左边界，内层 j 指针指向子数组右边界，然后统计子数组内部各数字出现个数，若有数字出现次数大于等于k，则该子数组符合要求，统计结果ans++。

上面算法逻辑中，找所有子数组的逻辑基本无法优化，但是统计每个子数组内部各数字出现次数的逻辑却可以优化。

我们可以基于动态规划前缀和的思想，对相同左边界的子数组，只统计初始子数组的内部元素个数，然后每当右边界变化，则基于上一个子数组的统计结果计算出新结果，例如：

自测用例：

7 2
1 2 3 1 2 3 1

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n, k;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 2) {
    [n, k] = lines[0].split(" ").map(Number);
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr, n, k));
    lines.length = 0;
  }
});
 
function getResult(arr, n, k) {
  let ans = 0;
 
  let l = 0;
  let r = 0;
  const count = {};
 
  while (l < n && r < n) {
    const c = arr[r];
    count[c] ? count[c]++ : (count[c] = 1);
    if (count[c] >= k) {
      ans += n - r;
 
      count[arr[l]]--;
      l++;
 
      count[c]--;
      r--;
    }
    r++;
  }
 
  return ans;
}
```

### Java算法源码

```
import java.util.HashMap;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
    int k = sc.nextInt();
 
    Integer[] arr = new Integer[n];
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }
 
    System.out.println(getResult(arr, n, k));
  }
 
  public static Integer getResult(Integer[] arr, Integer n, Integer k) {
    int ans = 0;
 
    int l = 0;
    int r = 0;
    HashMap<Integer, Integer> count = new HashMap<>();
 
    while (l < n && r < n) {
      Integer c = arr[r];
      count.put(c, count.getOrDefault(c, 0) + 1);
      if (count.get(c) >= k) {
        ans += n - r;
 
        count.put(arr[l], count.get(arr[l]) - 1);
        l++;
 
        count.put(c, count.get(c) - 1);
        r--;
      }
      r++;
    }
 
    return ans;
  }
}
```

### Python算法源码

```
# 输入获取
n, k = map(int, input().split())
arr = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr, n, k):
    ans = 0
 
    l = 0
    r = 0
    count = {}
 
    while l < n and r < n:
        c = arr[r]
 
        if count.get(c) is None:
            count[c] = 0
 
        count[c] += 1
 
        if count[c] >= k:
            ans += n - r
 
            count[arr[l]] -= 1
            l += 1
 
            count[c] -= 1
            r -= 1
 
        r += 1
 
    return ans
 
 
# 算法调用
print(getResult(arr, n, k))
```

