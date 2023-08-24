题目描述
小明玩一个游戏。

系统发1+n张牌，每张牌上有一个整数。

第一张给小明，后n张按照发牌顺序排成连续的一行。

需要小明判断，后n张牌中，是否存在连续的若干张牌，其和可以整除小明手中牌上的数字。

输入描述
输入数据有多组，每组输入数据有两行，输入到文件结尾结束。

第一行有两个整数n和m，空格隔开。m代表发给小明牌上的数字。

第二行有n个数，代表后续发的n张牌上的数字，以空格隔开。

输出描述
对每组输入，如果存在满足条件的连续若干张牌，则输出1;否则，输出0

备注
1 ≤ n ≤ 1000
1 ≤ 牌上的整数 ≤ 400000
输入的组数，不多于1000
用例确保输入都正确，不需要考虑非法情况。
用例
输入	6 7
2 12 6 3 5 5
10 11
1 1 1 1 1 1 1 1 1 1
输出	
1

0

说明	两组输入。第一组小明牌的数字为7，再发了6张牌。第1、2两张牌教字和为14，可以整除7，输出1，第二组小明牌的教字为11，再发了10张牌，这10张牌数字和为10，无法整除11，输出0。
题目解析
本题考察前缀和知识，以及数学问题。

本题要求连续若干张牌的和，其实就是求区间的元素之和。

而求解任意区间和的最佳算法就是：前缀和之差，这个知识点可以看下

算法设计 - 前缀和 & 差分数列_伏城之外的博客-CSDN博客

利用前缀和，我们可以在O(1)的时间求解出[L,R]区间和 = preSum[R] - preSum[L-1]。

那么接下来，我们是否需要双重for遍历出所有区间，然后逐一验证对应区间和是否可以整除k呢？

本题中每组用例最多n = 1000张牌，因此双重for遍历对应牌的所有连续区间的时间复杂度O(n^2)。

而本题有最多有1000组用例，因此相当于O(n^3)的时间复杂度，这是非常容易超时的。

本题优化是基于一个数学性质：

如果两个数a,b，他们的差a - b可以被k整除，则必然 a % k == b % k。

反之，如果a % k == b % k，那么 a - b 必然可以被k整除。

大家可以自行验证下这个数学性质。

验证好后，我们只需要将preSum[R]带入a，preSum[L-1]带入b 再来看看：

如果preSum[R] % k == preSum[L-1] % k，那么必然 preSum[R] - preSum[L-1] 可以被k整除。

利用这个数学性质，我们就不必双重for遍历所有区间了，只需要检查preSum数组中是否存在两个元素 % k 的结果相同，即可说明存在区间之和可以整除k。

JS算法源码`

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const cases = [];
const lines = [];
rl.on("line", (line) => {
  // 题目没有说明输入截止条件，因此以输入空行作为截止条件
  if (line == "") {
    getResult(cases);
  } else {
    lines.push(line);
 
    if (lines.length == 2) {
      const [n, m] = lines[0].split(" ").map(Number);
      const nums = lines[1].split(" ").map(Number);
      cases.push(new Case(m, nums));
      lines.length = 0;
    }
  }
});
 
class Case {
  constructor(m, nums) {
    this.m = m;
    this.nums = nums;
  }
}
 
function getResult(cases) {
  for (let ca of cases) {
    console.log(isExsit(ca.nums, ca.m));
  }
}
 
function isExsit(nums, m) {
  const remain = new Set();
  remain.add(0);
 
  let sum = 0;
  for (let num of nums) {
    sum += num;
    if (remain.has(sum % m)) {
      return 1;
    } else {
      remain.add(sum % m);
    }
  }
 
  return 0;
}
```

java

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
 
public class Main {
  static class Case {
    int m;
    int[] nums;
 
    public Case(int m, int[] nums) {
      this.m = m;
      this.nums = nums;
    }
  }
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    ArrayList<Case> cases = new ArrayList<>();
    while (sc.hasNextLine()) {
      String line = sc.nextLine();
      // 题目没有说明输入截止条件，因此以输入空行作为截止条件
      if ("".equals(line)) {
        getResult(cases);
        break;
      } else {
        int[] tmp = Arrays.stream(line.split(" ")).mapToInt(Integer::parseInt).toArray();
        int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        cases.add(new Case(tmp[1], nums));
      }
    }
  }
 
  public static void getResult(ArrayList<Case> cases) {
    for (Case ca : cases) {
      System.out.println(isExist(ca.nums, ca.m));
    }
  }
 
  public static int isExist(int[] nums, int m) {
    HashSet<Integer> remain = new HashSet<>();
    remain.add(0);
 
    int sum = 0;
    for (int num : nums) {
      sum += num;
      if (remain.contains(sum % m)) {
        return 1;
      } else {
        remain.add(sum % m);
      }
    }
 
    return 0;
  }
}
```

py`



```
def isExist(nums, m):
    remain = set()
    remain.add(0)
 
    total = 0
    for num in nums:
        total += num
        if total % m in remain:
            return 1
        else:
            remain.add(total % m)
 
    return 0
 
 
def getResult(cases):
    for case in cases:
        print(isExist(case[0], case[1]))
 
 
# 输入获取
cases = []
 
while True:
    line = input()
 
    if line == "":
        getResult(cases)
        break
    else:
        n, m = map(int, line.split())
        nums = list(map(int, input().split()))
        cases.append([nums, m])
```

