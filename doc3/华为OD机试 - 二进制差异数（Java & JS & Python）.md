题目描述
对于任意两个正整数A和B，定义它们之间的差异值和相似值：
差异值：A、B转换成二进制后，对于二进制的每一位，对应位置的bit值不相同则为1，否则为0；
相似值：A、B转换成二进制后，对于二进制的每一位，对应位置的bit值都为1则为1，否则为0；
现在有n个正整数A0到A（n-1），问有多少(i, j) (0<=i<j<n），Ai和Aj的差异值大于相似值。
假设A=5，B=3；则A的二进制表示101；B的二进制表示011；
则A与B的差异值二进制为110；相似值二进制为001；
A与B的差异值十进制等于6，相似值十进制等于1，满足条件。

输入描述
一个n接下来n个正整数

数据范围：1<=n<=10^5，1<=A[i]<2^30

输出描述
满足差异值大于相似值的对数

用例

| 输入 | 4 4 3 5 2                                     |
| ---- | --------------------------------------------- |
| 输出 | 4                                             |
| 说明 | 满足条件的分别是(0,1)(0,3)(1,2)(2,3)，共4对。 |

### 题目解析

题目描述中，

A，B差异值其实就是A和B二进制的[按位异或](https://so.csdn.net/so/search?q=按位异或&spm=1001.2101.3001.7020)运算，即A ^ B。

A，B相似值其实就是A和B二进制的按位与运算，即A & B。



因此，如果本题使用暴力法求解，则逻辑非常简单，如下

```
// 入参arr是用例第二行输入对应的数组
function getResult(arr) {
  const ans = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const diff = arr[i] ^ arr[j];
      const simi = arr[i] & arr[j];
      if (diff > simi) {
        ans.push([i, j]);
      }
    }
  }
  console.log(ans);
  return ans.length;
}
```

但是1<=n<=10^5，而上面算法复杂度达到了O(n^2)，因此会超时。

对于1<=n<=10^5，算法时间复杂度应该至少控制在O(n)。

因此，我们需要发现规律，而不是暴力求解。

本题的规律其实很容易发现，那就是看A，B的最高位1是否处于相同位，如果相同，比如

A：1010

B：1100

那么差异值就是0110，相似值就是1000，可以发现，A,B最高位的1，在按位异或运算下被换成0，在按位与的运算下，变成了1，因此这种情况下，相似值必然大于差异值，不符合要求。

如果A，B的最高位1不处于相同位，比如

A：1010

B：0110

那么差异值就是1100，相似值就是0010，可以发现，A，B的最高位不同，因此按位异或运算下被换成了1，而按位与运算下变成了0，因此这种情况下，差异值必然大于相似值，符合要求。

有了以上规律，我们可以统计出，每个数的最高位1处于哪一位，最高位1所处位数相同的数之间无法组合，最高位1所处位数不同的数之间可以组合。

这里我们可以借助，Number.prototype.toString(radix)方法来求出每一个数的二进制形式字符串，由于该方法不会补足前导0，比如Number(6).toString(2)的结果为：110，而不是0000 0110这种带前导0的形式。

因此我们可以直接将Number(6).toString(2)结果110的字符串长度当成其最高位1所处的位数。

按此逻辑，我们就可以将最高位1位数相同的数统计到一起了，然后双重for求统计数之间的乘积之和即可。

另外，我们需要注意的是：0和1 这两个二进制数的长度都是1，但是“0”却没有最高位1，因此要和“1”区别开来。

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
    const arr = lines[1].split(" ").map(Number);
    console.log(getResult(arr));
    lines.length = 0;
  }
});
 
function getResult(arr) {
  // highBit是一个数组，由于题目说给定的A[i]取值小于2^30，因此我们可以定义一个30长度的数组，其元素含义是，比如highBit[i]代表最高位1处于第i位的数的个数
  // let highBit = new Array(30).fill(0);
  let highBit = new Array(60).fill(0); // 经网友反馈这里长度定义为60得100%通过率
  for (let a of arr) {
    const bin = Number(a).toString(2);
    const len = bin.length; // 数的二进制形式字符串（无前导0）的长度，就是该数二进制最高位1所处位数
    // 将“0”和“1”区别开来
    if (bin == "0") {
      highBit[0]++;
    } else {
      highBit[len]++;
    }
  }
 
  // 排除统计个数为0的情况
  highBit = highBit.filter((d) => d);
 
  let ans = 0;
  for (let i = 0; i < highBit.length; i++) {
    for (let j = i + 1; j < highBit.length; j++) {
      ans += highBit[i] * highBit[j];
    }
  }
 
  return ans;
}
```

### Java算法源码

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = sc.nextInt();
    }
 
    System.out.println(getResult(arr));
  }
 
  public static int getResult(int[] arr) {
    // highBit是一个数组，由于题目说给定的A[i]取值小于2^30，因此我们可以定义一个30长度的数组，其元素含义是，比如highBit[i]代表最高位1处于第i位的数的个数
    //    int[] highBit = new int[30];
    int[] highBit = new int[60]; // 经网友反馈，这里长度改为60可得100%通过率
 
    for (int a : arr) {
      String bin = Integer.toBinaryString(a);
      int len = bin.length(); // 数的二进制形式字符串（无前导0）的长度，就是该数二进制最高位1所处位数
 
      // 将“0”和“1”区别开来
      if ("0".equals(bin)) {
        highBit[0]++;
      } else {
        highBit[len]++;
      }
    }
 
    int ans = 0;
    for (int i = 0; i < highBit.length; i++) {
      for (int j = i + 1; j < highBit.length; j++) {
        ans += highBit[i] * highBit[j];
      }
    }
 
    return ans;
  }
}
```

### Python算法源码

```
# 输入获取
n = int(input())
arr = list(map(int, input().split()))
 
 
# 算法入口
def getResult(arr):
    # highBit是一个数组，由于题目说给定的A[i]取值小于2^30，因此我们可以定义一个30长度的数组，其元素含义是，比如highBit[i]代表最高位1处于第i位的数的个数
    # highBit = [0] * 30
    highBit = [0] * 60  # 经网友反馈这里长度改为60可得100%通过率
    for a in arr:
        binStr = format(a, 'b')
        length = len(binStr)  # 数的二进制形式字符串（无前导0）的长度，就是该数二进制最高位1所处位数
 
        # 将一位二进制数“0”和“1”区别开来
        if binStr == "0":
            highBit[0] += 1
        else:
            highBit[length] += 1
 
    # 排除统计个数为0的情况
    highBit = list(filter(lambda d: d > 0, highBit))
 
    ans = 0
    for i in range(len(highBit)):
        for j in range(i + 1, len(highBit)):
            ans += highBit[i] * highBit[j]
 
    return ans
 
 
# 算法调用
print(getResult(arr))
```

