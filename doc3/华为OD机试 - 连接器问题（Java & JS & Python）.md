题目描述
有一组区间[a0，b0]，[a1，b1]，…（a，b表示起点，终点），区间有可能重叠、相邻，重叠或相邻则可以合并为更大的区间；

给定一组连接器[x1，x2，x3，…]（x表示连接器的最大可连接长度，即x>=gap），可用于将分离的区间连接起来，但两个分离区间之间只能使用1个连接器；

请编程实现使用连接器后，最少的区间数结果。

区间数量<10000，a,b均 <=10000
连接器梳理<10000；x <= 10000

输入描述
区间组：[1,10],[15,20],[18,30],[33，40]
连接器组：[5,4,3,2]

输出描述
1

说明：

合并后：[1,10],[15,30],[33,40]，使用5, 3两个连接器连接后只剩下 [1, 40]。

用例

输入	[1,10],[15,20],[18,30],[33,40]
[5,4,3,2]
输出	1
说明	合并后：[1,10], [15,30], [33,40]，使用5, 3两个连接器连接后只剩下[1,40]。
输入	[1,2],[3,5],[7,10],[15,20],[30,100]
[5,4,3,2,1]
输出	2
说明	无重叠和相邻，使用1，2，5三个连接器连接后只剩下[1,20]，[30,100]

题目解析
我的解题思路如下：

首先将第一行输入的区间ranges，按照起点值升序排序。然后进行区间合并。

区间合并的逻辑如下，创建一个辅助数组mergeRanges，将ranges[0]从ranges中出队，并加入mergeRanges，作为其初始值。

然后，循环遍历ranges中剩余区间，

如果ranges[i]和mergeRanges.at(-1)栈顶元素可以合并，则将mergeRanges栈顶元素弹出，并加入合并后区间。
如果ranges[i]和mergeRanges.at(-1)栈顶元素无法合并，则先计算ranges[i]的终点和栈顶mergeRanges.at(-1)的起点的差值diff，加入diffs数组中，然后将ranges[i]压入mergeRanges
以上逻辑运行完后，我们就得到了一个diffs数组。diffs保存的是合并后相邻区间之间的空隙大小。

现在想要最少的区间数，即我们应该尽量让连接器不要浪费，即最好找到一个空隙长度相等的连接器，这样就可以防止一个很长的连接器来连一个很短的空隙，导致后面遇到很长的空隙时，没有适合的连接器使用。

我们将diffs数组降序排序，将第二行输入的连接器connects数组降序排序。

然后不停的弹出connects栈顶元素，即最小长度的连接器，来对比diffs数组栈顶元素，即最短的空隙，如果最小长度的连接器 可以满足 最短的空隙，则将diffs栈顶元素弹出，否则不弹出，继续找下一个连接器。

最终，diffs数组长度 + 1 就是区间数，因为两个区间有一个空隙，因此空隙个数+1就是区间个数。

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
    const ranges = JSON.parse(`[${lines[0]}]`);
    const connects = JSON.parse(lines[1]);
 
    console.log(getResult(ranges, connects));
    lines.length = 0;
  }
});
 
function getResult(ranges, connects) {
  ranges.sort((a, b) => a[0] - b[0]);
 
  const mergeRanges = [ranges.shift()];
  const diffs = [];
 
  for (let range of ranges) {
    const [s1, e1] = mergeRanges.at(-1);
    const [s2, e2] = range;
 
    if (s2 <= e1) {
      mergeRanges.pop();
      mergeRanges.push([s1, Math.max(e1, e2)]);
    } else {
      diffs.push(s2 - e1);
      mergeRanges.push(range);
    }
  }
 
  diffs.sort((a, b) => b - a);
  connects.sort((a, b) => b - a);
 
  while (connects.length && diffs.length) {
    if (connects.pop() >= diffs.at(-1)) {
      diffs.pop();
    }
  }
 
  return diffs.length + 1;
}
```

### Java算法源码

```
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String f = sc.nextLine();
    Integer[][] ranges =
        Arrays.stream(f.substring(1, f.length() - 1).split("],\\["))
            .map(
                str -> Arrays.stream(str.split(",")).map(Integer::parseInt).toArray(Integer[]::new))
            .toArray(Integer[][]::new);
 
    String s = sc.nextLine();
    List<Integer> connects =
        Arrays.stream(s.substring(1, s.length() - 1).split(","))
            .map(Integer::parseInt)
            .collect(Collectors.toList());
 
    System.out.println(getResult(ranges, connects));
  }
 
  public static int getResult(Integer[][] ranges, List<Integer> connects) {
    Arrays.sort(ranges, (a, b) -> a[0] - b[0]);
 
    LinkedList<Integer[]> mergeRanges = new LinkedList<>();
    mergeRanges.addLast(ranges[0]);
 
    LinkedList<Integer> diffs = new LinkedList<>();
 
    for (int i = 1; i < ranges.length; i++) {
      Integer[] last = mergeRanges.getLast();
      int s1 = last[0];
      int e1 = last[1];
 
      Integer[] range = ranges[i];
      int s2 = range[0];
      int e2 = range[1];
 
      if (s2 <= e1) {
        mergeRanges.removeLast();
        mergeRanges.addLast(new Integer[] {s1, Math.max(e1, e2)});
      } else {
        diffs.addLast(s2 - e1);
        mergeRanges.addLast(range);
      }
    }
 
    diffs.sort((a, b) -> b - a);
    connects.sort((a, b) -> b - a);
 
    while (connects.size() > 0 && diffs.size() > 0) {
      if (connects.remove(connects.size() - 1) >= diffs.getLast()) {
        diffs.removeLast();
      }
    }
 
    return diffs.size() + 1;
  }
}
```

### Python算法源码

```
# 输入获取
rans = eval("[" + input() + "]")
connects = eval(input())
 
 
# 算法入口
def getResult(rans, connects):
    rans.sort(key=lambda x: x[0])
 
    mergeRan = [rans.pop(0)]
    diffs = []
 
    for ran in rans:
        s1, e1 = mergeRan[-1]
        s2, e2 = ran
 
        if s2 <= e1:
            mergeRan.pop()
            mergeRan.append([s1, max(e1, e2)])
        else:
            diffs.append(s2 - e1)
            mergeRan.append(ran)
 
    diffs.sort(reverse=True)
    connects.sort(reverse=True)
 
    while len(connects) > 0 and len(diffs) > 0:
        if connects.pop() >= diffs[-1]:
            diffs.pop()
 
    return len(diffs) + 1
 
 
# 算法调用
print(getResult(rans, connects))
```

