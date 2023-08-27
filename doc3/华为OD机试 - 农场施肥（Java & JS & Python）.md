题目描述
某农场主管理了一大片果园，fields[i]表示不同果林的面积，单位：m^2，现在要为所有的果林施肥且必须在n天之内完成，否则影响收成。小布是果林的工作人员，他每次选择一片果林进行施肥，且一片果林施肥完后当天不再进行施肥作业。

假设施肥机的能效为k，单位：m^2/day，请问至少租赁能效 k 为多少的施肥机才能确保不影响收成？如果无法完成施肥任务，则返回-1。

输入描述
第一行输入为m和n，m表示fields中的元素个数，n表示施肥任务必须在n天内（含n天）完成；

第二行输入为fields，fields[i]表示果林 i 的面积，单位：m^2

输出描述
对于每组数据，输出最小施肥机的能效 k ，无多余空格。

备注
1 ≤ fields.length ≤ 10^4
1 ≤ n ≤ 10^9
1 ≤ fields[i] ≤ 10^9
用例

输入	5 7
5 7 9 15 10
输出	9
说明	当能效k为9时，fields[0]需要1天，fields[1]需要1天，fields[2]需要1天，fields[3]需要2天，fields[4]需要2天，共需要7天，不会影响收成。
输入	3 1
2 3 4
输出	-1
说明	由于一天最多完成一片果林的施肥，无论k为多少都至少需要3天才能完成施肥，因此返回-1。

题目解析
本题中能效k其实和果林面积fields[i]是强相关的，比如用例1中fields = [5,7,9,15,10]：

能效k取5的话，则面积5的果林只需要1天，其他大于面积5的果林需要Math.ceil(fields[i] / k)

能效k取7的话，则面积5、7的果林只需要1天，其他大于面积7的果林需要Math.ceil(fields[i] / k)

因此，k的取值范围其实就是果林最小面积min ~ 最大面积max之间，我们完全可以遍历min~max之间的所有可能给k，然后求出能效k施肥完所有果林需要的天数spend，然后求出spend===n的所有情况中最小的k作为题解。

但是，本题min~max之间有1 ≤ fields[i] ≤ 10^9，并且求解每种k对应的spend都需要遍历1 ≤ fields.length ≤ 10^4次，因此上面算法的时间复杂度是10^9 * 10^4 = 10^13，这是必然超时的。

因此，我们可以采用二分查找的方式来找k，即每次取min、max的中间值作为k，如果k能效需要的spend时间和指定天数n时间的关系：

spend > n：说明k能效太低了，花费的时间超过了n，因此要提高k，即min = k，这样下次二分查找的值就会增大k
spend < n：说明k能效太高了，花费的时间少于n，因此要降低k，即max = k，这样下次二分查找的值就会减小k
spend === n：说明k能效刚刚好，花费的时间等于n，但是此时可能并非最优解，我们还需继续找更小的k，即max = k
2023.02.07 经网友指正，输入描述中说：施肥任务必须在n天内（含n天），即施肥任务可以少于n天时间完成，因此spend < n时的k也是符合要求的k。因此spend < n和spend == n的情况可以合并处理，即当 spend <= n时，说明k能效足够了，花费的时间小于等于n，但是此时可能并非最优解，我们还需继续找更小的k，即max = k
此时，算法时间复杂度为 log(10^9) * 10^4 = 9 * 10^4，大大的优化了。

关于本题K的取小数还是取整数的思考，请大家先看下面的用例：

3 5
1 1 10

如果取小数的话，上面用例K的最小取值是无穷小数3.33333....
因此，K值如果取小数的话，必然要说明精度，但是本题没有。
因此，个人认为本题K应该取整数。
当然考试的时候，还是要灵活应对。

补充一个用例，关于初始二分时，左边界的取值

1 10

9

即只有一个果林，面积为9，现在要求10天完成施肥，此时最低能效K应该为1。

因此，前面逻辑中，二分查找能效K时，应该从1~max中二分，而不是min~max，即能效K的最低值可能为1。

本题已经找到原型题

