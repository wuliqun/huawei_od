题目描述
IGMP 协议中响应报文和查询报文，是维系组播通路的两个重要报文，在一条已经建立的组播通路中两个相邻的 HOST 和 ROUTER，ROUTER 会给 HOST 发送查询报文，HOST 收到查询报文后给 ROUTER 回复一个响应报文，以维持相之间的关系，一旦这关系断裂，那么这条组播通路就异常”了。现通过某种手段，抓取到了 HOST 和 ROUTER 两者通讯的所有响应报文和查询报文，请分析该组播通路是否“正常”

输入描述
第一行抓到的报文数量C (C≤100) ，后续C行依次输入设备节点D1和D2，表示从D1到D2发送了单向的报文，D1和D2用空格隔开。

输出描述
组播通路是否“正常”，正常输出True， 异常输出False。

用例
输入	5
1 2
2 3
3 2
1 2
2 1
输出	True
说明	无
输入	3
1 3
3 2
2 3
输出	False
说明	无
题目解析
用例1图示

[![image.png](https://img-blog.csdnimg.cn/098e91c3c37c46e2a4ad6d8d86c72909.png)](https://postimg.cc/RNFrfxZ2)



用例2图示

[![image.png](https://img-blog.csdnimg.cn/43b724f1ac034bfd9e4aee8e995b866e.png)](https://postim



根据题目意思，想要组播通路之间正常，则有数据传递的两个节点之间必须是双向的。

即如果存在D1 → D2，那么需要检查有没有D2 → D1，如果没有的话，则通路失败。

如果所有的节点和其交互的节点都存在双向传递的话，则整个通路成功。 

java

```
import java.util.HashMap;
import java.util.HashSet;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    HashMap<Integer, HashSet<Integer>> trans = new HashMap<>();
    for (int i = 0; i < n; i++) {
      int send = sc.nextInt();
      int receive = sc.nextInt();
      trans.putIfAbsent(send, new HashSet<>());
      trans.putIfAbsent(receive, new HashSet<>());
      trans.get(send).add(receive);
    }
 
    System.out.println(getResult(trans));
  }
 
  public static String getResult(HashMap<Integer, HashSet<Integer>> trans) {
    for (Integer send : trans.keySet()) {
      for (Integer receive : trans.get(send)) {
        if (!trans.get(receive).contains(send)) {
          return "False";
        }
      }
    }
    return "True";
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
 
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
 
  if (n && lines.length == n + 1) {
    lines.shift();
 
    const trans = {};
 
    lines
      .map((line) => line.split(" "))
      .forEach((arr) => {
        const [send, receive] = arr;
        if (!trans[send]) trans[send] = new Set();
        if (!trans[receive]) trans[receive] = new Set();
        trans[send].add(receive);
      });
 
    console.log(getResult(trans));
 
    lines.length = 0;
  }
});
 
function getResult(trans) {
  for (let send in trans) {
    for (let receive of trans[send]) {
      if (!trans[receive].has(send)) return "False";
    }
  }
 
  return "True";
}
```

py

```
# 输入获取
n = int(input())
arr = [input().split() for _ in range(n)]
 
trans = {}
for send, receive in arr:
    if trans.get(send) is None:
        trans[send] = set()
 
    if trans.get(receive) is None:
        trans[receive] = set()
 
    trans[send].add(receive)
 
 
# 算法入口
def getResult():
    for s in trans:
        for c in trans[s]:
            if s not in trans[c]:
                return "False"
 
    return "True"
 
 
# 算法调用
print(getResult())
```

