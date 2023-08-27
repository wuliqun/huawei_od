题目描述
去除文本多余空格，但不去除配对单引号之间的多余空格。给出关键词的起始和结束下标，去除多余空格后刷新关键词的起始和结束下标。

条件约束：
1，不考虑关键词起始和结束位置为空格的场景；
2，单词的的开始和结束下标保证涵盖一个完整的单词，即一个坐标对开始和结束下标之间不会有多余的空格；
3，如果有单引号，则用例保证单引号成对出现；
4，关键词可能会重复；
5，文本字符长度length取值范围：[0, 100000];

输入描述
输入为两行字符串：

第一行：待去除多余空格的文本，用例保证如果有单引号，则单引号成对出现，且单引号可能有多对。

第二行：关键词的开始和结束坐标，关键词间以逗号区分，关键词内的开始和结束位置以单空格区分。

输出描述
输出为两行字符串：

第一行：去除多余空格后的文本
第二行：去除多余空格后的关键词的坐标开始和结束位置，为数组方式输出。

用例

输入	Life is painting a  picture, not doing 'a  sum'.
8 15,20 26,43 45
输出	Life is painting a picture, not doing 'a  sum'.
[8, 15][19, 25][42, 44]
说明	
a和picture中间多余的空格进行删除

输入	Life is painting a picture, not doin 'a  sum'.
8 15,19 25,42 44
输出	
Life is painting a picture, not doing 'a  sum'.
[8, 15][19, 25][42, 44]

说明	a和sum之间有多余的空格，但是因为有成对单引号，不去除多余空格

我的解题思路如下：

定义一个数组needDel，记录需要被删除的空格的位置，定义一个变量quotaStart，记录是否已有未闭合的单引号，默认为false，即没有。

遍历输入字符串的每一个字符，

首先看被遍历的字符c是不是" "空格

如果不是，则继续后面逻辑
如果是，则看当前遍历字符的前一个字符是不是也是“ ”，如果不是则继续后面逻辑，如果是，则看quotaStart是否为false，若不是，则继续后面逻辑，若是，则说明空格c就是需要删除的空格，我们将其索引位置记录到needDel中
然后看遍历的字符c是不是单引号，若是，则将quotaStart取反（表示单引号开闭）

当扫描完后，我们就可以做两件事：

1、将输入字符串转为数组，根据needDel中记录的索引，来删除对应空格（即替换对应数组元素为“”空串），然后将数组join后打印

2、双重for，外层遍历needDel获得每一个要删除的空格的索引，内存遍历题目第一行输入的多组开始、结束位置arr，如果要删除的空格处于开始位置之前，则对应开始，结束位置都要减去1。

我们需要注意的是：我们不能基于原始的arr处理，应该对arr进行深拷贝后，对拷贝数组进行处理，因为如果基于原始arr进行处理，则会造成needDel中要删除的索引，和arr中记录的索引不同步。

比如 needDel = [18,19]，arr = [ [8,15], [20,26], [43,45] ]

如果我们直接在arr上进行操作，则

首先needDel遍历出18，然后对比每一个arr范围的开始位置，发现[20,26], [43,45]在18后面，因此当18位置的空格删除后，这两个范围都要前移，因此arr变为了[[8,15], [19,25], [42,44]]。

之后needDel遍历出19，然后对比每一个arr范围的开始位置，发现和[19,25]产生了冲突，因为19坐标位置既是要删除的空格，又是一个关键词的起始位置，造成这种冲突的原因是此时needDel 19 和 arr范围[19,25] 已经不同步了。

因此我们要对，arr进行深拷贝后（数组元素是数组，需要深拷贝，可以使用最简单的JSON方法实现深拷贝），然后needDel和原始arr进行对比操作，具体范围移动操作在arr的拷贝对象上处理。

但是本题的文本字符长度length取值范围：[0, 100000];

这个有点大啊，会不会爆内存呢？有点悬。

JavaScript算法源码
克隆版（85%通过率）

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
    const str = lines[0];
    const arr = lines[1].split(",").map((pos) => pos.split(" ").map(Number));
    getResult(arr, str);
    lines.length = 0;
  }
});
 
function getResult(arr, str) {
  let quotaStart = false;
  const needDel = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " && str[i - 1] === " " && !quotaStart) {
      needDel.push(i);
    }
 
    if (str[i] === "'") {
      quotaStart = !quotaStart;
    }
  }
 
  const strArr = [...str];
  const ans = JSON.parse(JSON.stringify(arr)); // 深拷贝
  for (let del of needDel) {
    strArr[del] = "";
    for (let i = 0; i < arr.length; i++) {
      const [start] = arr[i];
      if (del < start) {
        ans[i][0]--;
        ans[i][1]--;
      }
    }
  }
 
  console.log(strArr.join(""));
  console.log(ans.map((ran) => JSON.stringify(ran)).join(""));
}
```

倒序版

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
    const str = lines[0];
    const arr = lines[1].split(",").map((pos) => pos.split(" ").map(Number));
    getResult(arr, str);
    lines.length = 0;
  }
});
 
function getResult(arr, str) {
  let quotaStart = false;
  const needDel = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " && str[i - 1] === " " && !quotaStart) {
      needDel.push(i);
    }
 
    if (str[i] === "'") {
      quotaStart = !quotaStart;
    }
  }
 
  const strArr = [...str];
  for (let i = needDel.length - 1; i >= 0; i--) {
    const del = needDel[i];
    strArr[del] = "";
    for (let i = 0; i < arr.length; i++) {
      const start = arr[i][0];
      if (del < start) {
        arr[i][0]--;
        arr[i][1]--;
      }
    }
  }
 
  console.log(strArr.join(""));
  console.log(arr.map((ran) => JSON.stringify(ran)).join(""));
}
```

