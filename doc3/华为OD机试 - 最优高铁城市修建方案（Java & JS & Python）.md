题目描述
高铁城市圈对人们的出行、经济的拉动效果明显。每年都会规划新的高铁城市圈建设。

在给定：城市数量，可建设高铁的两城市间的修建成本列表、以及结合城市商业价值会固定建设的两城市建高铁。


请你设计算法，达到修建城市高铁的最低成本。

注意，需要满足城市圈内城市间两两互联可达(通过其他城市中转可达也属于满足条件）。

输入描述
第一行，包含此城市圈中城市的数量、可建设高铁的两城市间修建成本列表数量、必建高铁的城市列表。三个数字用空格间隔。
可建设高铁的两城市间的修建成本列表，为多行输入数据，格式为3个数字，用空格分隔，长度不超过1000。
固定要修建的高铁城市列表，是上面参数2的子集，可能为多行，每行输入为2个数字，以空格分隔。
城市id从1开始编号，建设成本的取值为正整数，取值范围均不会超过1000

输出描述
修建城市圈高铁的最低成本，正整数。如果城市圈内存在两城市之间无法互联，则返回-1。

用例

输入	3 3 0
1 2 10
1 3 100
2 3 50
输出	60
说明	3 3 0城市圈数量为3，表示城市id分别为1,2,3
1 2 10城市1，2间的高铁修建成本为10
1 3 100城市1，3间的高铁修建成本为100
2 3 50城市2，3间的高铁修建成本为50
满足修建成本最低，只需要建设城市1，2间，城市2，3间的高铁即可，城市1，3之间可通过城市2中转来互联。这样最低修建成本就是60。
输入	3 3 1
1 2 10
1 3 100
2 3 50
1 3
输出	110
说明	无

### 题目解析

本题是求解[最小生成树](https://so.csdn.net/so/search?q=最小生成树&spm=1001.2101.3001.7020)的变种题。

在无向[连通图](https://so.csdn.net/so/search?q=连通图&spm=1001.2101.3001.7020)中，生成树是指包含了全部顶点的极小连通子图。

生成树包含原图全部的n个顶点和n-1条边。（注意，边的数量一定是n-1）

本题要求的最低成本，其实就是最小生成树所有边相加得到的最小权重和。

但是本题，又不是一个纯粹的求最小生成树的题。

因为，本题中规定了一些“必建高铁的两个城市”，那么多个“必建高铁的两个城市”是非常有可能形成环的。

但是，我们并不需要纠结这个，因为我们要求的不是最小生成树，而是最小权重和，只是这个最小权重和中某些值已经固定了，这些固定的值就是“必建高铁的两个城市”对应的费用。

我们定义一个minFee来代表最低成本，首先我们需要将必建高铁的成本计算进去。并且在计算的过程中，将必建高铁的两个城市（两个顶点）纳入一个连通分量中（基于并查集）。

之后，我们在将  “可以建高铁” 的列表 按照成本费用升序排序（Kruskal算法），然后遍历排序后列表，依次将“可以建高铁” 的两个城市（两个顶点）尝试纳入连通分量中，如果有环，则不纳入，无环，则纳入，纳入的话，则将成本费用计入minFee中。

那么上面逻辑何时结束呢？1、所有顶点已经纳入到一个连通分量中；2、循环结束。

循环结束后，

如果并查集中的连通分量数量为1，则说明所有城市（顶点）已经通车，且是最低成本。此时返回minFee就是题解。

如果并查集中的连通分量数量不为1，则说明所有城市（顶点）无法连通，返回-1。

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let n, can, must;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [n, can, must] = lines[0].split(" ").map(Number);
  }
 
  if (
    can !== undefined &&
    must !== undefined &&
    lines.length === can + must + 1
  ) {
    lines.shift();
 
    const cans = lines
      .splice(0, can)
      .map((line) => line.split(" ").map(Number));
 
    const musts = lines.map((line) => line.split(" ").map(Number));
 
    console.log(getResult(n, cans, musts));
 
    lines.length = 0;
  }
});
 
/**
 *
 * @param {*} n 一共几个城市
 * @param {*} cans 哪些城市之间可以修建高铁，以及修建费用
 * @param {*} musts 哪些城市之间必须修建高铁
 */
