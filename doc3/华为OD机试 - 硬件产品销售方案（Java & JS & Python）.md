题目描述
某公司目前推出了AI开发者套件，AI加速卡，AI加速模块，AI服务器，智能边缘多种硬件产品，每种产品包含若干个型号。
现某合作厂商要采购金额为amount元的硬件产品搭建自己的AI基座。
例如当前库存有N种产品，每种产品的库存量充足，给定每种产品的价格，记为price（不存在价格相同的产品型号）。
请为合作厂商列出所有可能的产品组合。

输入描述
输入包含采购金额amount和产品价格列表price。第一行为amount，第二行为price，例如：

500
[100, 200, 300, 500]

输出描述
输出为组合列表。例如：

[[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200, 200], [200, 300], [500]]

用例

输入	500
[100, 200, 300, 500, 500]
输出	[[100, 100, 100, 100, 100], [100, 100, 100, 200], [100, 100, 300], [100, 200, 200], [200, 300], [500], [500]]
说明	无

### 题目解析

简单的可重复元素组合求解。



### JavaScript算法源码

```javascript
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 2) {
    const amount = lines[0] - 0;
    const prices = JSON.parse(lines[1]);
 
    console.log(getResult(amount, prices));
    lines.length = 0;
  }
});
 
function getResult(amount, prices) {
  const res = [];
  dfs(amount, prices, 0, 0, [], res);
  return JSON.stringify(res);
}
 
function dfs(total, arr, index, sum, path, res) {
  if (sum >= total) {
    if (sum === total) res.push([...path]);
    return;
  }
 
  for (let i = index; i < arr.length; i++) {
    path.push(arr[i]);
    dfs(total, arr, i, sum + arr[i], path, res);
    path.pop();
  }
}
```

### Java算法源码

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int amount = Integer.parseInt(sc.nextLine());
 
    String str = sc.nextLine();
    Integer[] prices =
        Arrays.stream(str.substring(1, str.length() - 1).split(", "))
            .map(Integer::parseInt)
            .toArray(Integer[]::new);
 
    System.out.println(getResult(amount, prices));
  }
 
  public static String getResult(int amount, Integer[] prices) {
    ArrayList<String> res = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
 
    dfs(amount, prices, 0, 0, path, res);
    return res.toString();
  }
 
  public static void dfs(
      int total,
      Integer[] arr,
      int index,
      int sum,
      LinkedList<Integer> path,
      ArrayList<String> res) {
    if (sum >= total) {
      if (sum == total) res.add(path.toString());
      return;
    }
 
    for (int i = index; i < arr.length; i++) {
      path.addLast(arr[i]);
      dfs(total, arr, i, sum + arr[i], path, res);
      path.removeLast();
    }
  }
}
```

### Python算法源码

```python
amount = int(input())
prices = eval(input())
 
 
def dfs(total, arr, index, sum, path, res):
    if sum >= total:
        if sum == total:
            res.append(path[:])
        return
 
    for i in range(index, len(arr)):
        path.append(arr[i])
        dfs(total, arr, i, sum + arr[i], path, res)
        path.pop()
 
 
res = []
dfs(amount, prices, 0, 0, [], res)
print(res)
```