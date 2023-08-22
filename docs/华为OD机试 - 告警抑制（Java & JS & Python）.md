题目描述
告警抑制，是指高优先级告警抑制低优先级告警的规则。高优先级告警产生后，低优先级告警不再产生。请根据原始告警列表和告警抑制关系，给出实际产生的告警列表。

不会出现循环抑制的情况。
告警不会传递，比如A->B,B->C，这种情况下A不会直接抑制C。但被抑制的告警仍然可以抑制其他低优先级告警。
输入描述
第一行为数字N，表示告警抑制关系个数，0 ≤ N ≤ 120
接下来N行，每行是由空格分隔的两个告警ID，例如: id1 id2，表示id1抑制id2，告警ID的格式为：

大写字母+0个或者1个数字

最后一行为告警产生列表，列表长度[1,100]

输出描述
真实产生的告警列表

备注
告警ID之间以单个空格分隔

用例
输入	2
A B
B C
A B C D E
输出	A D E
说明	A抑制了B，B抑制了C，最后实际的告警为A D E
输入	4
F G
C B
A G
A0 A
A B C D E
输出	A C D E
说明	无
题目解析
我们基于用例2来说明下这题。

有一个告警列表alertList，A B C D E，我们逐一检查对应的告警是否可以正常发生：

第一个告警A，能够抑制它的只有A0，而当前告警列表alertList中没有A0，因此告警A可以正常发生
第二个告警B，能够抑制它的只有C，而当前告警列表alertList中有C，因此告警B被抑制，不可以发生
第三个告警C，没有能抑制它的告警，因此正常发生
第四个告警D，没有能抑制它的告警，因此正常发生
第五个告警E，没有能抑制它的告警，因此正常发生
因此，本题的解题思路很简单，只需要记录每一个告警id2的所有抑制它的告警集合id1s，然后遍历告警列表alertList，遍历每一个告警id2：

如果没有可以抑制id2的更高级的告警，则id2正常发生
如果有可以抑制id2的更告警的告警id1，但是id1没有出现在alertList中，则id2正常发生
其他情况，id2不可以发生
Java算法源码

```
import java.util.*;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = Integer.parseInt(sc.nextLine());
 
    HashMap<String, HashSet<String>> fa = new HashMap<>();
    for (int i = 0; i < n; i++) {
      String[] tmp = sc.nextLine().split(" ");
      // id1抑制id2
      String id1 = tmp[0], id2 = tmp[1];
      fa.putIfAbsent(id2, new HashSet<>());
      // fa用于记录抑制id2的所有id1的集合
      fa.get(id2).add(id1);
    }
 
    String[] alertList = sc.nextLine().split(" ");
 
    System.out.println(getResult(fa, alertList));
  }
 
  public static String getResult(HashMap<String, HashSet<String>> fa, String[] alertList) {
    HashSet<String> alertSet = new HashSet<>(Arrays.asList(alertList));
 
    StringJoiner sj = new StringJoiner(" ");
 
    for (String id2 : alertList) {
      // 如果没有抑制id2的更高级的告警，或者有抑制id2的更高级的告警，但是此高级告警没有出现在alertList列表中
      if (!fa.containsKey(id2) || Collections.disjoint(fa.get(id2), alertSet)) {
        // 此时id2就可以正常告警
        sj.add(id2);
      }
    }
 
    return sj.toString();
  }
}
```

### JS算法源码

```javascript
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
 
  if (lines.length == 1) {
    n = lines[0] - 0;
  }
 
  if (n !== undefined && lines.length == n + 2) {
    lines.shift();
    const alertList = lines.pop().split(" ");
    const relations = lines.map((str) => str.split(" "));
    console.log(getResult(relations, alertList));
    lines.length = 0;
  }
});
 
function getResult(relations, alertList) {
  const fa = {};
 
  for (let [id1, id2] of relations) {
    // id1抑制id2
    if (!fa[id2]) fa[id2] = new Set();
    // fa用于记录抑制id2的所有id1的集合
    fa[id2].add(id1);
  }
 
  const alertSet = new Set(alertList);
 
  const ans = [];
  for (let id2 of alertList) {
    // 如果没有抑制id2的更高级的告警，或者有抑制id2的更高级的告警，但是此高级告警没有出现在alertList列表中
    if (disjoint(alertSet, fa[id2])) {
      // 此时id2就可以正常告警
      ans.push(id2);
    }
  }
 
  return ans.join(" ");
}
 
// 判断两个集合是否不相交，不相交返回true，相交返回false
function disjoint(set1, set2) {
  if (!set1 || !set2) return true;
 
  for (let id1 of set1) {
    if (set2.has(id1)) return false;
  }
  return true;
}
```

### Python算法源码

```python
# 输入获取
n = int(input())
relations = [input().split() for _ in range(n)]
alertList = input().split()
 
 
# 算法入口
def getResult():
    fa = {}
 
    # id1抑制id2
    for id1, id2 in relations:
        if fa.get(id2) is None:
            fa[id2] = set()
        # fa用于记录抑制id2的所有id1的集合
        fa[id2].add(id1)
 
    alertSet = set(alertList)
 
    ans = []
 
    for id2 in alertList:
        # 如果没有抑制id2的更高级的告警，或者有抑制id2的更高级的告警，但是此高级告警没有出现在alertList列表中
        if fa.get(id2) is None or alertSet.isdisjoint(fa[id2]):
            # 此时id2就可以正常告警
            ans.append(id2)
 
    return " ".join(ans)
 
 
# 算法调用
print(getResult())
```