function getResult(n, cans, musts) {
  const ufs = new UnionFindSet(n);
 
  // 这里因为不知道题目用例输入的城市序号是否是按顺序的，因此需要排个序。
  // 并且为了方便统计“必建高铁”的费用，我们需要将cans数组改造为对象，key为'1-2' 两个城市，val为 这两个城市建高铁的费用
  const cansObj = {};
  for (let [c1, c2, fee] of cans) {
    const key = c1 < c2 ? `${c1}-${c2}` : `${c2}-${c1}`;
    cansObj[key] = fee;
  }
 
  // must数组中元素也改造为'1-2' 两个城市字符串的形成，方便从cansObj中获取对应的费用
  musts = musts.map((must) => {
    const [c1, c2] = must;
    return c1 < c2 ? `${c1}-${c2}` : `${c2}-${c1}`;
  });
 
  let minFee = 0;
  for (let must of musts) {
    // 计入必建高铁的费用到minFee中
    minFee += cansObj[must];
    const [c1, c2] = must.split("-").map(Number);
    // 并将必建高铁的两个城市纳入同一个连通分量重
    ufs.union(c1, c2);
  }
 
  // 如果必建高铁本身已经满足所有城市通车了，那么直接返回minFee
  if (ufs.count === 1) return minFee;
 
  // 否则，按照求解最小生成树的Kruskal算法，将高铁线（即图的边）按照成本费用（即边的权重）升序
  cans.sort((a, b) => a[2] - b[2]);
 
  // 遍历排序后的cans，每次得到的都是当前的最小权重边
  for (let [c1, c2, fee] of cans) {
    // 如果对应城市已经接入高铁线（即处于连通分量中）则再次合入就会产生环，因此不能合入，否则就可以合入
    // if (ufs.fa[c1] !== ufs.fa[c2]) {
    if (ufs.find(c1) !== ufs.find(c2)) {
      ufs.union(c1, c2);
      // 若可以合入，则将对应的建造成本计入minFee
      minFee += fee;
    }
 
    // 如果此时，所有城市都通车了（即并查集中只有一个连通分量），则提前结束循环
    if (ufs.count === 1) break;
  }
 
  // 如果循环完，发现并查集中还有多个连通分量，那么代表有的城市无法通车，因此返回-1
  if (ufs.count > 1) return -1;
 
  return minFee;
}
 
// 并查集
class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n + 1).fill(0).map((_, i) => i);
    this.count = n;
  }
 
  find(x) {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }
 
  union(x, y) {
    const x_fa = this.find(x);
    const y_fa = this.find(y);
 
    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
}
```

### Java算法源码

```
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
    int can = sc.nextInt();
    int must = sc.nextInt();
 
    int[][] cans = new int[can][3];
    for (int i = 0; i < can; i++) {
      cans[i][0] = sc.nextInt();
      cans[i][1] = sc.nextInt();
      cans[i][2] = sc.nextInt();
    }
 
    int[][] musts = new int[must][2];
    for (int i = 0; i < must; i++) {
      musts[i][0] = sc.nextInt();
      musts[i][1] = sc.nextInt();
    }
 
    System.out.println(getResult(n, cans, musts));
  }
 
  /**
   * @param n 一共几个城市
   * @param cans 哪些城市之间可以修建高铁，以及修建费用
   * @param musts 哪些城市之间必须修建高铁
   * @return 最少费用
   */
  public static int getResult(int n, int[][] cans, int[][] musts) {
    UnionFindSet ufs = new UnionFindSet(n);
 
    // 为了方便统计“必建高铁”的费用，我们需要将cans数组改造为cansMap，key为'1-2' 两个城市，val为 这两个城市建高铁的费用
    HashMap<String, Integer> cansMap = new HashMap<>();
    for (int[] can : cans) {
      int city1 = can[0], city2 = can[1], fee = can[2];
      String key = city1 < city2 ? city1 + "-" + city2 : city2 + "-" + city1;
      cansMap.put(key, fee);
    }
 
    int minFee = 0;
    for (int[] must : musts) {
      // 计入必建高铁的费用到minFee中
      String key = must[0] < must[1] ? must[0] + "-" + must[1] : must[1] + "-" + must[0];
      minFee += cansMap.get(key);
      // 并将必建高铁的两个城市纳入同一个连通分量重
      ufs.union(must[0], must[1]);
    }
 
    //  如果必建高铁本身已经满足所有城市通车了，那么直接返回minFee
    if (ufs.count == 1) return minFee;
 
    // 否则，按照求解最小生成树的Kruskal算法，将高铁线（即图的边）按照成本费用（即边的权重）升序
    Arrays.sort(cans, (a, b) -> a[2] - b[2]);
 
    // 遍历排序后的cans，每次得到的都是当前的最小权重边
    for (int[] can : cans) {
      int city1 = can[0], city2 = can[1], fee = can[2];
      // 如果对应城市已经接入高铁线（即处于连通分量中）则再次合入就会产生环，因此不能合入，否则就可以合入
      //      if (ufs.fa[city1] != ufs.fa[city2]) {
      if (ufs.find(city1) != ufs.find(city2)) {
        ufs.union(city1, city2);
        // 若可以合入，则将对应的建造成本计入minFee
        minFee += fee;
      }
 
      // 如果此时，所有城市都通车了（即并查集中只有一个连通分量），则提前结束循环
      if (ufs.count == 1) break;
    }
 
    // 如果循环完，发现并查集中还有多个连通分量，那么代表有的城市无法通车，因此返回-1
    if (ufs.count > 1) return -1;
 
    return minFee;
  }
}
 
