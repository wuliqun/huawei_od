题目描述
公司创新实验室正在研究如何最小化资源成本，最大化资源利用率，请你设计算法帮他们解决一个任务混部问题：

有taskNum项任务，每个任务有开始时间（startTime），结束时间（endTime），并行度（parallelism）三个属性，

并行度是指这个任务运行时将会占用的服务器数量，一个服务器在每个时刻可以被任意任务使用但最多被一个任务占用，任务运行完成立即释放（结束时刻不占用）。

任务混部问题是指给定一批任务，让这批任务由同一批服务器承载运行，

请你计算完成这批任务混部最少需要多少服务器，从而最大化控制资源成本。

输入描述
第一行输入为taskNum，表示有taskNum项任务
接下来taskNum行，每行三个整数，表示每个任务的

开始时间（startTime ），结束时间（endTime ），并行度（parallelism）

输出描述
一个整数，表示最少需要的服务器数量

备注
1 <= taskNum <= 100000
0 <= startTime < endTime <= 50000
1 <= parallelism <= 100
用例

输入	3
2 3 1
6 9 2
0 5 1
输出	2
说明	
一共有三个任务，

第一个任务在时间区间[2, 3]运行，占用1个服务器，
第二个任务在时间区间[6, 9]运行，占用2个服务器，
第三个任务在时间区间[0, 5]运行，占用1个服务器，
需要最多服务器的时间区间为[2, 3]和[6, 9]，需要2个服务器。

输入	2
3 9 2
4 7 3
输出	5
说明	
一共两个任务，

第一个任务在时间区间[3, 9]运行，占用2个服务器，
第二个任务在时间区间[4, 7]运行，占用3个服务器，
需要最多服务器的时间区间为[4, 7]，需要5个服务器。

最大区间重叠个数求解
本题可以用求解最大区间重叠个数的方式求解。

首先，将所有区间按开始位置升序
然后，遍历排序后区间，并将小顶堆中小于遍历区间起始位置的区间弹出（小顶堆实际存储区间结束位置），此操作后，小顶堆中剩余的区间个数，就是和当前遍历区间重叠数。
我们只需要在求解最大重叠数时，保留遍历的区间的起始位置即可。

但是本题并不是要求解最大区间重叠个数，而是要求解重叠区间的权重和。因此，我们需要定义一个变量sum来记录重叠区间的权重和，当小顶堆弹出不重叠区间时，sum需要减去被弹出区间的权重，当我们向小顶堆压入重叠区间时，则sum需要加上被压入区间的权重。

JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length === n + 1) {
    const ranges = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(ranges));
    lines.length = 0;
  }
});
 
function getResult(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  const end = new PriorityQueue((a, b) => b[0] - a[0]);
 
  let max = 0;
  let sum = 0;
  for (let range of ranges) {
    const [s, e, p] = range;
 
    while (end.size()) {
      const top = end.peek();
 
      if (top[0] <= s) {
        const poll = end.shift();
        sum -= poll[1];
      } else {
        break;
      }
    }
 
    end.push([e, p]);
    sum += p;
 
    if (sum > max) {
      max = sum;
    }
  }
 
  return max;
}
 
class PriorityQueue {
  constructor(cpr) {
    this.queue = [];
    this.cpr = cpr;
  }
 
  swap(a, b) {
    const tmp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = tmp;
  }
 
  // 上浮
  swim() {
    let c = this.queue.length - 1;
 
    while (c >= 1) {
      const f = Math.floor((c - 1) / 2);
 
      if (this.cpr(this.queue[c], this.queue[f]) > 0) {
        this.swap(c, f);
        c = f;
      } else {
        break;
      }
    }
  }
 
  // 入队
  push(val) {
    this.queue.push(val);
    this.swim();
  }
 
  // 下沉
  sink() {
    let f = 0;
 
    while (true) {
      let c1 = 2 * f + 1;
      let c2 = c1 + 1;
 
      let c;
      let val1 = this.queue[c1];
      let val2 = this.queue[c2];
      if (val1 && val2) {
        c = this.cpr(val1, val2) > 0 ? c1 : c2;
      } else if (val1 && !val2) {
        c = c1;
      } else if (!val1 && val2) {
        c = c2;
      } else {
        break;
      }
 
      if (this.cpr(this.queue[c], this.queue[f]) > 0) {
        this.swap(c, f);
        f = c;
      } else {
        break;
      }
    }
  }
 
