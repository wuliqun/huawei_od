题目描述
给定一个整数数组 nums、一个数字k，一个整数目标值 target，请问nums中是否存在k个元素使得其相加结果为target，请输出所有符合条件且不重复的k元组的个数

数据范围

2 ≤ nums.length ≤ 200
-10^9 ≤ nums[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9
2 ≤ k ≤ 100
输入描述
第一行是nums取值：2 7 11 15

第二行是k的取值：2

第三行是target取值：9

输出描述
输出第一行是符合要求的元组个数：1

补充说明：[2,7]满足，输出个数是1

用例
输入	-1 0 1 2 -1 -4
3
0
输出	2
说明	[-1,0,1]，[-1,-1,2]满足条件
输入	2 7 11 15
2
9
输出	1
说明	[2,7]符合条件
题目解析
本题其实就是要求K数之和。

本题的K数之和，和LintCode - 89 K数之和_伏城之外的博客-CSDN博客是存在区别的，

本题的要求的K元组是从整数数组中选取的，这里的整数数组，既可能包含正数，也可能包含负数，也可能包含0，另外最终求得的符合要求的K元组，还要进行去重。

因此，本题无法参考：LintCode - 89 K数之和

本题其实需要参考：

LeetCode - 15 三数之和

LeetCode - 18 四数之和

这两题。如果你对这两题不熟悉，请做本题前，先做完前面这两题，这两题是基础。否则下面代码会看不懂。

其中三数之和，是需要固定三元组中的最小的一个值，然后通过双指针找到剩余两个数。

其中四数之和，是需要固定四元组中的最小的两个值，然后通过双指针找到剩余两个数。

而K数之和，其实需要固定K元组中最小的K-2个值，然后通过双指针找到剩余两个数。

因此，下面代码实现中分为了两部分：

K-2重for循环完成 K元组中最小的K-2个值的确定
通过双指针完成剩余两个值的确定
而实际上K的值是不确定的，因此第1部分的K-2重for循环需要通过递归完成。

具体请看下面代码实现。

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
 
  if (lines.length == 3) {
    const nums = lines[0].split(" ").map(Number);
    const k = parseInt(lines[1]);
    const target = parseInt(lines[2]);
 
    console.log(getResult(nums, k, target));
 
    lines.length = 0;
  }
});
 
function getResult(nums, k, target) {
  if (k > nums.length) return 0;
  nums.sort((a, b) => a - b);
  return kSum(nums, k, target, 0, 0, 0);
}
 
// k数之和
function kSum(nums, k, target, start, count, sum) {
  if (k < 2) return count;
 
  if (k == 2) {
    return twoSum(nums, target, start, count, sum);
  }
 
  for (let i = start; i <= nums.length - k; i++) {
    // 剪枝
    if (nums[i] > 0 && sum + nums[i] > target) break;
 
    // 去重
    if (i > start && nums[i] == nums[i - 1]) continue;
 
    count = kSum(nums, k - 1, target, i + 1, count, sum + nums[i]);
  }
 
  return count;
}
 
// 两数之和
function twoSum(nums, target, start, count, preSum) {
  let l = start;
  let r = nums.length - 1;
 
  while (l < r) {
    const sum = preSum + nums[l] + nums[r];
 
    if (sum > target) {
      r--;
    } else if (sum < target) {
      l++;
    } else {
      count++;
      // 去重
      while (l + 1 < r && nums[l] == nums[l + 1]) l++;
      // 去重
      while (r - 1 > l && nums[r] == nums[r - 1]) r--;
      l++;
      r--;
    }
  }
 
  return count;
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    int k = Integer.parseInt(sc.nextLine());
    int target = Integer.parseInt(sc.nextLine());
 
    System.out.println(getResult(nums, k, target));
  }
 
  public static int getResult(int[] nums, int k, int target) {
    if (k > nums.length) return 0;
    Arrays.sort(nums);
    return kSum(nums, k, target, 0, 0, 0);
  }
 
  // k数之和
  public static int kSum(int[] nums, int k, int target, int start, int count, long sum) {
    if (k < 2) return count;
 
    if (k == 2) {
      return twoSum(nums, target, start, count, sum);
    }
 
    for (int i = start; i <= nums.length - k; i++) {
      // 剪枝
      if (nums[i] > 0 && sum + nums[i] > target) break;
 
      // 去重
      if (i > start && nums[i] == nums[i - 1]) continue;
      count = kSum(nums, k - 1, target, i + 1, count, sum + nums[i]);
    }
 
    return count;
  }
 
  // 两数之和
  public static int twoSum(int[] nums, int target, int start, int count, long preSum) {
    int l = start;
    int r = nums.length - 1;
 
    while (l < r) {
      long sum = preSum + nums[l] + nums[r];
 
      if (target < sum) {
        r--;
      } else if (target > sum) {
        l++;
      } else {
        count++;
        // 去重
        while (l + 1 < r && nums[l] == nums[l + 1]) l++;
        // 去重
        while (r - 1 > l && nums[r] == nums[r - 1]) r--;
        l++;
        r--;
      }
    }
 
    return count;
  }
}
```

py

```
# 输入获取
nums = list(map(int, input().split()))
k = int(input())
target = int(input())
 
 
# 两数之和
def twoSum(nums, target, start, count, preTotal):
    l = start
    r = len(nums) - 1
 
    while l < r:
        total = preTotal + nums[l] + nums[r]
 
        if target < total:
            r -= 1
        elif target > total:
            l += 1
        else:
            count += 1
            # 去重
            while l + 1 < r and nums[l] == nums[l + 1]:
                l += 1
            # 去重
            while r - 1 > l and nums[r] == nums[r - 1]:
                r -= 1
            l += 1
            r -= 1
 
    return count
 
 
# k数之和
def kSum(nums, k, target, start, count, total):
    if k < 2:
        return count
 
    if k == 2:
        return twoSum(nums, target, start, count, total)
 
    for i in range(start, len(nums) - k + 1):
        # 剪枝
        if nums[i] > 0 and total + nums[i] > target:
            break
 
        # 去重
        if i > start and nums[i] == nums[i - 1]:
            continue
        count = kSum(nums, k - 1, target, i + 1, count, total + nums[i])
 
    return count
 
 
# 算法入口
def getResult():
    if k > len(nums):
        return 0
 
    nums.sort()
    return kSum(nums, k, target, 0, 0, 0)
 
 
# 算法调用
print(getResult())
```

