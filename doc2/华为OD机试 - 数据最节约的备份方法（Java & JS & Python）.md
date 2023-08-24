题目描述
有若干个文件，使用刻录光盘的方式进行备份，假设每张光盘的容量是500MB，求使用光盘最少的文件分布方式

所有文件的大小都是整数的MB，且不超过500MB；文件不能分割、分卷打包

输入描述
一组文件大小的数据

输出描述
使用光盘的数量

备注
不用考虑输入数据不合法的情况；假设最多100个输入文件。

用例
输入	100,500,300,200,400
输出	3
说明	
(100,400),(200,300),(500) 3张光盘即可。

输入和输出内容都不含空格。

输入	1,100,200,300
输出	2
说明	无
题目解析
本题可以分为两步求解：

求光盘数量
检查给定光盘数量（每个光盘500M）是否可以放下所有文件
其中，第一步可以使用二分法求解

要装入所有文件的至少光盘数量为1，即所有文件之和小于等于500M
要装入所有文件的至多光盘数量为文件数量，即每个文件都是500M
我们只需要二分找中间值mid作为可能的解去带入第二步检查即可。

如果第二步，检查mid个光盘可以装入所有文件，那么mid就是一个可能解，我们需要记录它，然后尝试更小更优解，即继续二分，二分右边界max = mid - 1
如果第二步，检查mid个光盘无法装入所有文件，那么说明mid个光盘不够，我们需要尝试更多光盘，即下次二分是，左边界min = mid + 1
关于第二步的实现，可以参考下面桶装球问题：

LeetCode - 698 划分为k个相等的子集_leetcode - 698 划分为k个相等的 集_

本题中的mid就相当于上面题目的k，而本题中光盘的500M相当于上题的子集和。

同时本题要比上面题更简单一点，因为本题不需要装满桶，只需要保证所有球都能放入桶即可。

因此第二步逻辑解析情况上面博客。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const nums = line.split(",").map(Number);
  console.log(getResult(nums));
});
 
function getResult(nums) {
  // 将文件大小降序
  nums.sort((a, b) => b - a);
 
  // 至少分组
  let min = 1;
  // 至多分组
  let max = nums.length;
 
  // 记录题解
  let ans = max;
 
  // 二分
  while (min <= max) {
    const mid = (min + max) >> 1;
 
    // 看nums是否可以分为mid组，每组之和小于等于500
    if (check(mid, nums)) {
      // 可以分成功，则mid就是一个可能解
      ans = mid;
      // 继续尝试更小解
      max = mid - 1;
    } else {
      // 不可以分成功，则mid取消了，即分组少了，下次应该尝试更大分组数
      min = mid + 1;
    }
  }
 
  return ans;
}
 
function check(count, nums) {
  // nums数组中的数是否可以分为count组，每组之和<=500
  // 这个问题可以使用回溯算法，将count组想象成count个桶，每个桶容量500，nums数组元素就是小球，我们需要将所有小球放到count个桶中，保证每个桶容量不超
  const buckets = new Array(count).fill(0);
  return partition(buckets, nums, 0);
}
 
function partition(buckets, nums, index) {
  if (index == nums.length) {
    return true;
  }
 
  const select = nums[index];
  for (let i = 0; i < buckets.length; i++) {
    if (i > 0 && buckets[i] == buckets[i - 1]) continue; // 此处判断会极大优化性能
 
    if (buckets[i] + select <= 500) {
      buckets[i] += select;
      if (partition(buckets, nums, index + 1)) return true;
      buckets[i] -= select;
    }
  }
 
  return false;
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    Integer[] nums =
        Arrays.stream(sc.nextLine().split(",")).map(Integer::parseInt).toArray(Integer[]::new);
 
    System.out.println(getResult(nums));
  }
 
  public static int getResult(Integer[] nums) {
    // 将文件大小降序
    Arrays.sort(nums, (a, b) -> b - a);
 
    // 至少分组
    int min = 1;
    // 至多分组
    int max = nums.length;
 
    // 记录题解
    int ans = max;
 
    // 二分
    while (min <= max) {
      int mid = (min + max) >> 1;
 
      // 看nums是否可以分为mid组，每组之和小于等于500
      if (check(mid, nums)) {
        // 可以分成功，则mid就是一个可能解
        ans = mid;
        // 继续尝试更小解
        max = mid - 1;
      } else {
        // 不可以分成功，则mid取消了，即分组少了，下次应该尝试更大分组数
        min = mid + 1;
      }
    }
 
    return ans;
  }
 
  public static boolean check(int count, Integer[] nums) {
    // nums数组中的数是否可以分为count组，每组之和<=500
    // 这个问题可以使用回溯算法，将count组想象成count个桶，每个桶容量500，nums数组元素就是小球，我们需要将所有小球放到count个桶中，保证每个桶容量不超
    int[] buckets = new int[count];
    return partition(buckets, nums, 0);
  }
 
  public static boolean partition(int[] buckets, Integer[] nums, int index) {
    if (index == nums.length) {
      return true;
    }
 
    int select = nums[index];
    for (int i = 0; i < buckets.length; i++) {
      if (i > 0 && buckets[i] == buckets[i - 1]) continue; // 此处判断会极大优化性能
 
      if (buckets[i] + select <= 500) {
        buckets[i] += select;
        if (partition(buckets, nums, index + 1)) return true;
        buckets[i] -= select;
      }
    }
 
    return false;
  }
}
```

py

```
# 输入获取
nums = list(map(int, input().split(",")))
 
 
def partition(buckets, nums, index):
    if index == len(nums):
        return True
 
    select = nums[index]
    for i in range(len(buckets)):
        if i > 0 and buckets[i] == buckets[i - 1]:  # 此处判断会极大优化性能
            continue
 
        if buckets[i] + select <= 500:
            buckets[i] += select
            if partition(buckets, nums, index + 1):
                return True
            buckets[i] -= select
 
    return False
 
 
def check(count, nums):
    # nums数组中的数是否可以分为count组，每组之和<=500
    # 这个问题可以使用回溯算法，将count组想象成count个桶，每个桶容量500，nums数组元素就是小球，我们需要将所有小球放到count个桶中，保证每个桶容量不超
    buckets = [0] * count
    return partition(buckets, nums, 0)
 
 
# 算法入口
def getResult():
    # 将文件大小降序
    nums.sort(reverse=True)
 
    # 至少分组
    low = 1
    # 至多分组
    high = len(nums)
 
    # 记录题解
    ans = high
 
    # 二分
    while low <= high:
        mid = (low + high) >> 1
 
        # 看nums是否可以分为mid组，每组之和小于等于500
        if check(mid, nums):
            # 可以分成功，则mid就是一个可能解
            ans = mid
            # 继续尝试更小解
            high = mid - 1
        else:
            # 不可以分成功，则mid取消了，即分组少了，下次应该尝试更大分组数
            low = mid + 1
 
    return ans
 
 
# 算法调用
print(getResult())
```

