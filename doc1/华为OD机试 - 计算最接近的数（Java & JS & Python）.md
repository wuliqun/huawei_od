题目描述
给定一个数组X和正整数K，请找出使表达式：

X[i] - X[i + 1] -  ... - X[i + K - 1]

结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.

其中，数组中位数：长度为N的数组，按照元素的值大小升序排列后，下标为 N/2 元素的值

输入描述
无

输出描述
无

备注
数组X的元素均为正整数
X的长度n取值范围：2 ≤ n ≤ 1000
K大于0目小于数组的大小
i 的取值范围: 0 ≤ i < 1000
题目的排序数组X[N]的中位数是X[N/2]
用例
输入	[50,50,2,3],2
输出	1
说明	
中位数为50：[50,50,2,3]升序排序后变成[2,3,50,50]，中位数为下标4/2=2的元素50
计算结果为1：X [50,50,2,3] 根据题目计算X[i] - ... - X[i + k - 1] 得出三个数0 (X[0] - X[1] = 50 - 50) 、48 (X[1] - X[2] = 50 - 2) 和 -1 (X[2]-X[3] = 2 - 3) ，其中48最接近50，因此返回下标1。
题目解析
本题应该是采用核心代码模式，非ACM模式，因此不需要我们处理输入输出。

下面代码仍然以ACM模式实现，但是会将输入输出处理 和 核心代码 分离。考试时，只需要写出核心代码即可。

本题可以使用滑动窗口解题。

本题其实就是要遍历所有长度为k的滑窗，滑窗内部元素需要按照表达式

X[i] - X[i + 1] -  ... - X[i + K - 1]

来求得该滑窗对应得表达式计算结果window。

然后，求解window和数组x中位数mid的差距，差距绝对值越小，则说明二者越接近

结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.

本题的难点在于滑窗右移时，新、旧滑窗的状态转移。



假设旧滑窗的表达式计算结果为window，那么新滑窗的表达式计算结果应该是：

window - x[i-1] + x[i] * 2 - x[i + k -1]

 其中 x[i] * 2 的原因是，新滑窗中x[i]是正的，而旧滑窗中x[i]是负的，为了将-x[i] 变为 +x[i]， 则需要为 -x[i] + x[i] * 2

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const i = line.lastIndexOf(",");
 
  const x = line
    .slice(1, i - 1)
    .split(",")
    .map(Number);
 
  const k = parseInt(line.slice(i + 1));
 
  console.log(getResult(x, k));
});
 
function getResult(x, k) {
  const n = x.length;
 
  const midIdx = Math.floor(n / 2);
  // x数组的中位数
  const mid = [...x].sort((a, b) => a - b)[midIdx];
 
  // 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
  let window = x[0];
  for (let i = 1; i < k; i++) {
    window -= x[i];
  }
 
  // window和中位数的差距
  let minDiff = Math.abs(mid - window);
  // window滑窗起始索引
  let idx = 0;
 
  // 滑窗右移
  for (let i = 1; i <= n - k; i++) {
    // 右移一格后，新滑窗的表达式计算结果
    window += -x[i - 1] + 2 * x[i] - x[i + k - 1];
 
    // 新滑窗window值和中位数的差距
    const diff = Math.abs(mid - window);
 
    // 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
    if (diff <= minDiff) {
      idx = i;
    }
  }
 
  return idx;
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String line = sc.nextLine();
 
    int i = line.lastIndexOf(",");
 
    int[] x =
        Arrays.stream(line.substring(1, i - 1).split(",")).mapToInt(Integer::parseInt).toArray();
    int k = Integer.parseInt(line.substring(i + 1));
 
    System.out.println(getResult(x, k));
  }
 
  public static int getResult(int[] x, int k) {
    int n = x.length;
 
    // x数组的中位数
    int mid = Arrays.stream(x).sorted().toArray()[n / 2];
 
    // 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
    int window = x[0];
    for (int i = 1; i < k; i++) {
      window -= x[i];
    }
 
    // window和中位数的差距
    int minDiff = Math.abs(mid - window);
    // window滑窗起始索引
    int idx = 0;
 
    // 滑窗右移
    for (int i = 1; i <= n - k; i++) {
      // 右移一格后，新滑窗的表达式计算结果
      window += -x[i - 1] + 2 * x[i] - x[i + k - 1];
 
      // 新滑窗window值和中位数的差距
      int diff = Math.abs(mid - window);
 
      // 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
      if (diff <= minDiff) {
        idx = i;
      }
    }
 
    return idx;
  }
}
```

py

```
# 输入获取
tmp = input()
 
i = tmp.rfind(",")
 
x = list(map(int, tmp[1:i-1].split(",")))
k = int(tmp[i+1:])
 
 
# 核心代码
def getResult():
    n = len(x)
 
    # x数组的中位数
    mid = sorted(x)[n // 2]
 
    # 初始化滑窗0~k-1, window为滑窗内部元素的表达式计算结果
    window = x[0]
    for j in range(1, k):
        window -= x[j]
 
    # window和中位数的差距
    minDiff = abs(mid - window)
    # window滑窗起始索引
    idx = 0
 
    # 滑窗右移
    for i in range(1, n-k+1):
        # 右移一格后，新滑窗的表达式计算结果
        window += -x[i-1] + 2 * x[i] - x[i + k -1]
 
        # 新滑窗window值和中位数的差距
        diff = abs(mid - window)
 
        # 结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i
        if diff <= minDiff:
            idx = i
 
    return idx
 
 
# 算法调用
print(getResult())
```

