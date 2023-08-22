题目描述
张兵和王武是五子棋迷，工作之余经常切磋棋艺。这不，这会儿又下起来了。走了一会儿，轮张兵了，对着一条线思考起来了，这条线上的棋子分布如下:
用数组表示: -1 0 1 1 1 0 1 0 1 -1
棋了分布说明:

-1代表白子，0代表空位，1 代表黑子
数组长度L，满足 1 < L < 40，L为奇数
你得帮他写一个程序，算出最有利的出子位置。 最有利定义：

找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大
如果存在多个位置，返回最靠近中间的较小的那个坐标
如果不存在可行位置，直接返回-1
连续长度不能超过5个(五字棋约束)
输入描述
第一行: 当前出子颜色

第二行: 当前的棋局状态

输出描述
1个整数，表示出子位置的数组下标

用例
输入	1
-1 0 1 1 1 0 1 -1 1
输出	5
说明	当前为黑子 (1)，放置在下标为5的位置，黑子的最大连续长度，可以由3到5
输入	-1
-1 0 1 1 1 0 1 0 1 -1 1
输出	1
说明	当前为白子，唯一可以放置的位置下标为1，白子的最大长度，由1变为2
输入	1
0 0 0 0 1 0 0 0 0 1 0
输出	5
说明	可行的位置很多，5最接近中间的位置坐标
题目解析
本题可以使用双指针解题。

定义两个指针L，R，我们假设L,R范围就是要求的连棋范围，那么L,R范围内必须要包含一个0，用于落子，且只能有一个0，范围内其余棋子必须是下棋者对应的颜色（第一行输入的颜色）。

另外，根据题目描述：

连续长度不能超过5个(五字棋约束)

即L,R范围内需要满足三个条件：

L,R范围内必须要包含一个0，用于落子，且只能有一个0
范围内其余棋子必须是下棋者对应的颜色
L,R范围长度不能超过5
上面三个条件约束着双指针的运动，下面给出三个用例的L,R指针运动示意图：

用例1

