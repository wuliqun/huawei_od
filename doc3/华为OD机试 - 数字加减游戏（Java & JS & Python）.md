题目描述
小明在玩一个数字加减游戏，只使用加法或者减法，将一个数字s变成数字t。
每个回合，小明可以用当前的数字加上或减去一个数字。
现在有两种数字可以用来加减，分别为a,b(a!=b)，其中b没有使用次数限制。
请问小明最少可以用多少次a，才能将数字s变成数字t。
题目保证数字s一定能变成数字t。

输入描述
输入的唯一一行包含四个正整数s,t,a,b(1<=s,t,a,b<=105)，并且a!=b。

输出描述
输出的唯一一行包含一个整数，表示最少需要使用多少次a才能将数字s变成数字t。

用例

| 输入 | 1 10 5 2                                                   |
| ---- | ---------------------------------------------------------- |
| 输出 | 1                                                          |
| 说明 | 初始值1加一次a变成6，然后加两次b变成10，因此a的使用次数为1 |

| 输入 | 11 33 4 10                                              |
| ---- | ------------------------------------------------------- |
| 输出 | 2                                                       |
| 说明 | 11减两次a变成3，然后加三次b变成33，因此a的使用次数为2次 |

题目解析
本题有点像数学问题

比如用例1其实就是求解：

满足 5 * x + 2 * y = 9  的所有解中绝对值最小的x

比如用例2其实就是求解：

满足 4 * x + 10 * y = 22 的所有解中绝对值最小的x

因此，我们可以让x从0开始尝试，然后尝试1，-1，然后尝试2，-2，直到找到一个x能够让（比如用例1）(9 - 5*x) / 2 为一个整数。

由于本题1<=s,t,a,b<=105，数量级较小，因此上面逻辑可行。

JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const [s, t, a, b] = line.split(" ").map(Number);
  console.log(getResult(s, t, a, b));
});
 
function getResult(s, t, a, b) {
  let x = 0;
  let diff = t - s;
  while (true) {
    if (
      Number.isInteger((diff - a * x) / b) ||
      Number.isInteger((diff + a * x) / b)
    ) {
      return Math.abs(x);
    }
 
    x++;
  }
}
```

### Java算法源码

```
import java.util.*;
 
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        int[] arr = new int[4];
        for (int i = 0; i < 4; i++) {
            arr[i] = sc.nextInt();
        }
 
        System.out.println(getResult(arr[0], arr[1], arr[2], arr[3]));
    }
 
    public static int getResult(int s, int t, int a, int b) {
        int x = 0;
        int diff = t - s;
        while (true) {
            if ((diff - a * x) % b == 0 || (diff + a * x) % b == 0) {
                 return Math.abs(x);
            }
            x++;
        }
    }
}
```

### Python算法源码

```
# 输入获取
s, t, a, b = map(int, input().split())
 
 
# 算法入口
def getResult(s, t, a, b):
    x = 0
    diff = t - s
    while True:
        if str((diff - a * x) / b).endswith(".0") or str((diff + a * x) / b).endswith(".0"):
            return abs(x)
        x += 1
 
 
# 算法调用
print(getResult(s, t, a, b))
```