### Java算法源码

克隆版（85%通过率）

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        String str = sc.nextLine();
 
        Integer[][] ranges =
                Arrays.stream(sc.nextLine().split(","))
                        .map(s -> Arrays.stream(s.split(" "))
                                .map(Integer::parseInt)
                                .toArray(Integer[]::new))
                        .toArray(Integer[][]::new);
 
        getResult(str, ranges);
    }
 
    public static void getResult(String str, Integer[][] ranges) {
        boolean quotaStart = false;
        ArrayList<Integer> needDel = new ArrayList<>();
 
        for (int i = 0; i < str.length(); i++) {
            if (i > 0 && ' ' == str.charAt(i) && ' ' == str.charAt(i - 1) && !quotaStart) {
                needDel.add(i);
            }
 
            if ('\'' == str.charAt(i)) {
                quotaStart = !quotaStart;
            }
        }
 
        char[] cArr = str.toCharArray();
        Integer[][] ans = Arrays.stream(ranges).map(Integer[]::clone).toArray(Integer[][]::new);
 
        for (Integer del : needDel) {
            cArr[del] = '\u0000';
            for (int i = 0; i < ranges.length; i++) {
                int start = ranges[i][0];
                if (del < start) {
                    ans[i][0]--;
                    ans[i][1]--;
                }
            }
        }
 
        System.out.println(new String(cArr).replace("\u0000", ""));
 
        StringBuilder sb = new StringBuilder();
        for (Integer[] an : ans) {
            sb.append(Arrays.toString(an));
        }
        System.out.println(sb);
 
 
    }
}
```

倒序版

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String str = sc.nextLine();
 
    Integer[][] ranges =
        Arrays.stream(sc.nextLine().split(","))
            .map(s -> Arrays.stream(s.split(" ")).map(Integer::parseInt).toArray(Integer[]::new))
            .toArray(Integer[][]::new);
 
    getResult(str, ranges);
  }
 
  public static void getResult(String str, Integer[][] ranges) {
    boolean quotaStart = false;
    ArrayList<Integer> needDel = new ArrayList<>();
 
    String[] sArr = str.split("");
 
    for (int i = 0; i < sArr.length; i++) {
      if (i > 0 && " ".equals(sArr[i]) && " ".equals(sArr[i - 1]) && !quotaStart) {
        needDel.add(i);
      }
 
      if ("'".equals(sArr[i])) {
        quotaStart = !quotaStart;
      }
    }
 
    for (int j = needDel.size() - 1; j >= 0; j--) {
      int del = needDel.get(j);
      sArr[del] = "";
      for (int i = 0; i < ranges.length; i++) {
        int start = ranges[i][0];
        if (del < start) {
          ranges[i][0]--;
          ranges[i][1]--;
        }
      }
    }
 
    StringBuilder sb = new StringBuilder();
    for (Integer[] an : ranges) {
      sb.append(Arrays.toString(an));
    }
    System.out.println(sb);
  }
}
```

### Python算法源码

克隆版

```
import copy
 
# 输入获取
s = input()
arr = list(map(lambda x: list(map(int, x.split())), input().split(",")))
 
 
# 算法入口
def getResult(arr, s):
    quotaStart = False
    needDel = []
 
    for i in range(len(s)):
        if s[i] == " " and s[i - 1] == " " and not quotaStart:
            needDel.append(i)
 
        if s[i] == "\'":
            quotaStart = not quotaStart
 
    sArr = list(s)
    ans = copy.deepcopy(arr)
 
    for d in needDel:
        sArr[d] = ""
        for i in range(len(arr)):
            start = arr[i][0]
            if d < start:
                ans[i][0] -= 1
                ans[i][1] -= 1
 
    print("".join(sArr))
    print("".join(list(map(lambda x: str(x), ans))))
 
 
# 算法调用
getResult(arr, s)
```

倒序版

```
# 输入获取
s = input()
arr = list(map(lambda x: list(map(int, x.split())), input().split(",")))
 
 
# 算法入口
def getResult(arr, s):
    quotaStart = False
    needDel = []
 
    for i in range(len(s)):
        if s[i] == " " and s[i - 1] == " " and not quotaStart:
            needDel.append(i)
 
        if s[i] == "'":
            quotaStart = not quotaStart
 
    sArr = list(s)
 
    needDel.reverse()
    for d in needDel:
        sArr[d] = ""
        for i in range(len(arr)):
            start = arr[i][0]
            if d < start:
                arr[i][0] -= 1
                arr[i][1] -= 1
 
    print("".join(sArr))
    print("".join(list(map(lambda x: str(x), arr))))
 
 
# 算法调用
getResult(arr, s)
```

