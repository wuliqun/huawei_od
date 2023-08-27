题目描述
一支N个士兵的军队正在趁夜色逃亡，途中遇到一条湍急的大河。
敌军在T的时长后到达河面，没到过对岸的士兵都会被消灭。
现在军队只找到了1只小船，这船最多能同时坐上2个士兵。

当1个士兵划船过河，用时为 a[i]；0 <= i < N
当2个士兵坐船同时划船过河时，用时为max(a[j],a[i])两士兵中用时最长的。
当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。
如果士兵下河游泳，则会被湍急水流直接带走，算作死亡。
请帮忙给出一种解决方案，保证存活的士兵最多，且过河用时最短。

输入描述
第一行：N 表示士兵数(0<N<1,000,000)
第二行：T 表示敌军到达时长(0 < T < 100,000,000)
第三行：a[0] a[1] … a[i]… a[N- 1]
a[i]表示每个士兵的过河时长。
(10 < a[i]< 100; 0<= i< N）

输出描述
第一行：”最多存活士兵数” “最短用时”

备注
1）两个士兵的同时划船时，如果划速不同则会导致船原地转圈圈；所以为保持两个士兵划速相同，则需要向划的慢的士兵看齐。
2）两个士兵坐船时，重量增加吃水加深，水的阻力增大；同样的力量划船速度会变慢；
3）由于河水湍急大量的力用来抵消水流的阻力，所以2）中过河用时不是a[i] *2，
而是a[i] * 10。

用例

输入	5
43
12 13 15 20 50
输出	3 40
说明	可以达到或小于43的一种方案：
第一步：a[0] a[1] 过河用时：13
第二步：a[0] 返回用时：12
第三步：a[0] a[2] 过河用时：15
输入	5
130
50 12 13 15 20
输出	5 128
说明	可以达到或小于130的一种方案：
第一步：a[1] a[2] 过河用时：13
第二步：a[1] 返回用时：12
第三步：a[0] a[4] 过河用时：50
第四步：a[2] 返回用时：13
第五步：a[1] a[2] 过河用时：13
第六步：a[1] 返回用时：12
第七步：a[1] a[3] 过河用时：15
所以输出为：
5 128
输入	7
171
25 12 13 15 20 35 20
输出	7 171
说明	
可以达到或小于171的一种方案：
第一步：a[1] a[2] 过桥用时：13
第二步：a[1] 带火把返回用时：12
第三步：a[0] a[5] 过桥用时：35
第四步：a[2] 带火把返回用时：13
第五步：a[1] a[2] 过桥用时：13
第六步：a[1] 带火把返回用时：12
第七步：a[4] a[6] 过桥用时：20
第八步：a[2] 带火把返回用时：13
第九步：a[1] a[3] 过桥用时：15
第十步：a[1] 带火把返回用时：12
第十一步：a[1] a[2] 过桥用时：13

所以输出为：

7 171

### 题目解析

本题是经典的吊桥谜题（过河问题，四人过桥）的变种题，

吊桥谜题解题关键在于：

让最慢的两个人所浪费的时间最小化，这可以通过让他们一起过桥来实现，

因为需要有人提着灯（开船）返回，所以得让速度最快得两个人来完成这个任务。

因此，本题士兵过河的步骤应该如下：

首先让用时最短的两个士兵A，B划船过河到对岸，用时A <= B
然后让B留在对岸，让最快的士兵A划船回来本岸
然后让本岸用时最长的两个士兵划船过河到对岸
然后再让对岸用时最短的士兵B划船回来本岸
按以上逻辑循环，直到用时达到上限T，或者士兵全部运完。

有了以上逻辑基础，我们就可以进一步认识动态规划的状态转移方程了。

没错，本题最好的方式是基于动态规划求解。

首先，我们暂不考虑用时上限T，只考虑将所有士兵运到对岸的需要的最少时间。因此分析如下：

如果只有1个士兵的话，则上面步骤只能走到第1步。
如果只有2个士兵的话，则上面步骤也只能走到第1步。
如果有3个士兵的话，则上面步骤可以走到第3步，且此时是A和用时最长的士兵过河。
如果有4个士兵的话，则上面步骤可以走到第4步，且此时是两个用时最短的士兵A和B过河。
其中只有1个士兵和只有2个士兵的只能走到第1步的原因很容易想到，这里就不赘述了。

而造成3个士兵，和4个士兵走到不同步骤结束的原因是：

抛开用时最短的A，B士兵，剩余用时较慢的士兵是奇数个，还是偶数个。

如果是偶数个，则可以走到上面第4步，如果是奇数个，则只能走到上面第3步。

因为，当我们把士兵B留在对岸，让士兵A回来后，优先让最慢的两个士兵结伴过河，因此最慢的士兵数在不停的减2：

如果最慢的士兵数是奇数个的话，则最终会残留1个，此时刚好和留在本岸的士兵A一起结伴过河，提前结束。
如果最慢的士兵数是偶数个的话，则最终会残留0个，并且最后一组最慢士兵会将船带到对岸，因此需要对岸最快的士兵B把船开回来，然后带上A再一起走。而这也是上面第4步的由来。
我们可以定义一个dp数组，dp[i]的含义是 0~i 士兵全部过河所需的最短时间。

假设每个士兵过河所需时间记录在times数组中，且times数组已经按用时升序。

那么可得：

dp[0] = times[0]

dp[1] = times[1]

dp[i] 的取值有两种选择，如下：

dp[i] = dp[i-1] + times[0] + times[i]

dp[i] = dp[i-2] + times[0] + times[i] + times[1] + times[1]

dp[i] = dp[i-1] + times[0] + times[i] 的含义是：

抛开最快的A，B士兵，剩余较慢的士兵是奇数个，因此最后较慢士兵中会遗留1个在本岸没有人组队，其余 0 ~ i-1 士兵都已经过河（dp[i-1]代表0 ~ i-1士兵全部过河），因此我们需要让对岸最快的士兵A，即 0号士兵送船回来，此时用时times[0]，然后 0号士兵和 i 号士兵一起过河，此时用时times[i]。

dp[i] = dp[i-2] + times[0] + times[i] + times[1] + times[1] 的含义是：

抛开最快的A，B士兵，剩余较慢的士兵是偶数个，因此最后较慢士兵会遗留0个士兵在本岸，但是此时无法找到dp状态转移关系，因此我们后退一步，即当较慢士兵会遗留2个士兵在本岸，即 0 ~ i - 2 的士兵已经全部过河（dp[i-2]代表0~i-2的士兵已经全部过河），因此我们需要让对岸最快的士兵A，即0号士兵送船回来，此时用时times[0]，然后 i - 1 号士兵和 i 号士兵划船过河，用时times[i]，然后对岸最快的B士兵，即1号士兵送船回来，用时times[1]，然后0号士兵和1号士兵再开船到对岸，用时times[1]。

为了dp状态转移方程的简单期间，这里我们不去求解：除了最快的A,B士兵，剩下较慢士兵个数是偶数个还是奇数个，而是直接让：

dp[i] = Math.min(dp[i-1] + times[0] + times[i],  dp[i-2] + times[0] + times[i] + times[1] + times[1] )

即取两种情况的最少用时。

另外，本题还有一个恶心的地方，那就是两个士兵划船用时问题

当2个士兵坐船同时划船过河时，用时为max(a[j],a[i])两士兵中用时最长的。
当2个士兵坐船1个士兵划船时，用时为 a[i]*10；a[i]为划船士兵用时。
其中第2个条件，含义是，如果一个士兵划船奇慢无比，比如两个士兵的划船用时分别是10，200，那么此时如果按照第1个条件的话，则这两个士兵总用时200过河，但是如果按照第2个条件的话，可以只让用时少的士兵划船，只是用时需要乘以10，即这两个士兵总用时10*10=100可以过河。

这个逻辑应该是考察我们关于dp状态转移方程中各组成的理解。即如下三个绿色框选部分，需要添加getMax逻辑，具体请看算法源码

### JavaScript算法源码

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
 
  if (lines.length === 3) {
    const N = lines[0] - 0;
    const T = lines[1] - 0;
    const times = lines[2].split(" ").map(Number);
    console.log(getResult(N, T, times));
    lines.length = 0;
  }
});
 