[![image.png](https://img-blog.csdnimg.cn/042846f3e50f405fabcb1d341d7d0217.png)]

> 通过上面例子，我们可以知道，在什么时机进行连棋的统计，需要统计连棋的落子位置和长度



用例2

[![image.png](https://img-blog.csdnimg.cn/7073057d42e2407dbc0b1173fce6877c.png)]

> 上面例子中，如果连棋中断，即遇到不同颜色的棋子，则L,R需要同时移动到该不同颜色棋子的右侧



用例3

[![image.png](https://img-blog.csdnimg.cn/5b6eb4f122e345b497cd9a6568aa83b2.png)]

 上面例子中，如果落子超标，则我们需要将L指针移动到上一次落子位置的右侧，以此来满足L,R范围内落子数量只有一个

2023.06.04

上面逻辑没有考虑到一个点：

找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大

即落子后，一定要让当前子的最大连续长度变大，如果落子后，该子的最大连续长度没有变大，那么就代表不是最有利位置

因此，下面代码追加了一个getInitMaxConstantLen方法，用于获取初始状态时的最大连续长度，后续落子时，需要看新的连续长度是否超过初始最大的，只有超过了，对应落子位置才是一个可能解。

Java算法源码

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int color = Integer.parseInt(sc.nextLine());
    int[] nums = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
 
    System.out.println(getResult(color, nums));
  }
 
  public static int getResult(int color, int[] nums) {
    // 获取初始的最大连续长度
    int initMaxConstantLen = getInitMaxConstantLen(color, nums);
 
    ArrayList<int[]> ans = new ArrayList<>();
 
    // l~r之间必须且只能包含一个0，即必须落子一次，其余都是color颜色的棋子
    int l = 0;
    int r = 0;
 
    // l~r之间包含的0的数量，即落子数量
    int zero = 0;
    // l~r之间0的位置，即落子位置
    int pos = -1;
 
    while (r < nums.length) {
      // 如果nums[r]是空位
      if (nums[r] == 0) {
        // 则可以落子，因此落子个数++
        zero++;
 
        // 如果落子数量超过1个了，则此时 l~r-1 范围就是一个连棋(PS:r位置不算在内)，
        // 如果该连棋长度 (r-1) - l + 1 <= 5（PS:五字棋约束），则是一个合法的连棋
        // 本题要求落子可以使得当前子的最大连续长度变大
        if (zero > 1 && r - l <= 5 && r - l > initMaxConstantLen) {
          ans.add(new int[] {pos, r - l}); // 记录 l~r-1 范围的落子位置pos，以及连续长度r-l
        }
 
        // 由于只能落子一次，因此前面的落子需要收回，即更新 l 到上一次落子位置的右边
        if (zero > 1) {
          zero--;
          l = pos + 1;
        }
 
        // 更新落子位置
        pos = r;
 
        ++r;
      }
      // 如果nums[r]位置有其他颜色棋子，则连棋中断
      else if (nums[r] != color) {
        // 此时需要检查 l~r-1 范围是否落过子，且是否符合五子棋约束
        // 若是，则记录 l~r-1 范围的落子位置pos，以及连续长度r-l
        // 本题要求落子可以使得当前子的最大连续长度变大
        if (zero == 1 && r - l <= 5 && r - l > initMaxConstantLen) ans.add(new int[] {pos, r - l});
        // 由于连棋中断了，因此落子位置pos，和落子数量全部重置
        pos = -1;
        zero = 0;
        // l,r全部更新到当前r的右边一个位置
        l = ++r;
      }
      // 如果nums[r]位置有当前颜色棋子，则连棋继续
      else {
        ++r;
      }
    }
 
    // 收尾操作
    if (zero == 1 && r - l <= 5 && r - l > initMaxConstantLen) {
      ans.add(new int[] {pos, r - l});
    }
 
    // 如果没有统计到连棋情，则返回-1
    if (ans.size() == 0) return -1;
 
    int mid = nums.length / 2;
 
    // 如果统计到连棋
    // 先按照连棋长度降序，如果长度相同，则按照接近中心位置mid的距离升序（越近的越优），如果距离中心位置mid相同，则按照落子位置升序（越小的越优）
    ans.sort((a, b) -> a[1] != b[1] ? b[1] - a[1] : cmp(a[0], b[0], mid));
    return ans.get(0)[0]; // 取最优情况的落子位置
  }
 
  // 比较pos1,pos2谁更接近mid，如果距离mid相同，则返回较小的
  public static int cmp(int pos1, int pos2, int mid) {
    int dis1 = Math.abs(pos1 - mid);
    int dis2 = Math.abs(pos2 - mid);
 
    if (dis1 != dis2) {
      return dis1 - dis2;
    } else {
      return pos1 - pos2;
    }
  }
 
  // 获取初始最大连续长度，即未落子前的最大连续长度
  public static int getInitMaxConstantLen(int color, int[] nums) {
    int maxLen = 0;
 
    int len = 0;
    for (int num : nums) {
      if (num != color) {
        maxLen = Math.max(maxLen, len);
        len = 0;
      } else {
        len++;
      }
    }
 
    return Math.max(maxLen, len);
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
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 2) {
    const color = lines[0] - 0;
    const nums = lines[1].split(" ").map(Number);
 
    console.log(getResult(color, nums));
 
    lines.length = 0;
  }
});
 
function getResult(color, nums) {
  // 获取初始的最大连续长度
  const initMaxConstantLen = getInitMaxConstantLen(color, nums);
 
  const ans = [];
 
  // l~r之间必须落子一次，其余都是color颜色的棋子
  let l = 0;
  let r = 0;
 
  // l~r之间包含的0的数量，即落子数量
  let zero = 0;
  // l~r之间0的位置，即落子位置
  let pos = -1;
 
  while (r < nums.length) {
    // 如果nums[r]是空位
    if (nums[r] == 0) {
      // 则可以落子，因此落子个数++
      zero++;
 
      // 如果落子数量超过1个了，则此时 l~r-1 范围就是一个连棋(PS:r位置不算在内)，
      // 如果该连棋长度 (r-1) - l + 1 <= 5（PS:五字棋约束），则是一个合法的连棋
      // 本题要求落子可以使得当前子的最大连续长度变大
      if (zero > 1 && r - l <= 5 && r - l > initMaxConstantLen) {
        // 记录 l~r-1 范围的落子位置pos，以及连续长度r-l
        ans.push([pos, r - l]);
      }
 
      // 由于只能落子一次，因此前面的落子需要收回，即更新 l 到上一次落子位置的右边
      if (zero > 1) {
        zero--;
        l = pos + 1;
      }
 
      // 更新落子位置
      pos = r;
 
      ++r;
    }
    // 如果nums[r]位置有其他颜色棋子，则连棋中断
    else if (nums[r] != color) {
      // 此时需要检查 l~r-1 范围是否落过子，且是否符合五子棋约束
      // 若是，则记录 l~r-1 范围的落子位置pos，以及连续长度r-l
      // 本题要求落子可以使得当前子的最大连续长度变大
      if (zero == 1 && r - l <= 5 && r - l > initMaxConstantLen) {
        ans.push([pos, r - l]);
      }
      // 由于连棋中断了，因此落子位置pos，和落子数量全部重置
      pos = -1;
      zero = 0;
      // l,r全部更新到当前r的右边一个位置
      l = ++r;
    }
    // 如果nums[r]位置有当前颜色棋子，则连棋继续
    else {
      ++r;
    }
  }
 
  // 收尾操作
  if (zero == 1 && r - l <= 5 && r - l > initMaxConstantLen) {
    ans.push([pos, r - l]);
  }
 
  // 如果没有统计到连棋情，则返回-1
  if (ans.length == 0) return -1;
 
  const mid = Math.floor(nums.length / 2);
 
  // 如果统计到连棋
  // 先按照连棋长度降序，如果长度相同，则按照接近中心位置mid的距离升序（越近的越优），如果距离中心位置mid相同，则按照落子位置升序（越小的越优）
  ans.sort((a, b) => (a[1] != b[1] ? b[1] - a[1] : cmp(a[0], b[0], mid)));
 
  return ans[0][0]; // 取最优情况的落子位置
}
 
// 比较pos1,pos2谁更接近mid，如果距离mid相同，则返回较小的pos
function cmp(pos1, pos2, mid) {
  const dis1 = Math.abs(pos1 - mid);
  const dis2 = Math.abs(pos2 - mid);
 
  if (dis1 != dis2) {
    return dis1 - dis2;
  } else {
    return pos1 - pos2;
  }
}
 
function getInitMaxConstantLen(color, nums) {
  let maxLen = 0;
 
  let len = 0;
  for (let num of nums) {
    if (num != color) {
      maxLen = Math.max(maxLen, len);
      len = 0;
    } else {
      len++;
    }
  }
 
  return Math.max(maxLen, len);
}
```

py

```
# 输入获取
color = int(input())
nums = list(map(int, input().split()))
 
 
# 获取初始最大连续长度，即未落子前的最大连续长度
def getInitMaxConstantLen():
    maxLen = 0
 
    length = 0
    for num in nums:
        if num != color:
            maxLen = max(maxLen, length)
            length = 0
        else:
            length += 1
 
    return max(maxLen, length)
 
 
# 算法入口
def getResult():
    # 获取初始的最大连续长度
    initMaxConstantLen = getInitMaxConstantLen()
 
    ans = []
 
    # l~r之间必须且只能包含一个0，即必须落子一次，其余都是color颜色的棋子
    l = 0
    r = 0
 
    # l~r之间包含的0的数量，即落子数量
    zero = 0
    # l~r之间0的位置，即落子位置
    pos = -1
 
    while r < len(nums):
        # 如果nums[r]是空位
        if nums[r] == 0:
            # 则可以落子，因此落子个数++
            zero += 1
 
            # 如果落子数量超过1个了，则此时 l~r-1 范围就是一个连棋(PS:r位置不算在内)
            if zero > 1:
                # 如果该连棋长度 (r-1) - l + 1 <= 5（PS:五字棋约束），则是一个合法的连棋
                # 记录 l~r-1 范围的落子位置pos，以及连续长度r-l
                # 本题要求落子可以使得当前子的最大连续长度变大
                if initMaxConstantLen < r - l <= 5:
                    ans.append([pos, r - l])
 
                # 由于只能落子一次，因此前面的落子需要收回，即更新 l 到上一次落子位置的右边
                zero -= 1
                l = pos + 1
 
            # 更新落子位置
            pos = r
            r += 1
        # 如果nums[r]位置有其他颜色棋子，则连棋中断
        elif nums[r] != color:
            # 此时需要检查 l~r-1 范围是否落过子，且是否符合五子棋约束
            # 若是，则记录 l~r-1 范围的落子位置pos，以及连续长度r-l
            # 本题要求落子可以使得当前子的最大连续长度变大
            if zero == 1 and initMaxConstantLen < r - l <= 5:
                ans.append([pos, r - l])
 
            # 由于连棋中断了，因此落子位置pos，和落子数量全部重置
            pos = -1
            zero = 0
 
            # l,r全部更新到当前r的右边一个位置
            r += 1
            l = r
        else:
            r += 1
 
    # 收尾操作
    if zero == 1 and initMaxConstantLen < r - l <= 5:
        ans.append([pos, r - l])
 
    # 如果没有统计到连棋情，则返回-1
    if len(ans) == 0:
        return -1
 
    mid = len(nums) // 2
 
    # 如果统计到连棋
    # 先按照连棋长度降序，如果长度相同，则按照接近中心位置mid的距离升序（越近的越优），如果距离中心位置mid相同，则按照落子位置升序（越小的越优）
    ans.sort(key=lambda x: (-x[1], abs(x[0] - mid), x[0]))
 
    # 取最优情况的落子位置
    return ans[0][0]
 
 
# 算法调用
print(getResult())
```

