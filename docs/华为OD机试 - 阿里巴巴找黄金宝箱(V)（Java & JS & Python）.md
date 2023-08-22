题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字。

阿里巴巴念出一个咒语数字k(k<N)，找出连续k个宝箱数字和的最大值，并输出该最大值。

输入描述
第一行输入一个数字字串，数字之间使用逗号分隔，例如：2,10,-3,-8,40,5

1 ≤ 字串中数字的个数 ≤ 100000 
-10000 ≤ 每个数字 ≤ 10000
第二行输入咒语数字，例如：4，咒语数字大小小于宝箱的个数

输出描述
连续k个宝箱数字和的最大值，例如：39

用例
输入	2,10,-3,-8,40,5
4
输出	39
说明	无
输入	8
1
输出	8
说明	无
题目解析
本题可以使用滑动窗口解决。

题目说：

找出连续k个宝箱数字和的最大值

其中连续k个刚好可以用一个固定长度为k的滑动窗口去限定。

我们只需要花费O(k)的时间求解出初始滑动窗口的数字和，之后每右移一个后的新状态滑窗的数字和都可以依赖于前一个滑窗的数字和求得：

[![image.png](https://img-blog.csdnimg.cn/2d5a65a1dc9d4a5481d19e7e8bce5986.png)]

如上图所示，除了初始滑窗，所有的滑窗的数字和cur = 之前滑窗的数字和last - 红色失去的数字 + 绿色新增的数字



### Java算法源码	

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] arr = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    int k = Integer.parseInt(sc.nextLine());
 
    System.out.println(getResult(arr, k));
  }
 
  public static int getResult(int[] arr, int k) {
    int window_sum = 0;
 
    for (int i = 0; i < k; i++) {
      window_sum += arr[i];
    }
 
    int ans = window_sum;
 
    for (int i = 1; i <= arr.length - k; i++) {
      window_sum -= arr[i - 1];
      window_sum += arr[i + k - 1];
      ans = Math.max(ans, window_sum);
    }
 
    return ans;
  }
}
```

js

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
    const arr = lines[0].split(",").map(Number);
    const k = lines[1] - 0;
    console.log(getResult(arr, k));
    lines.length = 0;
  }
});
 
function getResult(arr, k) {
  let window_sum = 0;
 
  for (let i = 0; i < k; i++) {
    window_sum += arr[i];
  }
 
  let ans = window_sum;
 
  for (let i = 1; i <= arr.length - k; i++) {
    window_sum -= arr[i - 1];
    window_sum += arr[i + k - 1];
    ans = Math.max(ans, window_sum);
  }
 
  return ans;
}
```

py

```
# 输入获取
arr = list(map(int, input().split(",")))
k = int(input())
 
 
# 算法入口
def getResult():
    window_sum = 0
 
    for i in range(k):
        window_sum += arr[i]
 
    ans = window_sum
 
    for i in range(1, len(arr) - k + 1):
        window_sum -= arr[i - 1]
        window_sum += arr[i + k - 1]
        ans = max(ans, window_sum)
 
    return ans
 
 
# 算法调用
print(getResult())
```

