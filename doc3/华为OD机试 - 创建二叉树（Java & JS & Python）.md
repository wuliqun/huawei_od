题目描述
请按下列描述构建一颗二叉树，并返回该树的根节点：

1、先创建值为-1的根结点，根节点在第0层;

2、然后根据operations依次添加节点： operations[i] = [height, index] 表示对第 height 层的第index 个节点node， 添加值为 i 的子节点：

若node 无「左子节点」，则添加左子节点;
若node 有「左子节点」，但无「右子节点」，则添加右子节点；
否则不作任何处理。
height、index 均从0开始计数；

index 指所在层的创建顺序。

注意：

输入用例保证每次操作对应的节点已存在；
控制台输出的内容是根据返回的树根节点，按照层序遍历二叉树打印的结果。
输入描述
operations

输出描述
根据返回的树根节点，按照层序遍历二叉树打印的结果

备注
1 <= operations.length <= 100
operations[i].length == 2
0 <= operations[i][0] < 100
0 <= operations[i][1] < 100
用例

输入	[[0, 0], [0, 0], [1, 1], [1, 0], [0, 0]]
输出	[-1, 0, 1, 3, null, 2]
说明	
首个值是根节点的值，也是返回值；

null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点

输入	[[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 1], [2, 0], [3, 1], [2, 0]]
输出	[-1, 0, null, 1, 2, 6, 8, 3, 4, null, null, null, null, null, null, 7]
说明	
首个值是根节点的值，也是返回值；

null 表示是空节点，此特殊层序遍历会遍历有值节点的 null 子节点

### 题目解析

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const operations = JSON.parse(line);
  console.log(getResult(operations));
});
 
function getResult(operations) {
  const tree = [[new Node(-1)]];
 
  for (let i = 0; i < operations.length; i++) {
    const [height, index] = operations[i];
 
    if (!tree[height + 1]) tree.push([]);
 
    const ch = new Node(i);
 
    const fa = tree[height][index];
    // 注意，tree用于记录树中加入成功的节点是第几行第几个创建的，对于加入的失败的不应该记录
    if (fa.lc == null || fa.rc == null) {
      tree[height + 1].push(ch);
    }
 
    if (!fa.lc) fa.lc = ch;
    else if (!fa.rc) fa.rc = ch;
  }
 
  const ans = [];
  const queue = [tree[0][0]];
 
  while (queue.length) {
    const node = queue.shift();
 
    if (node) {
      ans.push(node.val);
      queue.push(node.lc);
      queue.push(node.rc);
    } else {
      ans.push(null);
    }
  }
 
  while (true) {
    if (ans.at(-1) == null) ans.pop();
    else break;
  }
 
  return JSON.stringify(ans).replace(/\,/g, ", ");
}
 
class Node {
  constructor(val) {
    this.val = val;
    this.lc = null;
    this.rc = null;
  }
}
```

### Java算法源码

```java
import java.util.*;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String str = sc.nextLine();
 
    Integer[][] operations =
        Arrays.stream(str.substring(1, str.length() - 1).split("(?<=]), (?=\\[)"))
            .map(
                s ->
                    Arrays.stream(s.substring(1, s.length() - 1).split(", "))
                        .map(Integer::parseInt)
                        .toArray(Integer[]::new))
            .toArray(Integer[][]::new);
 
    System.out.println(getResult(operations));
  }
 
  public static String getResult(Integer[][] operations) {
    Node head = new Node(-1);
 
    ArrayList<Node> level0 = new ArrayList<>();
    level0.add(head);
 
    ArrayList<ArrayList<Node>> tree = new ArrayList<>();
    tree.add(level0);
 
    for (int i = 0; i < operations.length; i++) {
      int height = operations[i][0];
      int index = operations[i][1];
 
      if (tree.size() <= height + 1) {
        tree.add(new ArrayList<>());
      }
 
      Node ch = new Node(i);
 
      Node fa = tree.get(height).get(index);
      // 注意，tree用于记录树中加入成功的节点是第几行第几个创建的，对于加入的失败的不应该记录
      if (fa.lc == null || fa.rc == null) {
        tree.get(height + 1).add(ch);
      }
 
      if (fa.lc == null) fa.lc = ch;
      else if (fa.rc == null) fa.rc = ch;
    }
 
    LinkedList<Integer> ans = new LinkedList<>();
    LinkedList<Node> queue = new LinkedList<>();
    queue.add(tree.get(0).get(0));
 
    while (queue.size() > 0) {
      Node node = queue.removeFirst();
 
      if (node != null) {
        ans.add(node.val);
        queue.add(node.lc);
        queue.add(node.rc);
      } else {
        ans.add(null);
      }
    }
 
    while (true) {
      if (ans.getLast() == null) ans.removeLast();
      else break;
    }
 
    StringJoiner sj = new StringJoiner(", ", "[", "]");
    for (Integer an : ans) {
      sj.add(an + "");
    }
 
    return sj.toString();
  }
}
 
class Node {
  int val;
  Node lc;
  Node rc;
 
  public Node(int val) {
    this.val = val;
    this.lc = null;
    this.rc = null;
  }
}
```

### Python算法源码

```python
# 输入获取
operations = eval(input())
 
 
class Node:
    def __init__(self, val):
        self.val = val
        self.lc = None
        self.rc = None
 
 
# 算法入口
def getResult(operations):
    tree = [[Node(-1)]]
 
    for i in range(len(operations)):
        height, index = operations[i]
 
        if len(tree) <= height + 1:
            tree.append([])
 
        ch = Node(i)
 
        fa = tree[height][index]
        # 注意，tree用于记录树中加入成功的节点是第几行第几个创建的，对于加入的失败的不应该记录
        if not fa.lc or not fa.rc:
            tree[height + 1].append(ch)
 
        if not fa.lc:
            fa.lc = ch
        elif not fa.rc:
            fa.rc = ch
 
    ans = []
    queue = [tree[0][0]]
 
    while len(queue) > 0:
        node = queue.pop(0)
 
        if node is not None:
            ans.append(node.val)
            queue.append(node.lc)
            queue.append(node.rc)
        else:
            ans.append("null")
 
    while True:
        if ans[-1] == "null":
            ans.pop()
        else:
            break
 
    return ans
 
 
# 算法调用
res = str(getResult(operations))
print(res.replace("'", ""))
```