题目描述
A公司准备对他下面的N个产品评选最差奖，
评选的方式是首先对每个产品进行评分，然后根据评分区间计算相邻几个产品中最差的产品。
评选的标准是依次找到从当前产品开始前M个产品中最差的产品，请给出最差产品的评分序列。

输入描述
第一行，数字M，表示评分区间的长度，取值范围是0<M<10000
第二行，产品的评分序列，比如[12,3,8,6,5]，产品数量N范围是-10000 < N <10000

输出描述
评分区间内最差产品的评分序列

用例

| 输入 | 3 12,3,8,6,5                                   |
| ---- | ---------------------------------------------- |
| 输出 | 3,3,5                                          |
| 说明 | 12,3,8 最差的是33,8,6 最差的是38,6,5 最差的是5 |

### 题目解析

本题其实就是求解长度为m的[滑动窗口](https://so.csdn.net/so/search?q=滑动窗口&spm=1001.2101.3001.7020)移动过程中的内部最小值。

## 暴力解法（可100%通过）

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
    const arr = lines[1].split(",").map(Number);
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});
 
function getResult(arr, m) {
  const ans = [];
  for (let i = 0; i <= arr.length - m; i++) {
    ans.push(Math.min(...arr.slice(i, i + m)));
  }
  return ans.join(",");
}
```

### Java算法源码

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringJoiner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
    Integer[] arr =
        Arrays.stream(sc.next().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
 
    System.out.println(getResult(arr, m));
  }
 
  public static String getResult(Integer[] arr, int m) {
    ArrayList<Integer> ans = new ArrayList<>();
 
    for (int i = 0; i <= arr.length - m; i++) {
      int min = Integer.MAX_VALUE;
      for (int j = i; j < i + m; j++) min = Math.min(min, arr[j]);
      ans.add(min);
    }
 
    StringJoiner sj = new StringJoiner(",");
    for (Integer an : ans) {
      sj.add(an + "");
    }
    return sj.toString();
  }
}
```

### Python算法源码

```
# 输入获取
m = int(input())
arr = list(map(int, input().split(",")))
 
 
# 算法入口
def getResult(arr, m):
    ans = []
    for i in range(0, len(arr) - m + 1):
        ans.append(min(arr[i:i+m]))
    return ",".join(map(str, ans))
 
 
# 算法调用
print(getResult(arr, m))
```

## 滑窗解法

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
    const arr = lines[1].split(",").map(Number);
    console.log(getResult(arr, m));
    lines.length = 0;
  }
});
 
function getResult(arr, m) {
  let min = Math.min.apply(null, arr.slice(0, m));
 
  const ans = [];
  ans.push(min);
 
  let j = m;
  while (j < arr.length) {
    if (arr[j - m] > min) {
      min = Math.min(min, arr[j]);
    } else {
      if (arr[j] <= min) {
        min = arr[j];
      } else {
        min = Math.min.apply(null, arr.slice(j - m + 1, j + 1));
      }
    }
    ans.push(min);
    j++;
  }
 
  return ans.join();
}
```

### Java算法源码

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringJoiner;
 
public class Main2 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
    Integer[] arr =
        Arrays.stream(sc.next().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
 
    System.out.println(getResult(arr, m));
  }
 
  public static String getResult(Integer[] arr, int m) {
    int min = Integer.MAX_VALUE;
    for (int i = 0; i < m; i++) {
      min = Math.min(min, arr[i]);
    }
 
    ArrayList<Integer> ans = new ArrayList<>();
    ans.add(min);
 
    int j = m;
    while (j < arr.length) {
      if (arr[j - m] > min) {
        min = Math.min(min, arr[j]);
      } else {
        if (arr[j] <= min) {
          min = arr[j];
        } else {
          min = arr[j - m + 1];
          for (int i = j - m + 2; i <= j; i++) {
            min = Math.min(min, arr[i]);
          }
        }
      }
 
      ans.add(min);
      j++;
    }
 
    StringJoiner sj = new StringJoiner(",");
 
    for (Integer an : ans) {
      sj.add(an + "");
    }
 
    return sj.toString();
  }
}
```

### Python算法源码

```
# 输入获取
m = int(input())
arr = list(map(int, input().split(",")))
 
 
# 算法入口
def getResult(arr, m):
    minV = min(arr[:m])
 
    ans = [minV]
 
    j = m
    while j < len(arr):
        if arr[j - m] > minV:
            minV = min(minV, arr[j])
        else:
            if arr[j] <= minV:
                minV = arr[j]
            else:
                minV = min(arr[j - m + 1:j + 1])
 
        ans.append(minV)
        j += 1
 
    return ",".join(map(str, ans))
 
 
# 算法调用
print(getResult(arr, m))
```

