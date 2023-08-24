题目描述
跳房子，也叫跳飞机，是一种世界性的儿童游戏。

游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格，然后获得一次选房子的机会，直到所有房子被选完，房子最多的人获胜。

跳房子的过程中，如果有踩线等违规行为，会结束当前回合，甚至可能倒退几步。

假设房子的总格数是count，小红每回合可能连续跳的步数都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红三个回合跳到最后一格?

如果有，请输出索引和最小的步数组合（数据保证索引和最小的步数组合是唯一的）。

注意：数组中的步数可以重复，但数组中的元素不能重复使用。

输入描述
第一行输入为房子总格数count，它是int整数类型。
第二行输入为每回合可能连续跳的步数，它是int整数数组类型

输出描述
返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

备注
count ≤ 10000
3 ≤ steps.length ≤ 10000
-100000 ≤ steps[i] ≤ 100000
用例
输入	[1,4,5,2,0,2]
9
输出	[4,5,0]
说明	无
输入	[1,5,2,0,2,4]
9
输出	[5,2,2]
说明	无
输入	[-1,2,4,9]
12
输出	[-1,4,9]
说明	无
题目解析
本题其实就是15. 三数之和 - 力扣（LeetCode）的变种题

即给的一个数组steps，让你从中找出三个数，保证这三个数的和等于count。

本题的变化在于，可能存在多个三数组合满足要求，但是我们只取其中三数的索引和最小的。即我们不仅要算三数的值之和，还是算三数的索引之和。

因此，我首先根据输入的steps数组，将其转化为newSteps数组，

newSteps数组的元素是{val: steps[i]， idx: i}，

然后将newSteps数组按照元素的val值进行升序，若val值相同，则继续按照idx值升序。

之后，就按照leetcode三数之和的逻辑求解满足要求的三数组合，即定义一个双重循环，

外层for循环遍历newSteps每一个元素，指针为 i，然后再定义两个指针 l = i + 1， r = newSteps.length - 1，假设valSum = newSteps[i].val+ newSteps[l].val + newSteps[r].val，

如果 valSum < count，则 l++

如果 valSum > count，则 r--

如果 valSum == count，那么i，l，r指向的三数，就是一个符合要求的三数组合，此时再计算下三数的索引之和：idxSum = newSteps[i].idx+ newSteps[l].idx+ newSteps[r].idx

比较idxSum和minIdxSum：

如果idxSum < minIdxSum，则当前三数组合就是更优解，我们更新minIdxSum = idxSum，然后继续尝试更优解，即 r--：
注意，这里为什么要r--，因为输入的steps数组是存在重复元素的，因此可能存在steps[r-1] == steps[r]，而因此i,l,r-1也能形成符合要求的三数组合，且索引和更小
注意，这里为什么不l++，虽然steps[l+1]可能与steps[l]相同，因此i,l+1,r也能形成符合要求的三数组合，但是索引和更大，而本题要求索引和最小的，因此不需要尝试l++
如果idxSum > minIdxSum，丢弃
如果idxSum == minIdxSum，不存在此场景，因为题目描述中说：数据保证索引和最小的步数组合是唯一的
本题数量级较大，需要做剪枝优化，才有可能不超时，三数之和问题一般有下面剪枝优化：

1、如果steps[i] > count的话，则steps[i] + steps[l] + steps[r] > count是必然的？

前提是：steps[i] > 0 ，以及count > 0，即i ,l ,r 指向的元素全正数的情况。此时就可以break掉 i 的遍历

2、避免统计重复组合，即组合元素都相同的组合

2.1、关于R指针的组合去重策略

比如排序后steps为：[0,1,2,3,3,3]

如下例子，我们发现可能存在连续的steps[r] == steps[r-1]的情况，对于这种情况，我们可以开一个循环，不停左移R指针，且这个过程会产生更优解，我们还有记录更优解



2.2、关于L指针的组合去重策略

比如排序后steps为：[0,1,1,1,2,3]，

即会存在连续的steps[l] == steps[l+1]，此时虽然 i, l+1, r 三元组不会产生更优解，但是我们仍有必要尝试 L 指针右移，来避免产生重复组合



2.3、关于 i 指针的组合去重策略：

当i > 0时，如果steps[i] == steps[i-1]，则也会产生重复组合，且此时 i,l,r三元组的索引和要大于 i-1,l,r三元组的，因此此情况也可以直接continue掉



JS算法源码

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
    const steps = lines[0].slice(1, -1).split(",").map(Number);
    const count = parseInt(lines[1]);
 
    console.log(getResult(steps, count));
 
    lines.length = 0;
  }
});
 