/**
 *
 * @param {*} N 士兵数
 * @param {*} T 过河时间上限
 * @param {*} times 数组，元素表示每个士兵的过河时长
 */
function getResult(N, T, times) {
  times.sort((a, b) => a - b);
 
  const dp = new Array(N);
 
  for (let i = 0; i < N; i++) {
    if (i >= 2) {
      dp[i] = Math.min(
        dp[i - 1] + times[0] + getMax(times[0], times[i]),
        dp[i - 2] +
          times[0] +
          getMax(times[i - 1], times[i]) +
          times[1] +
          getMax(times[0], times[1])
      );
    } else if (i === 1) {
      dp[1] = getMax(times[0], times[1]);
    } else {
      dp[0] = times[0];
    }
 
    if (dp[i] > T) return `${i} ${dp[i - 1] ?? 0}`;
  }
 
  return `${N} ${dp[N - 1]}`;
}
 
// 输入需要保证t1 <= t2
function getMax(t1, t2) {
  if (t1 * 10 < t2) {
    return t1 * 10;
  }
  return t2;
}
```

### JAVA算法源码

```
import java.util.Scanner;
import java.util.Arrays;
 
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        int t = sc.nextInt();
 
        int[] times = new int[n];
 
        for (int i = 0; i < n; i++) {
            times[i] = sc.nextInt();
        }
 
        System.out.println(getResult(n, t, times));
    }
 
    public static String getResult(int n, int t, int[] times) {
        Arrays.sort(times);
 
        int[] dp = new int[n];
 
        dp[0] = times[0];
        if (dp[0] > t) return "0 0";
 
        dp[1] = getMax(times[0], times[1]);
        if (dp[1] > t) return 1 + " " + dp[0];
 
        for (int i = 2; i < n; i++) {
            dp[i] = Math.min(dp[i - 1] + times[0] + getMax(times[0], times[i]),
                    dp[i - 2] + times[0] + getMax(times[i - 1], times[i]) + times[1] + getMax(times[0], times[1]));
 
            if (dp[i] > t) return i + " " + dp[i - 1];
        }
 
        return n + " " + dp[n - 1];
    }
 
    public static int getMax(int t1, int t2) {
        if (t1 * 10 < t2) {
            return t1 * 10;
        }
        return t2;
    }
}
```

### Python算法源码

```
# 输入获取
n = int(input())
t = int(input())
times = list(map(int, input().split()))
 
 
# 算法入口
def getResult(n, t, times):
    times.sort()
 
    dp = [0] * n
 
    dp[0] = times[0]
    if dp[0] > t:
        return "0 0"
 
    dp[1] = getMax(times[0], times[1])
    if dp[1] > t:
        return f"1 {dp[0]}"
 
    for i in range(2, n):
        dp[i] = min(dp[i - 1] + times[0] + getMax(times[0], times[i]),
                    dp[i - 2] + times[0] + getMax(times[i - 1], times[i]) + times[1] + getMax(times[0], times[1]))
 
        if dp[i] > t:
            return f"{i} {dp[i - 1]}"
 
    return f"{n} {dp[n - 1]}"
 
 
# 如果一个士兵划船奇慢无比，比如两个士兵的划船用时分别是10，200，那么此时如果按照第1个条件的话，则这两个士兵总用时200过河，但是如果按照第2个条件的话，可以只让用时少的士兵划船，只是用时需要乘以10，即这两个士兵总用时10*10=100可以过河
def getMax(t1, t2):
    if t1 * 10 < t2:
        return t1 * 10
    else:
        return t2
 
 
# 算法调用
print(getResult(n, t, times))
```

