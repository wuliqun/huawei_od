题目描述
跳房子，也叫跳飞机，是一种世界性的儿童游戏。

游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格。

跳房子的过程中，可以向前跳，也可以向后跳。

假设房子的总格数是count，小红每回合可能连续跳的步教都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红两个回合跳到量后一格?

如果有，请输出索引和最小的步数组合。


注意：

数组中的步数可以重复，但数组中的元素不能重复使用。
提供的数据保证存在满足题目要求的组合，且索引和最小的步数组合是唯一的。
输入描述
第一行输入为房子总格数count，它是int整数类型。
第二行输入为每回合可能连续跳的步数，它是int整数数组类型。

输出描述
返回索引和最小的满足要求的步数组合（顺序保持steps中原有顺序）

备注
count ≤ 1000
0 ≤ steps.length ≤ 5000
-100000000 ≤ steps ≤ 100000000
用例
输入	[1,4,5,2,2]
7
输出	[5, 2]
说明	无
输入	[-1,2,4,9,6]
8
输出	[-1, 9]
说明	此样例有多种组合满足两回合跳到最后，譬如：[-1,9]，[2,6]，其中[-1,9]的索引和为0+3=3，[2,6]的索和为1+4=5，所以索引和最小的步数组合[-1,9]
题目解析
本题其实就是两数之和：LeetCode - 1 两数之和_的变种题。

即有一个数组steps，要在其中找到一个二元组，让其和等于count。

和leetcode两数之和的区别在于，本题最终解二元组可能有多个解，我们需要在这多个解中找到索引和最小的作为最终解，即我们不仅要求二元组元素之和，还要求二元组索引之和。

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
  const map = {};
 
  let minIdxSum = Infinity;
  let ans = "";
 
  for (let idx1 = 0; idx1 < steps.length; idx1++) {
    const step1 = steps[idx1];
    const step2 = count - step1;
 
    if (map[step2] != undefined) {
      const idx2 = map[step2];
      const idxSum = idx1 + idx2;
      if (idxSum < minIdxSum) {
        minIdxSum = idxSum;
        ans = idx1 < idx2 ? `[${step1}, ${step2}]` : `[${step2}, ${step1}]`;
      }
    } else {
      map[step1] = idx1;
    }
  }
 
  return ans;
}
```

java

```
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;
 
public class Main {
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
    HashMap<Integer, Integer> map = new HashMap<>();
 
    int minIdxSum = Integer.MAX_VALUE;
    String ans = "";
 
    for (int idx1 = 0; idx1 < steps.length; idx1++) {
      int step1 = steps[idx1];
      int step2 = count - step1;
 
      if (map.containsKey(step2)) {
        int idx2 = map.get(step2);
        int idxSum = idx1 + idx2;
        if (idxSum < minIdxSum) {
          minIdxSum = idxSum;
          ans = idx1 < idx2 ? "[" + step1 + ", " + step2 + "]" : "[" + step2 + ", " + step1 + "]";
        }
 
      } else {
        map.put(step1, idx1);
      }
    }
 
    return ans;
  }
}
```

py

```
# 输入获取
import sys
 
steps = list(map(int, input()[1:-1].split(",")))
count = int(input())
 
 
# 算法入口
def getResult():
    dic = {}
 
    minIdxSum = sys.maxsize
    ans = ""
 
    for idx1 in range(len(steps)):
        step1 = steps[idx1]
        step2 = count - step1
        if dic.get(step2) is None:
            dic[step1] = idx1
        else:
            idx2 = dic[step2]
            idxSum = idx1 + idx2
            if idxSum < minIdxSum:
                minIdxSum = idxSum
                ans = f"[{step1}, {step2}]" if idx1 < idx2 else f"[{step2}, {step1}]"
 
    return ans
 
 
# 算法调用
print(getResult())
```