function getResult(steps, count) {
  const n = steps.length;
 
  const newSteps = [];
  for (let i = 0; i < n; i++) {
    newSteps.push(new Step(steps[i], i));
  }
 
  newSteps.sort((a, b) => (a.val != b.val ? a.val - b.val : a.idx - b.idx));
 
  let minStepIdxSum = Infinity;
  let ans = "";
 
  for (let i = 0; i < n; i++) {
    // 剪枝优化
    if (newSteps[i].val > 0 && count > 0 && newSteps[i].val > count) {
      break;
    }
 
    // 剪枝优化
    if (i > 0 && newSteps[i].val == newSteps[i - 1].val) {
      continue;
    }
 
    let l = i + 1;
    let r = n - 1;
 
    while (l < r) {
      const stepValSum = newSteps[i].val + newSteps[l].val + newSteps[r].val;
 
      if (stepValSum < count) {
        l++;
      } else if (stepValSum > count) {
        r--;
      } else {
        // 剪枝优化
        while (l < r - 1 && newSteps[r].val == newSteps[r - 1].val) {
          r--;
        }
 
        const stepIdxSum = newSteps[i].idx + newSteps[l].idx + newSteps[r].idx;
        if (stepIdxSum < minStepIdxSum) {
          minStepIdxSum = stepIdxSum;
 
          const arr = [newSteps[i], newSteps[l], newSteps[r]];
          arr.sort((a, b) => a.idx - b.idx);
 
          ans = `[${arr.map((step) => step.val).join(",")}]`;
        }
 
        // 剪枝优化
        while (l + 1 < r && newSteps[l].val == newSteps[l + 1].val) {
          l++;
        }
 
        l++;
        r--;
      }
    }
  }
 
  return ans;
}
 
class Step {
  constructor(val, idx) {
    this.val = val;
    this.idx = idx;
  }
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringJoiner;
 
public class Main {
  static class Step {
    int val;
    int idx;
 
    public Step(int val, int idx) {
      this.idx = idx;
      this.val = val;
    }
  }
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String tmp = sc.nextLine();
    int[] steps =
        Arrays.stream(tmp.substring(1, tmp.length() - 1).split(","))
            .mapToInt(Integer::parseInt)
            .toArray();
 
    int count = Integer.parseInt(sc.nextLine());
 
    System.out.println(getResult(steps, count));
  }
 
  public static String getResult(int[] steps, int count) {
    int n = steps.length;
 
    Step[] newSteps = new Step[n];
    for (int i = 0; i < n; i++) {
      newSteps[i] = new Step(steps[i], i);
    }
 
    Arrays.sort(newSteps, (a, b) -> a.val != b.val ? a.val - b.val : a.idx - b.idx);
 
    int minStepIdxSum = Integer.MAX_VALUE;
    String ans = "";
 
    for (int i = 0; i < n; i++) {
      // 剪枝优化
      if (newSteps[i].val > count && newSteps[i].val > 0 && count > 0) break;
 
      // 剪枝优化
      if (i > 0 && newSteps[i].val == newSteps[i - 1].val) continue;
 
      int l = i + 1;
      int r = n - 1;
 
      while (l < r) {
        int stepValSum = newSteps[i].val + newSteps[l].val + newSteps[r].val;
 
        if (stepValSum < count) {
          l++;
        } else if (stepValSum > count) {
          r--;
        } else {
          // 剪枝优化
          while (l < r - 1 && newSteps[r].val == newSteps[r - 1].val) {
            r--;
          }
 
          int stepIdxSum = newSteps[i].idx + newSteps[l].idx + newSteps[r].idx;
          if (stepIdxSum < minStepIdxSum) {
            minStepIdxSum = stepIdxSum;
 
            Step[] arr = {newSteps[i], newSteps[l], newSteps[r]};
            Arrays.sort(arr, (a, b) -> a.idx - b.idx);
 
            StringJoiner sj = new StringJoiner(",", "[", "]");
            for (Step step : arr) sj.add(step.val + "");
 
            ans = sj.toString();
          }
 
          // 剪枝优化
          while (l + 1 < r && newSteps[l].val == newSteps[l + 1].val) {
            l++;
          }
 
          l++;
          r--;
        }
      }
    }
    return ans;
  }
}
```

py

```
import sys
 
# 输入获取
steps = list(map(int, input()[1:-1].split(",")))
count = int(input())
 
 
class Step:
    def __init__(self, val, idx):
        self.val = val
        self.idx = idx
 
 
# 算法入口
def getResult():
    n = len(steps)
 
    newSteps = [Step(steps[i], i) for i in range(n)]
 
    newSteps.sort(key=lambda x: (x.val, x.idx))
 
    minStepIdxSum = sys.maxsize
    ans = ""
 
    for i in range(n):
        # 剪枝优化
        if newSteps[i].val > 0 and 0 < count < newSteps[i].val:
            break
 
        # 剪枝优化
        if i > 0 and newSteps[i].val == newSteps[i - 1].val:
            continue
 
        l = i + 1
        r = n - 1
 
        while l < r:
            stepValSum = newSteps[i].val + newSteps[l].val + newSteps[r].val
 
            if stepValSum < count:
                l += 1
            elif stepValSum > count:
                r -= 1
            else:
                # 剪枝优化
                while l < r - 1 and newSteps[r].val == newSteps[r - 1].val:
                    r -= 1
 
                stepIdxSum = newSteps[i].idx + newSteps[l].idx + newSteps[r].idx
                if stepIdxSum < minStepIdxSum:
                    minStepIdxSum = stepIdxSum
 
                    arr = [newSteps[i], newSteps[l], newSteps[r]]
                    arr.sort(key=lambda x: x.idx)
 
                    ans = "[" + ",".join(map(lambda x: str(x.val), arr)) + "]"
 
                # 剪枝优化
                while l + 1 < r and newSteps[l].val == newSteps[l + 1].val:
                    l += 1
 
                l += 1
                r -= 1
 
    return ans
 
 
# 算法调用
print(getResult())
```

