题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0-N的箱子，每个箱子上面有一个数字，箱子排列成一个环，编号最大的箱子的下一个是编号为0的箱子。

请输出每个箱了贴的数字之后的第一个比它大的数，如果不存在则输出-1。

输入描述
输入一个数字字串，数字之间使用逗号分隔，例如: 1,2,3,1

1 ≤ 字串中数字个数 ≤ 10000:
-100000 ≤ 每个数字值 ≤ 100000
输出描述
下一个大的数列表，以逗号分隔，例如: 2,3,6,-1,6

用例
输入	2,5,2
输出	5,-1,5
说明	
第一个2的下一个更大的数是5;

数字5找不到下一个更大的数;

第二个2的下一个最大的数需要循环搜索，结果也是 5

输入	3,4,5,6,3
输出	4,5,6,-1.4
说明	无
题目解析
本题就是LeetCode - 503 下一个更大元素 II_正整数组nums 下一个更大元素 没有 输出0_伏城之外的博客-CSDN博客

的换皮题，解析可以参考链接博客。

Java算法源码

```
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.StringJoiner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int[] arr = Arrays.stream(sc.nextLine().split(",")).mapToInt(Integer::parseInt).toArray();
    System.out.println(getResult(arr));
  }
 
  public static String getResult(int[] arr) {
    LinkedList<int[]> stack = new LinkedList<>();
 
    int[] res = new int[arr.length];
    Arrays.fill(res, -1);
 
    findNextBig(arr, stack, res);
 
    if (stack.size() != 1) findNextBig(arr, stack, res);
 
    StringJoiner sj = new StringJoiner(",");
    for (int v : res) {
      sj.add(v + "");
    }
    return sj.toString();
  }
 
  public static void findNextBig(int[] arr, LinkedList<int[]> stack, int[] res) {
    for (int i = 0; i < arr.length; i++) {
      int ele = arr[i];
      while (true) {
        if (stack.size() == 0) {
          stack.add(new int[] {ele, i});
          break;
        } else {
          int[] peek = stack.get(stack.size() - 1);
          int peekEle = peek[0];
          int peekIdx = peek[1];
 
          if (ele > peekEle) {
            res[peekIdx] = ele;
            stack.removeLast();
          } else {
            stack.add(new int[] {ele, i});
            break;
          }
        }
      }
    }
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
  const stack = [];
  const res = new Array(arr.length).fill(-1);
 
  findNextBig(arr, stack, res);
 
  if (stack.length != 1) findNextBig(arr, stack, res);
 
  return res.join(",");
}
 
function findNextBig(arr, stack, res) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
 
    while (true) {
      if (stack.length == 0) {
        stack.push([ele, i]);
        break;
      } else {
        const [peekEle, peekIdx] = stack.at(-1);
 
        if (ele > peekEle) {
          res[peekIdx] = ele;
          stack.pop();
        } else {
          stack.push([ele, i]);
          break;
        }
      }
    }
  }
}
```

py

```
# 输入获取
arr = list(map(int, input().split(",")))
 
 
def findNextBig(arr, stack, res):
    for i in range(len(arr)):
        ele = arr[i]
 
        while True:
            if len(stack) == 0:
                stack.append([ele, i])
                break
            else:
                peekEle, peekIdx = stack[-1]
 
                if ele > peekEle:
                    res[peekIdx] = ele
                    stack.pop()
                else:
                    stack.append([ele, i])
                    break
 
 
# 算法入口
def getResult():
    stack = []
    res = [-1] * len(arr)
 
    findNextBig(arr, stack, res)
 
    if len(stack) != 1:
        findNextBig(arr, stack, res)
 
    return ",".join(map(str, res))
 
 
# 算法调用
print(getResult())
```

