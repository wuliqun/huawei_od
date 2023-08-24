题目描述
编写一个函数来查找字符串数组中的最长公共后缀；

如果不存在公共后缀，返回固定字符串： @Zero。

补充说明：

字符串长度范围：[2, 1000]
字符串中字符取值范围为[1, 126]
输入描述
无

输出描述
无

用例
输入	["abc","bbc","c"]
输出	"c"
说明	返回公共后缀: c
输入	["aa","bb","cc"]
输出	"@Zero"
说明	不存在公共后缀，返回固定结果: @Zero
题目解析
本题应该是采用核心代码模式，非ACM模式，因此不需要我们处理输入输出。

下面代码仍然以ACM模式实现，但是会将输入输出处理 和 核心代码 分离。考试时，只需要写出核心代码即可。

关于核心代码实现，我的思路如下

假设输入的字符串数组为strs，则可以：

将strs[0]假设为最长公共后缀suffx
之后，再找出suffix和strs[1]的最长公共后缀，并覆盖给suffix，按此逻辑继续找出suffix和其他strs[i]的最长公共后缀
当然，在上面过程中，一旦发现suffix == “”，即最长公共后缀是空串，则可以直接返回@Zero。

否则，返回suffix。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
rl.on("line", (line) => {
  const strs = JSON.parse(line);
  console.log(getResult(strs));
});
 
function getResult(strs) {
  // 假设第0个字符串就是最长公共后缀
  let suffix = strs[0];
 
  // 从第1个字符串开始，求解和最长公共后缀suffix的最长公共后置
  for (let i = 1; i < strs.length; i++) {
    suffix = getLCS(suffix, strs[i]);
 
    // 如果最长公共后缀为“”,则直接返回"@Zero"
    if (suffix == "") return "@Zero";
  }
 
  return suffix;
}
 
/**
 *  求两个字符串的最长公共后缀
 * @param {*} s1
 * @param {*} s2
 * @returns 最长公共后缀
 */
function getLCS(s1, s2) {
  // 如果尾字符不同，则没有公共后缀
  if (s1.at(-1) != s2.at(-1)) return "";
 
  // 最长公共后缀的长度上限是：两个字符串中较短的那个的长度值
  const maxLen = Math.min(s1.length, s2.length);
 
  // 开始逐位比较
  for (let i = -2; i >= -maxLen; i--) {
    // 如果某位对应字符不同
    if (s1.at(i) != s2.at(i)) {
      // 则该位后面的就是最长公共后缀
      return s1.slice(i + 1);
    }
  }
 
  // 如果比较完了，都没有发现对应位不同字符，则说明，两个字符串中较短者本身就是最长公共后缀
  return s1.slice(-maxLen);
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    String line = sc.nextLine();
    String[] strings =
        Arrays.stream(line.substring(1, line.length() - 1).split(","))
            .map(s -> s.substring(1, s.length() - 1))
            .toArray(String[]::new);
 
    System.out.println(getResult(strings));
  }
 
  public static String getResult(String[] strings) {
    // 假设第0个字符串就是最长公共后缀
    String suffix = strings[0];
 
    // 从第1个字符串开始，求解和最长公共后缀suffix的最长公共后置
    for (int i = 1; i < strings.length; i++) {
      suffix = getLCS(suffix, strings[i]);
 
      // 如果最长公共后缀为“”,则直接返回"@Zero"
      if ("".equals(suffix)) return "@Zero";
    }
 
    return suffix;
  }
 
  /**
   * 求两个字符串的最长公共后缀
   *
   * @param s1 字符串1
   * @param s2 字符串2
   * @return 两个字符串的最长公共后缀
   */
  public static String getLCS(String s1, String s2) {
    // 如果尾字符不同，则没有公共后缀
    if (charAt(s1, -1) != charAt(s2, -1)) return "";
 
    // 最长公共后缀的长度上限是：两个字符串中较短的那个的长度值
    int maxLen = Math.min(s1.length(), s2.length());
 
    // 开始逐位比较
    for (int i = -2; i >= -maxLen; i--) {
      // 如果某位对应字符不同,则该位后面的就是最长公共后缀
      if (charAt(s1, i) != charAt(s2, i)) return s1.substring(s1.length() + i + 1);
    }
 
    // 如果比较完了，都没有发现对应位不同字符，则说明，两个字符串中较短者本身就是最长公共后缀
    return s1.substring(s1.length() - maxLen);
  }
 
  // 负数索引找字符，比如索引-1  等价于 索引s.length-1
  public static char charAt(String s, int negativeIndex) {
    return s.charAt(s.length() + negativeIndex);
  }
}
```

py

```
# 输入获取
strs = eval(input())
 
 
def getLCS(s1, s2):
    """
    求两个字符串的最长公共后缀
    :param s1:
    :param s2:
    :return: 最长公共后缀
    """
    if s1[-1] != s2[-1]:
        return ""  # 如果尾字符不同，则没有公共后缀
 
    # 最长公共后缀的长度上限是：两个字符串中较短的那个的长度值
    maxLen = min(len(s1), len(s2))
 
    # 开始逐位比较
    for i in range(-2, -maxLen - 1, -1):
        if s1[i] != s2[i]:
            # 如果某位对应字符不同, 则该位后面的就是最长公共后缀
            return s1[i + 1:]
 
    # 如果比较完了，都没有发现对应位不同字符，则说明，两个字符串中较短者本身就是最长公共后缀
    return s1[-maxLen:]
 
 
# 核心代码
def getResult():
    # 假设第0个字符串就是最长公共后缀
    suffix = strs[0]
 
    # 从第1个字符串开始，求解和最长公共后缀suffix的最长公共后置
    for i in range(1, len(strs)):
        suffix = getLCS(suffix, strs[i])
 
        # 如果最长公共后缀为“”,则直接返回"@Zero"
        if suffix == "":
            return "@Zero"
 
    return suffix
 
 
# 算法调用
print(getResult())
```

