题目描述
大众对垃圾短信深恶痛绝，希望能对垃圾短信发送者进行识别，为此，很多软件增加了垃圾短信的识别机制。
经分析，发现正常用户的短信通常具备交互性，而垃圾短信往往都是大量单向的短信，按照如下规则进行垃圾短信识别：

本题中，发送者A符合以下条件之一的，则认为A是垃圾短信发送者：

A发送短信的接收者中，没有发过短信给A的人数L > 5；
A发送的短信数 – A接收的短信数M > 10；
如果存在X，A发送给X的短信数 – A接收到X的短信数N > 5；
输入描述
第一行是条目数，接下来几行是具体的条目，每个条目，是一对ID，第一个数字是发送者ID，后面的数字是接收者ID，中间空格隔开，所有的ID都为无符号整型，ID最大值为100；

同一个条目中，两个ID不会相同（即不会自己给自己发消息）

最后一行为指定的ID

输出描述
输出该ID是否为垃圾短信发送者，并且按序列输出 L M 的值（由于 N 值不唯一，不需要输出）；
输出均为字符串。

用例

输入	15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
1
输出	true 13 13
说明	true 表示1是垃圾短信发送者，两个数字，代表发送者1对应的L和M值。
true 13 13中间以一个空格分割。注意true是字符串输出。
输入	15
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9
1 10
1 11
1 12
1 13
1 14
14 1
1 15
2
输出	false 0 -1
说明	无

### 题目解析

感觉是纯[逻辑题](https://so.csdn.net/so/search?q=逻辑题&spm=1001.2101.3001.7020)，解析请看代码注释。



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
 
  if (n && lines.length === n + 2) {
    lines.shift();
    const id = lines.pop();
    const arr = lines.map((line) => line.split(" "));
 
    console.log(getResult(id, arr));
    lines.length = 0;
  }
});
 
/**
 *
 * @param {*} tid 指定的ID
 * @param {*} arr [[发送者id,接收者id]]
 * @returns
 */
