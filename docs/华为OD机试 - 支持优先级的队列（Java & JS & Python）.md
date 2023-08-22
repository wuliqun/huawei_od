题目描述
实现一个支持优先级的队列，高优先级先出队列；同优先级时先进先出。

如果两个输入数据和优先级都相同，则后一个数据不入队列被丢弃。

队列存储的数据内容是一个整数。

输入描述
一组待存入队列的数据 (包含内容和优先级)

输出描述
队列的数据内容(优先级信息输出时不再体现)

备注
不用考虑输入数据不合法的情况，测试数据不超过100个

用例
输入	(10,1),(20,1),(30,2),(40,3)
输出	40,30,10,20
说明	
输入样例中，向队列写入了4个数据，每个数据由数据内容和优先级组成。
输入和输出内容都不含空格。
数据40的优先级最高，所以最先输出，其次是30;

10和20优先级相同，所以按输入顺序输出。

输入	(10,1),(10,1),(30,2),(40,3)
输出	40,30,10
说明	
输入样例中，向队列写入了4个数据，每个数据由数据内容和优先级组成。
输入和输出内容都不含空格。
数据40的优先级最高，所以最先输出，其次是30;

两个10和10构成重复数据，被丢弃一个。

题目解析
本题看上去是让我们使用优先队列，但是实际上不是。

本题在维护优先级的同时，也要维护去重特性。其中较难的功能点是：

对于相同优先级的，且不重复的任务，维持插入顺序。

这个功能其实就是让我们实现一个：维护了插入顺序的Set集合。

对于JS而言，其Set本身就是一个维护了插入顺序的去重集合，因此可以直接复用。
对于Java而言，我们可以复用LinkedHashSet。
对于Python而言，其set不维护元素插入顺序，因此我们不能复用。为了避免自己实现OrderedSet，我们可以复用Python的object能力，因此Python的object的keys列是维护了插入顺序的去重集合。
我的解题思路如下：

定义一个字典，用于收集相同优先级的数据，即字典的key是优先级，value是一个维护了插入顺序的Set集合。

收集完后，我们可以取出字典的key列进行降序排序（高优先级优先），然后遍历降序后的key列，逐个打印字典对应key下的value内容。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const tasks = line
    .slice(1, line.length - 1)
    .split("),(")
    .map((s) => s.split(",").map(Number));
 
  console.log(getResult(tasks));
});
 
function getResult(tasks) {
  const map = new Map();
 
  for (let [num, priority] of tasks) {
    if (!map.get(priority)) {
      map.set(priority, new Set());
    }
 
    map.get(priority).add(num);
  }
 
  const order = [...map.keys()].sort((a, b) => b - a);
 
  const ans = [];
  for (let p of order) {
    ans.push(...map.get(p));
  }
 
  return ans.join(",");
}
```

java

```
import java.util.*;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String line = sc.nextLine();
 
    int[][] tasks =
        Arrays.stream(line.substring(1, line.length() - 1).split("\\),\\("))
            .map(s -> Arrays.stream(s.split(",")).mapToInt(Integer::parseInt).toArray())
            .toArray(int[][]::new);
 
    System.out.println(getResult(tasks));
  }
 
  public static String getResult(int[][] tasks) {
    HashMap<Integer, LinkedHashSet<Integer>> map = new HashMap<>();
 
    for (int[] task : tasks) {
      int num = task[0];
      int priority = task[1];
 
      map.putIfAbsent(priority, new LinkedHashSet<>());
      map.get(priority).add(num);
    }
 
    StringJoiner sj = new StringJoiner(",");
    map.keySet().stream()
        .sorted((a, b) -> b - a)
        .forEach(
            p -> {
              map.get(p).forEach(num -> sj.add(num + ""));
            });
 
    return sj.toString();
  }
}
```

py

```
# 输入获取
line = input()
 
tasks = list(map(lambda s: list(map(int, s.split(","))), line[1:len(line)-1].split("),(")))
 
 
# 核心代码
def getResult():
    dic = {}
 
    for num, priority in tasks:
        dic.setdefault(priority, {})
        dic[priority].setdefault(num, None)
 
    order = list(dic.keys())
    order.sort(reverse=True)
 
    ans = []
    for p in order:
        ans.extend(list(dic[p].keys()))
 
    return ",".join(map(str, ans))
 
 
# 算法调用
print(getResult())
```

