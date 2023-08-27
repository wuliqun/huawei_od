题目描述
给你一个整数M和数组N，N中的元素为连续整数，要求根据N中的元素组装成新的数组R，组装规则：

R中元素总和加起来等于M
R中的元素可以从N中重复选取
R中的元素最多只能有1个不在N中，且比N中的数字都要小（不能为负数）
输入描述
第一行输入是连续数组N，采用空格分隔
第二行输入数字M

输出描述
输出的是组装办法数量，int类型

备注
1 ≤ M ≤ 30
1 ≤ N.length ≤ 1000
用例

| 输入 | 2 5                          |
| ---- | ---------------------------- |
| 输出 | 1                            |
| 说明 | 只有1种组装办法，就是[2,2,1] |

| 输入 | 2 3 5                                  |
| ---- | -------------------------------------- |
| 输出 | 2                                      |
| 说明 | 一共两种组装办法，分别是[2,2,1]，[2,3] |

题目解析
我们可以换个说法来看本题，

在数组N任意选取多个元素，且同一个元素可以重复选取，只要最终选取的所有元素之和等于m，或者：小于m但是差值不超过N.min()。

现在是不是感觉本题简单多了。

我们可以使用回溯算法来在N中选取多个元素（同一个元素可以重复选取），这个逻辑其实就是求可重复元素组合情况，每得到一个组合就看其和sum是否等于m，或者m - sum 是否已经小于 N.min，若是，则该组合是符合要求的，count++，否则不符合要求，继续找。当sum > m时，则说明往后的组合已经无法符合要求，此时需要进行回溯了。

JavaScript算法源码

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
    const arr = lines[0].split(" ").map(Number);
    const m = lines[1] - 0;
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});
 
function getResult(arr, m) {
  arr = arr.filter((val) => val <= m); // 只过滤出比m小的连续整数
 
  const min = arr[0];
 
  return dfs(arr, 0, 0, min, m, 0);
}
 
function dfs(arr, index, sum, min, m, count) {
  if (sum > m) {
    return count;
  }
 
  if (sum === m || (m - sum < min && m - sum > 0)) {
    return count + 1;
  }
 
  for (let i = index; i < arr.length; i++) {
    count = dfs(arr, i, sum + arr[i], min, m, count);
  }
 
  return count;
}
```

### Java算法源码

```java
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    Integer[] arr =
        Arrays.stream(sc.nextLine().split(" ")).map(Integer::parseInt).toArray(Integer[]::new);
 
    int m = Integer.parseInt(sc.nextLine());
 
    System.out.println(getResult(arr, m));
  }
 
  public static int getResult(Integer[] arr, int m) {
    Integer[] newArr = Arrays.stream(arr).filter(val -> val <= m).toArray(Integer[]::new);
 
    int min = newArr[0];
 
    return dfs(newArr, 0, 0, min, m, 0);
  }
 
  public static int dfs(Integer[] arr, int index, int sum, int min, int m, int count) {
    if (sum > m) {
      return count;
    }
 
    if (sum == m || (m - sum < min && m - sum > 0)) {
      return count + 1;
    }
 
    for (int i = index; i < arr.length; i++) {
      count = dfs(arr, i, sum + arr[i], min, m, count);
    }
 
    return count;
  }
}
```

### Python算法源码

```python
# 输入获取
arr = list(map(int, input().split()))
m = int(input())
 
 
def dfs(arr, index, sumV, minV, m, count):
    if sumV > m:
        return count
 
    if sumV == m or 0 < m - sumV < minV:
        return count + 1
 
    for i in range(index, len(arr)):
        count = dfs(arr, i, sumV + arr[i], minV, m, count)
 
    return count
 
 
# 算法入口
def getResult(arr, m):
    tmp = list(filter(lambda x: x <= m, arr))
 
    return dfs(tmp, 0, 0, arr[0], m, 0)
 
 
# 调用算法
print(getResult(arr, m))
```