// 并查集
class UnionFindSet {
  int[] fa;
  int count;
 
  public UnionFindSet(int n) {
    this.fa = new int[n + 1];
    this.count = n;
    for (int i = 0; i < n + 1; i++) this.fa[i] = i;
  }
 
  public int find(int x) {
    if (x != this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }
 
  public void union(int x, int y) {
    int x_fa = this.find(x);
    int y_fa = this.find(y);
 
    if (x_fa != y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
}
```

### Python算法源码

```
# 并差集
class UnionFindSet:
    def __init__(self, n):
        self.fa = [i for i in range(n + 1)]
        self.count = n
 
    def find(self, x):
        if x != self.fa[x]:
            self.fa[x] = self.find(self.fa[x])
            return self.fa[x]
        return x
 
    def union(self, x, y):
        x_fa = self.find(x)
        y_fa = self.find(y)
 
        if x_fa != y_fa:
            self.fa[y_fa] = x_fa
            self.count -= 1
 
 
# 算法入口
def getResult(n, cans, musts):
    """
    :param n: 一共几个城市
    :param cans: 哪些城市之间可以修建高铁，以及修建费用
    :param musts: 哪些城市之间必须修建高铁
    :return: 修建城市高铁的最低成本
    """
    ufs = UnionFindSet(n)
 
    # 这里因为不知道题目用例输入的城市序号是否是按顺序的，因此需要排个序。
    # 并且为了方便统计“必建高铁”的费用，我们需要将cans数组改造为对象，key为'1-2' 两个城市，val为 这两个城市建高铁的费用
    canDict = {}
    for c1, c2, fee in cans:
        key = f"{c1}-{c2}" if c1 < c2 else f"{c2}-{c1}"
        canDict[key] = fee
 
    # must数组中元素也改造为'1-2' 两个城市字符串的形成，方便从cansObj中获取对应的费用
    musts = map(lambda must: f"{must[0]}-{must[1]}" if must[0] < must[1] else f"{must[1]}-{must[0]}", musts)
 
    minFee = 0
    for must in musts:
        # 计入必建高铁的费用到minFee中
        minFee += canDict[must]
        c1, c2 = map(int, must.split("-"))
        # 并将必建高铁的两个城市纳入同一个连通分量重
        ufs.union(c1, c2)
 
    # 如果必建高铁本身已经满足所有城市通车了，那么直接返回minFee
    if ufs.count == 1:
        return minFee
 
    # 否则，按照求解最小生成树的Kruskal算法，将高铁线（即图的边）按照成本费用（即边的权重）升序
    cans.sort(key=lambda x: x[2])
 
    # 遍历排序后的cans，每次得到的都是当前的最小权重边
    for c1, c2, fee in cans:
        # 如果对应城市已经接入高铁线（即处于连通分量中）则再次合入就会产生环，因此不能合入，否则就可以合入
        # if ufs.fa[c1] != ufs.fa[c2]:
        if ufs.find(c1) != ufs.find(c2):
            ufs.union(c1, c2)
            # 若可以合入，则将对应的建造成本计入minFee
            minFee += fee
 
        # 如果此时，所有城市都通车了（即并查集中只有一个连通分量），则提前结束循环
        if ufs.count == 1:
            break
 
    # 如果循环完，发现并查集中还有多个连通分量，那么代表有的城市无法通车，因此返回-1
    if ufs.count > 1:
        return -1
 
    return minFee
 
 
# 输入获取
n, can, must = map(int, input().split())
cans = [list(map(int, input().split())) for i in range(can)]
musts = [list(map(int, input().split())) for i in range(must)]
 
# 算法调用
print(getResult(n, cans, musts))
```

