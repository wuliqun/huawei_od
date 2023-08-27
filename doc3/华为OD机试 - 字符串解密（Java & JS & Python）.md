题目描述
给定两个字符串string1和string2。
string1是一个被加扰的字符串。

string1由小写英文字母（’a’~’z’）和数字字符（’0’~’9’）组成，而加扰字符串由’0’~’9’、’a’~’f’组成。

string1里面可能包含0个或多个加扰子串，剩下可能有0个或多个有效子串，这些有效子串被加扰子串隔开。

string2是一个参考字符串，仅由小写英文字母（’a’~’z’）组成。

你需要在string1字符串里找到一个有效子串，这个有效子串要同时满足下面两个条件：

（1）这个有效子串里不同字母的数量不超过且最接近于string2里不同字母的数量，即小于或等于string2里不同字母的数量的同时且最大。

（2）这个有效子串是满足条件（1）里的所有子串（如果有多个的话）里字典序最大的一个。

如果没有找到合适条件的子串的话，请输出”Not Found”

输入描述
input_string1
input_string2

输出描述
output_string

用例

输入	123admyffc79pt
ssyy
输出	pt
说明	
将输入字符串1里的加扰子串“123ad”、“ffc79”去除后得到有效子串序列："my"、"pt"，其中"my"里不同字母的数量为2（有‘m’和'y'两个不同字母），“pt”里不同字母的数量为2（有'p'和't'两个不同字母）；输入字符串2里不同字母的数量为2（有‘s’和'y'两个不同字母）。

可得到最终输出结果为“pt”，其不同字母的数量最接近与“ssyy”里不同字母的数量的同时字典序最大。

输入	123admyffc79ptaagghi2222smeersst88mnrt
ssyyfgh
输出	mnrt
说明	将输入字符串1里的加扰子串“123ad”、“ffc79”、"aa"、"2222"、"ee"、"88"去除后得到有效子串序列：“my”、“pt”、“gghi”、"sm"、“rsst”、"mnrt"；输入字符串2里不同字母的数量为5（有's'、'y'、'f'、'g'、'h'5个不同字母）。可得到最终输出结果为“mnrt”，其不同字母的数量（为4）最接近于“ssyyfgh”里不同字母的数量，其他有效子串不同字母的数量都小于“mnrt”。
输入	
abcmnq
rt

输出	Not Found
说明	将输入字符串1里的加扰子串“abc”去除后得到有效子串序列：“mnq”；输入字符串2里不同字母的数量为2（有'r'、't'两个不同的字母）。可得到最终的输出结果为“Not Found”，没有符合要求的有效子串，因有效子串里的不同字母的数量（为3），大于输入字符串2里的不同字母的数量。

### 题目解析

这题出奇的简单，但是划在200分档，难道是我审题有误？

我的解题思路如下：

首先将str1按照加扰字符串来分割，这里我使用正则表达式来作为分隔符，正则为/[0-9a-f]+/，因此用例1中str1会被分割，产生一个数组valids = [""，”my“，"pt"]

然后需要求出str2的不同字母数量，这里可以使用new Set来去重，然后取size，就是str2的不同字母数量。

同样地，也可以对valids中数组元素使用上面逻辑求不同字母数量，然后将valids数组中每个元素不同字母数量超过str2的filter掉，这样valids中剩余的元素都是不同字母数量不超过str2的。

接着，对valids中元素先按照不同字母数量降序，然后按照字典序降序，取valids[0]作为题解。

如果valids没有元素，则返回Not Found

JavaScript算法源码

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
 
  if (lines.length === 2) {
    const str1 = lines[0];
    const str2 = lines[1];
 
    console.log(getResult(str1, str2));
 
    lines.length = 0;
  }
});
 
function getResult(str1, str2) {
  const regExp = /[0-9a-f]+/;
 
  const valids = str1.split(regExp);
 
  const count = new Set(str2).size;
 
  const ans = valids.filter(
    (valid) => valid !== "" && new Set(valid).size <= count
  );
 
  if (!ans.length) return "Not Found";
 
  return ans.sort((a, b) => {
    const c1 = new Set(a).size;
    const c2 = new Set(b).size;
    return c1 !== c2 ? c2 - c1 : b > a ? 1 : -1;
  })[0];
}
```

### Java算法源码

```
import java.util.*;
 
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        String str1 = sc.next();
        String str2 = sc.next();
 
        System.out.println(getResult(str1, str2));
    }
 
    public static String getResult(String str1, String str2) {
        String reg = "[0-9a-f]+";
 
        String[] valids = str1.split(reg);
 
        int count = getDistinctCount(str2);
 
        String[] ans = Arrays.stream(valids).filter(valid -> !"".equals(valid) && getDistinctCount(valid) <= count).toArray(String[]::new);
 
        if(ans.length == 0) return "Not Found";
 
        Arrays.sort(ans, (a,b)->{
            int c1 = getDistinctCount(a);
            int c2 = getDistinctCount(b);
            return c1 != c2 ? c2 - c1 : b.compareTo(a);
        });
 
        return ans[0];
    }
 
    public static int getDistinctCount(String str) {
        HashSet<Character> set = new HashSet<>();
        for (char c : str.toCharArray()) {
            set.add(c);
        }
        return set.size();
    }
}
```

### Python算法源码

```
import re
 
# 输入获取
str1 = input()
str2 = input()
 
 
# 算法入口
def getResult(str1, str2):
    pattern = r"[0-9a-f]+"
 
    valids = re.split(pattern, str1)
    count = len(set(str2))
 
    ans = list(filter(lambda valid: valid != "" and len(set(valid)) <= count, valids))
 
    if len(ans) > 0:
        ans.sort(key=lambda x: (-len(set(x)), [-ord(char) for char in x]))
        return ans[0]
    else:
        return "Not Found"
 
 
# 算法调用
print(getResult(str1, str2))
```