[875. 爱吃香蕉的珂珂 - 力扣（LeetCode）](https://leetcode.cn/problems/koko-eating-bananas/)

### JavaScript算法源码

```javascript
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
    const [m, n] = lines[0].split(" ").map(Number);
    const fields = lines[1].split(" ").map(Number);
 
    console.log(getResult(n, fields));
    lines.length = 0;
  }
});
 
function getResult(n, fields) {
  let min = 1; // 最小果林面积
  let max = Math.max(...fields); // 最大果林面积
  let ans = -1;
 
  // 我们需要找min,max中间值作为k效率，如果min,max间距小于1，则没有中间值，循环结束
  while (min <= max) {
    let k = Math.ceil((min + max) / 2);
    const res = check(k, n, fields);
 
    if (res > 0)
      min = k + 1; // k的效率太低，导致花费的时间超过了n天，因此要提高k效率
    else {
      ans = k; // k的效率刚好，花费的时间就是n天，或者k的效率太高，导致花费的时间少于n天，而题目说：施肥任务必须在n天内（含n天）完成，因此花费时间少于n天的k也是符合要求的
      max = k - 1; // 继续尝试找更小的k
    }
  }
 
  return ans;
}
 
// k效率施肥完fields所有果林需要的spend天数，和指定天数n的差距
function check(k, n, fields) {
  let spend = 0;
  for (let field of fields) {
    if (k >= field) spend++; // k效率比field果林面积大，则field果林只需要一天
    else spend += Math.ceil(field / k); // k效率比field果林面积小，则需要Math.ceil(field / k)天
  }
 
  return spend - n;
}
```

### Java算法源码

```java
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int m = sc.nextInt();
    int n = sc.nextInt();
 
    int[] fields = new int[m];
    for (int i = 0; i < m; i++) {
      fields[i] = sc.nextInt();
    }
 
    System.out.println(getResult(n, fields));
  }
 
  /**
   * @param n 表示施肥任务必须在n天内（含n天）
   * @param fields fields[i]表示果林 i 的面积
   * @return 最小施肥机的能效 k
   */
  public static int getResult(int n, int[] fields) {
    double min = 1; // 最小果林面积
    double max = Arrays.stream(fields).max().orElse(0); // 最大果林面积
 
    int ans = -1;
 
    // 我们需要找min,max中间值作为k效率，如果min,max间距小于1，则没有中间值，循环结束
    while (min <= max) {
      int k = (int) Math.ceil((min + max) / 2);
 
      int res = check(k, n, fields);
 
      if (res > 0) min = k + 1; // k的效率太低，导致花费的时间超过了n天，因此要提高k效率
      else {
        ans = k; // k的效率太高或刚好，花费的时间<=n天，则此时k效率就是一个题解，但可能不是最优解
        max = k - 1; // 继续尝试找更小的k
      }
    }
 
    return ans;
  }
 
  /**
   * @param k 能效k
   * @param n 指定天数
   * @param fields 所有果林面积
   * @return 基于能效k需要spend天施肥完所有果林，返回spend - n
   */
  public static int check(int k, int n, int[] fields) {
    int spend = 0;
    for (int field : fields) {
      if (k >= field) spend++; // k效率比field果林面积大，则field果林只需要一天
      else spend += Math.ceil(field / (double) k); // k效率比field果林面积小，则需要Math.ceil(field / k)天
    }
 
    return spend - n;
  }
}
```

### Python算法源码

```python
import math
 
m, n = map(int, input().split())
fields = list(map(int, input().split()))
 
minK = 1  # 最小果林面积，即最小能效k
maxK = max(fields)  # 最大果林面积，即最大能效k
 
ans = -1
 
 
# k效率施肥完fields所有果林需要的spend天数，和指定天数n的差距
def check(k, n, fields):
    spend = 0
    for field in fields:
        if k >= field:
            spend += 1  # k效率比field果林面积大，则field果林只需要一天
        else:
            spend += math.ceil(field / k)  # k效率比field果林面积小，则需要Math.ceil(field / k)天
    return spend - n
 
 
# 我们需要找minK,maxK中间值作为k效率，如果minK,maxK间距小于1，则没有中间值，循环结束
while minK <= maxK:
    k = math.ceil((minK + maxK) / 2)
    res = check(k, n, fields)
 
    if res > 0:
        minK = k + 1  # k的效率太低，导致花费的时间超过了n天，因此要提高k效率
    # 2023.02.07 网友指正：施肥任务必须在n天内（含n天），表示不需要一定是n天完成，可以少于n天完成，因此res < 0 时的k也是符合要求的k
    # elif res < 0:
    #     maxK = k  # k的效率太高，导致花费的时间少于n天，因此要降低k效率
    else:
        ans = k  # k的效率刚好，花费的时间就是n天，则此时k效率就是一个题解，但可能不是最优解
        maxK = k - 1  # 继续尝试找更小的k
 
print(int(ans))
```