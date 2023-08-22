题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字，箱子中可能有一个黄金宝箱。

黄金宝箱满足排在它之前的所有箱子数字和等于排在它之后的所有箱子数字之和；

第一个箱子左边部分的数字和定义为0；最后一个箱子右边部分的数字和定义为0.

请帮阿里巴巴找到黄金宝箱，输出第一个满足条件的黄金宝箱编号，如果不存在黄金宝箱，请返回-1。

输入描述
箱子上贴的数字列表，使用逗号分隔，例如1，-1，0
宝箱的数量不小于1个，不超过10000
宝箱上贴的数值范围不低于-1000，不超过1000

输出描述
第一个黄金宝箱的编号

用例
输入	2,5,-1,8,6
输出	3
说明	
下标3之前的数字和为：2 + 5 + -1 = 6

下标3之后的数字和为：6 = 6

输入	8,9
输出	-1
说明	不存在符合要求的位置
输入	11
输出	0
说明	
下标0之前的数字和为：0

下标0之后的数字和为：0

题目解析
本题可以利用单指针来解决。

我的解题思路如下：

首先求出输入的数组arr的所有元素之和sum，然后用一个指针 i 从0开始遍历数组arr，假设指针 i 左边元素之和为leftSum，指针 i 右边元素之和为rightSum。

那么初始时，即 i = 0时，leftSum = 0， rightSum = sum - arr[0]，如下图：

[![image.png](https://img-blog.csdnimg.cn/40fadbfd422d4a7583dad4576197adcf.png)]

如果此时leftSum == rightSum，那么 i = 0就是宝箱位置。

否则，继续 i++，之后 leftSum += arr[i-1]，rightSum -= arr[i]

[![image.png](https://img-blog.csdnimg.cn/bdd4cb6c6b98431cb204f13b6a9ad5b9.png)]

如果 i 走到最后一个元素位置，还没有达成leftSum == rightSum，那么就返回-1。

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] arr = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
 
    System.out.println(getResult(arr));
  }
 
  public static int getResult(int[] arr) {
    int leftSum = 0;
    int rightSum = Arrays.stream(arr).sum() - arr[0];
 
    if (leftSum == rightSum) return 0;
 
    for (int i = 1; i < arr.length; i++) {
      leftSum += arr[i - 1];
      rightSum -= arr[i];
      if (leftSum == rightSum) return i;
    }
 
    return -1;
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
 
rl.on("line", (line) => {
  const arr = line.split(",").map(Number);
  console.log(getResult(arr));
});
 
function getResult(arr) {
  let leftSum = 0;
  let rightSum = arr.reduce((a, b) => a + b) - arr[0];
 
  if (leftSum == rightSum) return 0;
 
  for (let i = 1; i < arr.length; i++) {
    leftSum += arr[i - 1];
    rightSum -= arr[i];
    if (leftSum == rightSum) return i;
  }
 
  return -1;
}
```

py

```
# 输入获取
arr = list(map(int, input().split(",")))
 
 
# 算法入口
def getResult():
    leftSum = 0
    rightSum = sum(arr) - arr[0]
 
    if leftSum == rightSum:
        return 0
 
    for i in range(1, len(arr)):
        leftSum += arr[i-1]
        rightSum -= arr[i]
        if leftSum == rightSum:
            return i
 
    return -1
 
 
# 算法调用
print(getResult())
```

