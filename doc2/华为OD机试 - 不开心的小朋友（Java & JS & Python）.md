题目描述
游乐场里增加了一批摇摇车，非常受小朋友欢迎，但是每辆摇摇车同时只能有一个小朋友使用，如果没有空余的摇摇车，需要排队等候，或者直接离开，最后没有玩上的小朋友会非常不开心。

请根据今天小朋友的来去情况，统计不开心的小朋友数量。

摇摇车数量为N，范围是: 1 ≤ N < 10；
每个小朋友都对应一个编码，编码是不重复的数字，今天小朋友的来去情况，可以使用编码表示为：1 1 2 3 2 3。(若小朋友离去之前有空闲的摇摇车，则代表玩耍后离开；不考虑小朋友多次玩的情况)。小朋友数量 ≤ 100
题目保证所有输入数据无异常且范围满足上述说明。
输入描述
第一行: 摇摇车数量
第二行: 小朋友来去情况

输出描述
返回不开心的小朋友数量

用例
输入	1
1 2 1 2
输出	0
说明	第一行，1个摇摇车
第二行，1号来 2号来(排队) 1号走 2号走 (1号走后摇摇车已有空闲，所以玩后离开)
输入	1
1 2 2 3 1 3
输出	1
说明	
第一行，1个摇摇车

第二行，1号来 2号来(排队) 2号走(不开心离开) 3号来(排队) 1号走 3号走(1号走后摇摇车已有空闲，所以玩后离开)

题目解析
本题应该只是逻辑分析题。

我的解题思路如下：

定义一个playing集合，用于记录正在玩摇摇车的小朋友。

定义一个waiting队列，用于记录正在排队的小朋友。

然后遍历小朋友编号列表，被遍历的小朋友设为kid

首先，需要判断 kid 的状态，kid可能是三种状态：

正在玩摇摇车（即在playing集合中）
正在排队（即在waiting集合中）
新加入的（即既不在playing中，也不在waitingzhong1）
针对不同状态的kid，我们应该做如下处理：

如果 kid 在 playing 中存在，则本次kid编号出现，代表kid玩好了，开心地离开了。
当playing集合中有kid开心地离开后，此时我们还应该检查waiting队列是否有小朋友排队，如果有，我们应该立即将队头的小朋友加入playing集合，即让排在队头的小朋友玩摇摇车。

如果 kid 在 waiting 中存在，则本次kid编号出现，代表kid没有玩上，不开心地离开了。
如果 kid 既不在playing，也不在waiting，则说明kid是新加入的，此时我们需要检查摇摇车是否还有剩余
如果palying.size < n，则代表摇摇车还有剩余，则此时kid可以直接去玩，即加入playing集合
如果playing.size == n，则代表摇摇车用完了，则此时kid只能去排队，即加入waiting队列
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
 
  if (lines.length == 2) {
    const n = parseInt(lines[0]);
    const kids = lines[1].split(" ");
 
    console.log(getResult(n, kids));
 
    lines.length = 0;
  }
});
 
function getResult(n, kids) {
  // 不开心的小朋友数量
  let unHappy = 0;
 
  // 已在摇摇车上的小朋友编号
  const playing = new Set();
  // 正在排队的小朋友编号
  const waiting = [];
 
  for (let kid of kids) {
    if (playing.has(kid)) {
      // 如果kid是摇摇车上的小朋友编号, 则代表kid玩好了要离开
      playing.delete(kid);
 
      // 如果kid离开后，摇摇车有空位了，如果此时有人排队，则让排队的人上车玩
      if (waiting.length > 0) {
        playing.add(waiting.shift());
      }
 
      continue;
    }
 
    // 如果kid不是摇摇车上的小朋友，则检查kid是不是排队的小朋友
    const index = waiting.indexOf(kid);
    if (index != -1) {
      // 如果是排队的小朋友，则说明kid没有玩到摇摇车，因此会不开心的离开
      unHappy++;
      waiting.splice(index, 1);
      continue;
    }
 
    // 如果kid既不是摇摇车上的小朋友，也不是排队的小朋友，则是新来的小朋友
    if (playing.size < n) {
      // 如果摇摇车还有空位，则直接玩
      playing.add(kid);
    } else {
      // 如果摇摇车没有空位了，则需要排队
      waiting.push(kid);
    }
  }
 
  return unHappy;
}
```

java

```
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = Integer.parseInt(sc.nextLine());
    String[] kids = sc.nextLine().split(" ");
 
    System.out.println(getResult(n, kids));
  }
 
  public static int getResult(int n, String[] kids) {
    // 不开心的小朋友数量
    int unHappy = 0;
 
    // 已在摇摇车上的小朋友编号
    HashSet<String> playing = new HashSet<>();
    // 正在排队的小朋友编号
    LinkedList<String> waiting = new LinkedList<>();
 
    for (String kid : kids) {
      if (playing.contains(kid)) {
        // 如果kid是摇摇车上的小朋友编号, 则代表kid玩好了要离开
        playing.remove(kid);
 
        // 如果kid离开后，摇摇车有空位了，如果此时有人排队，则让排队的人上车玩
        if (waiting.size() > 0) {
          playing.add(waiting.removeFirst());
        }
 
        continue;
      }
 
      // 如果kid不是摇摇车上的小朋友，则检查kid是不是排队的小朋友
      int index = waiting.indexOf(kid);
      if (index != -1) {
        // 如果是排队的小朋友，则说明kid没有玩到摇摇车，因此会不开心的离开
        unHappy++;
        waiting.remove(index);
        continue;
      }
 
      // 如果kid既不是摇摇车上的小朋友，也不是排队的小朋友，则是新来的小朋友
      if (playing.size() < n) {
        // 如果摇摇车还有空位，则直接玩
        playing.add(kid);
      } else {
        // 如果摇摇车没有空位了，则需要排队
        waiting.add(kid);
      }
    }
 
    return unHappy;
  }
}
```

py

```
# 输入获取
n = int(input())
kids = input().split()
 
 
# 算法入口
def getResult():
    # 不开心的小朋友数量
    unHappy = 0
 
    # 已在摇摇车上的小朋友编号
    playing = set()
    # 正在排队的小朋友编号
    waiting = []
 
    for kid in kids:
        if kid in playing:
            # 如果kid是摇摇车上的小朋友编号, 则代表kid玩好了要离开
            playing.remove(kid)
 
            # 如果kid离开后，摇摇车有空位了，如果此时有人排队，则让排队的人上车玩
            if len(waiting) > 0:
                playing.add(waiting.pop(0))
            continue
 
        # 如果kid不是摇摇车上的小朋友，则检查kid是不是排队的小朋友
        if kid in waiting:
            # 如果是排队的小朋友，则说明kid没有玩到摇摇车，因此会不开心的离开
            unHappy += 1
            waiting.pop(waiting.index(kid))
            continue
 
        # 如果kid既不是摇摇车上的小朋友，也不是排队的小朋友，则是新来的小朋友
        if len(playing) < n:
            # 如果摇摇车还有空位，则直接玩
            playing.add(kid)
        else:
            # 如果摇摇车没有空位了，则需要排队
            waiting.append(kid)
 
    return unHappy
 
 
# 算法调用
print(getResult())
```