  // 出队
  shift() {
    this.swap(0, this.queue.length - 1);
    const res = this.queue.pop();
    this.sink();
    return res;
  }
 
  // 查看顶
  peek() {
    return this.queue[0];
  }
 
  size() {
    return this.queue.length;
  }
}
```

### Java算法源码

```
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[][] ranges = new int[n][3];
 
    for (int i = 0; i < n; i++) {
      ranges[i][0] = sc.nextInt();
      ranges[i][1] = sc.nextInt();
      ranges[i][2] = sc.nextInt();
    }
 
    System.out.println(getResult(ranges));
  }
 
  public static int getResult(int[][] ranges) {
    Arrays.sort(ranges, (a, b) -> a[0] - b[0]);
 
    PriorityQueue<Integer[]> end = new PriorityQueue<>((a, b) -> a[0] - b[0]);
 
    int max = 0;
    int sum = 0;
    for (int[] range : ranges) {
      int s = range[0];
      int e = range[1];
      int p = range[2];
 
      while (end.size() > 0) {
        Integer[] top = end.peek();
 
        if (top[0] <= s) {
          Integer[] poll = end.poll();
          sum -= poll[1];
        } else {
          break;
        }
      }
 
      end.offer(new Integer[] {e, p});
      sum += p;
 
      if (sum > max) {
        max = sum;
      }
    }
    return max;
  }
}
```

### Python算法源码

```
import queue
 
# 输入获取
taskNum = int(input())
ranges = [list(map(int, input().split())) for i in range(taskNum)]
 
 
# 算法入口
def getResult(ranges):
    ranges.sort(key=lambda x: x[0])
    end = queue.PriorityQueue()
    maxV = 0
    sum = 0
 
    for ran in ranges:
        s, e, p = ran
 
        while end.qsize() > 0:
            top = end.queue[0]
 
            if top[0] <= s:
                poll = end.get()
                sum -= poll[1]
            else:
                break
 
        end.put((e, p))
        sum += p
 
        if sum > maxV:
            maxV = sum
 
    return maxV
 
 
# 算法调用
print(getResult(ranges))
```

## 差分数列求解

当我们要给区间的某个范围的每个元素加上相同的增量时，此时最简单的方法就是先求解对应区间的差分数列，然后在差分数列对应范围的左右边界上做处理

### Java算法源码

```
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[][] ranges = new int[n][3];
 
    for (int i = 0; i < n; i++) {
      ranges[i][0] = sc.nextInt();
      ranges[i][1] = sc.nextInt();
      ranges[i][2] = sc.nextInt();
    }
 
    System.out.println(getResult(ranges));
  }
 
  public static int getResult(int[][] ranges) {
    int[] arr = new int[50000];
 
    for (int[] range : ranges) {
      int start = range[0];
      int end = range[1];
      int diff = range[2];
 
      arr[start] += diff;
      // 结束时刻不占用，因此不需要end+1
      arr[end] -= diff;
    }
 
    int ans = arr[0];
 
    // 求解差分数列的前缀和
    for (int i = 1; i < arr.length; i++) {
      arr[i] += arr[i - 1];
      ans = Math.max(ans, arr[i]);
    }
 
    return ans;
  }
}
```

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length === n + 1) {
    const ranges = lines.slice(1).map((line) => line.split(" ").map(Number));
    console.log(getResult(ranges));
    lines.length = 0;
  }
});
 
function getResult(ranges) {
  const arr = new Array(50000).fill(0);
 
  for (let [start, end, diff] of ranges) {
    arr[start] += diff;
    // 结束时刻不占用，因此不需要end+1
    arr[end] -= diff;
  }
 
  // 求解差分数列的前缀和
  let ans = arr[0];
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
    ans = Math.max(ans, arr[i]);
  }
 
  return ans;
}
```

### Python算法源码

```
# 输入获取
taskNum = int(input())
ranges = [list(map(int, input().split())) for i in range(taskNum)]
 
 
# 算法入口
def getResult(ranges):
    arr = [0]*50000
 
    for start, end, diff in ranges:
        arr[start] += diff
        # 结束时刻不占用，因此不需要end+1
        arr[end] -= diff
 
    ans = arr[0]
    # 求解差分数列的前缀和
    for i in range(1, 50000):
        arr[i] += arr[i-1]
        ans = max(ans, arr[i])
 
    return ans
 
 
# 算法调用
print(getResult(ranges))
```