function getResult(tid, arr) {
  // send记录 tid发送短信给“哪些人”
  const send = [];
  // receive记录  “哪些人”发送短信给tid
  const receive = [];
 
  // sendCount记录 tid发送了“几次”（对象属性值）短信给某个人（对象属性）
  const sendCount = {};
  // receiveCount记录 某人（对象属性）发送了“几次”（对象属性值）短信给tid
  const receiveCount = {};
 
  for (let [sid, rid] of arr) {
    if (sid == tid) {
      send.push(rid);
      sendCount[rid] ? sendCount[rid]++ : (sendCount[rid] = 1);
    }
    if (rid == tid) {
      receive.push(sid);
      receiveCount[sid] ? receiveCount[sid]++ : (receiveCount[sid] = 1);
    }
  }
 
  const sendSet = new Set(send);
  const receiveSet = new Set(receive);
  // connect记录和tid有交互的id
  const connect = [...sendSet].filter((id) => receiveSet.has(id));
 
  const l = sendSet.size - connect.length;
  const m = send.length - receive.length;
 
  let isSpammers = l > 5 || m > 10;
 
  // 如果已经通过l和m确定了tid是垃圾短信发送者，那就不需要再确认n了，否则还是需要确认n
  if (!isSpammers) {
    // for (let id of connect) {
    //   if ((sendCount[id] ?? 0) - (receiveCount[id] ?? 0) > 5) {
    // 根据网友指正，第三条规则中，X不一定非要和A存在交互，即存在A发送6条短信给X，但是X没有发送过短信给A，此时也符合第三条规则
    // 因此，这里id应该遍历自sendSet，而不是connect
    for (let id of sendSet) {
      if (sendCount[id] - (receiveCount[id] ?? 0) > 5) {
        // 一旦发现x,则可以判断，则确定tid是垃圾短信发送者，可提前结束循环
        isSpammers = true;
        break;
      }
    }
  }
 
  return `${isSpammers} ${l} ${m}`;
}
```

### Java算法源码

```
import java.util.*;
import java.util.stream.Collectors;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int n = sc.nextInt();
 
    int[][] arr = new int[n][2];
    for (int i = 0; i < n; i++) {
      arr[i][0] = sc.nextInt();
      arr[i][1] = sc.nextInt();
    }
 
    int id = sc.nextInt();
 
    System.out.println(getResult(id, arr));
  }
 
  public static String getResult(int tid, int[][] arr) {
    // send记录 tid发送短信给“哪些人”
    LinkedList<Integer> send = new LinkedList<>();
    // receive记录  “哪些人”发送短信给tid
    LinkedList<Integer> receive = new LinkedList<>();
 
    // sendCount记录 tid发送了“几次”（对象属性值）短信给某个人（对象属性）
    HashMap<Integer, Integer> sendCount = new HashMap<>();
    // receiveCount记录 某人（对象属性）发送了“几次”（对象属性值）短信给tid
    HashMap<Integer, Integer> receiveCount = new HashMap<>();
 
    for (int[] ele : arr) {
      int sid = ele[0];
      int rid = ele[1];
 
      if (sid == tid) {
        send.addLast(rid);
        sendCount.put(rid, sendCount.getOrDefault(rid, 0) + 1);
      }
 
      if (rid == tid) {
        receive.addLast(sid);
        receiveCount.put(sid, receiveCount.getOrDefault(sid, 0) + 1);
      }
    }
 
    HashSet<Integer> sendSet = new HashSet<>(send);
    HashSet<Integer> receiveSet = new HashSet<>(receive);
 
    // connect记录和tid有交互的id
    List<Integer> connect = send.stream().filter(receiveSet::contains).collect(Collectors.toList());
 
    int l = sendSet.size() - connect.size();
    int m = send.size() - receive.size();
 
    boolean isSpammers = l > 5 || m > 10;
 
    // 如果已经通过l和m确定了tid是垃圾短信发送者，那就不需要再确认n了，否则还是需要确认n
    if (!isSpammers) {
      //      for (Integer id : connect) {
      //        if (sendCount.getOrDefault(id, 0) - receiveCount.getOrDefault(id, 0) > 5) {
      // 根据网友指正，第三条规则中，X不一定非要和A存在交互，即存在A发送6条短信给X，但是X没有发送过短信给A，此时也符合第三条规则
      // 因此，这里id应该遍历自sendSet，而不是connect
      for (Integer id : sendSet) {
        if (sendCount.get(id) - receiveCount.getOrDefault(id, 0) > 5) {
          // 一旦发现x,则可以判断，则确定tid是垃圾短信发送者，可提前结束循环
          isSpammers = true;
          break;
        }
      }
    }
 
    return isSpammers + " " + l + " " + m;
  }
}
```

### Python算法源码

```
# 输入获取
n = int(input())
arr = [input().split() for i in range(n)]
tid = input()
 
 
# 算法入口
def getResult(tid, arr):
    # send记录 tid发送短信给“哪些人”
    send = []
    # receive记录  “哪些人”发送短信给tid
    receive = []
 
    # sendCount记录 tid发送了“几次”（对象属性值）短信给某个人（对象属性）
    sendCount = {}
    # receiveCount记录 某人（对象属性）发送了“几次”（对象属性值）短信给tid
    receiveCount = {}
 
    for sid, rid in arr:
        if sid == tid:
            send.append(rid)
            if sendCount.get(rid) is None:
                sendCount[rid] = 1
            else:
                sendCount[rid] += 1
 
        if rid == tid:
            receive.append(sid)
            if receiveCount.get(sid) is None:
                receiveCount[sid] = 1
            else:
                receiveCount[sid] += 1
 
    sendSet = set(send)
    receiveSet = set(receive)
 
    # connect记录和tid有交互的id
    connect = list(filter(lambda x: x in receiveSet, list(sendSet)))
 
    l = len(sendSet) - len(connect)
    m = len(send) - len(receive)
 
    isSpammers = l > 5 or m > 10
 
    # 如果已经通过l和m确定了tid是垃圾短信发送者，那就不需要再确认n了，否则还是需要确认n
    if not isSpammers:
        # for id in connect:
        #     if (sendCount.get(id) or 0) - (receiveCount.get(id) or 0) > 5:
        # 根据网友指正，第三条规则中，X不一定非要和A存在交互，即存在A发送6条短信给X，但是X没有发送过短信给A，此时也符合第三条规则
        # 因此，这里id应该遍历自sendSet，而不是connect
        for id in sendSet:
            if sendCount.get(id) - (receiveCount.get(id) or 0) > 5:
                isSpammers = True
                # 一旦发现x,则可以判断，则确定tid是垃圾短信发送者，可提前结束循环
                break
 
    return f"{str(isSpammers).lower()} {l} {m}"
 
 
# 算法调用
print(getResult(tid, arr))
```

