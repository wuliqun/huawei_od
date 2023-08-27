题目描述
Excel工作表中对选定区域的数值进行统计的功能非常实用。

仿照Excel的这个功能，请对给定表格中选中区域中的单元格进行求和统计，并输出统计结果。

为简化计算，假设当前输入中每个单元格内容仅为数字或公式两种。

如果为数字，则是一个非负整数，形如3、77

如果为公式，则固定以=开头，且仅包含下面三种情况：

等于某单元格的值，例如=B12
两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
单元格和数字的双目运算（仅为+或-），形如=B1+1、100-B2
注意：

公式内容都是合法的，例如不存在，=C+1、=C1-C2+B3,=5、=3+5
不存在循环引用，例如A1=B1+C1、C1=A1+B2
内容中不存在空格、括号
输入描述
第一行两个整数rows cols，表示给定表格区域的行数和列数，1<=rows<=20，1<=cols<=26。
接下来rows行，每行cols个以空格分隔的字符串，表示给定表格values的单元格内容。
最后一行输入的字符串，表示给定的选中区域，形如A1:C2。

输出描述
一个整数，表示给定选中区域各单元格中数字的累加总和，范围-2,147,483,648 ~ 2,147,483,647

备注
表格的行号1~20，列号A~Z，例如单元格B3对应values[2][1]。
输入的单元格内容（含公式）中数字均为十进制，值范围[0, 100]。
选中区域：冒号左侧单元格表示选中区域的左上角，右侧表示右下角，如可以为B2:C10、B2:B5、B2:Y2、B2:B2,无类似C2:B2、C2:A1的输入。
用例

| 输入 | 1 3 1 =A1+C1 3 A1:C1 |
| ---- | -------------------- |
| 输出 | 8                    |

| 输入 | 5 3 10 12 =C5 15 5 6 7 8 =3+C2 6 =B2-A1 =C2 7 5 3 B2:C4 |
| ---- | ------------------------------------------------------- |
| 输出 | 29                                                      |

题目解析
本题逻辑不难，但是实现起来比较麻烦。

我的解题思路如下：

首先，要搞清楚Excel表格坐标和matrix输入矩阵的索引的对应关系，比如上面用例中，输入的matrix矩阵为：[ ["1", "=A1+C1", "3"] ]

其中“1”值，对应矩阵 martix[0][0]，而对应的Excel表格坐标是A1，其中A代表列号，1代表行号。

因此，我们容易得到Excel表格坐标和matrix输入矩阵的索引的对应关系：

列对应关系：String('A').charCodeAt() - 65 = 0  （PS：'A'的ASCII码值为65）
行对应关系：1 - 1 = 0
解下来，我们需要弄清楚，如何将Excel坐标，如A1，B2，C3中的列号和行号解析出来，因为只有解析出来，才能方便处理，之后才能对应到matrix的索引。

这里我们使用了正则表达式的捕获组，正则为：/^(A-Z)(\d+)$/

接下来，我们就可以实现根据Excel坐标，获取到matrix矩阵元素的逻辑了，我们定义一个方法getCell，入参Excel坐标，然后通过上面的正则解析出来对应列号、行号，然后再根据Excel列号、行号转化求得matrix矩阵的行索引、列索引，进而求得matrix矩阵对应索引的值。

此时，取得的值有两类：

1、非公式的值，比如1

2、公式，以=开头

对于非公式的值，直接将其转为数值后返回；

对于公式，又分为三种情况：

=A1+B1，即Excel坐标之间的运算
=A1-2，即Excel坐标和数值之间的运算
=A1，即Excel坐标
我们可以通过getCell方法获取到Excel坐标对应的值，然后再来运算

非正则解法
Java算法源码

```
import java.util.Scanner;
 
public class Main {
  static String[][] table; // 给定表格区域
  static int rows; // 给定表格区域的行数
  static int cols; // 给定表格区域的列数
  static String start; // 选中区域的左上角位置
  static String end; // 选中区域的右下角位置
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    rows = sc.nextInt();
    cols = sc.nextInt();
 
    table = new String[rows][cols];
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        table[i][j] = sc.next();
      }
    }
 
    String[] range = sc.next().split(":");
    start = range[0];
    end = range[1];
 
    System.out.println(getResult());
  }
 
  public static int getResult() {
    int[] s = getPos(start);
    int[] e = getPos(end);
 
    int r1 = s[0], c1 = s[1];
    int r2 = e[0], c2 = e[1];
 
    int ans = 0;
    for (int i = r1; i <= r2; i++) {
      for (int j = c1; j <= c2; j++) {
        ans += getCellVal(table[i][j]);
      }
    }
 
    return ans;
  }
 
  // 获取单元格的值
  public static int getCellVal(String cell) {
    /*
     * 单元格内容cell如果以'='开头，则必然是公式
     * */
    if (cell.charAt(0) == '=') {
      // fn是公式内容
      String fn = cell.substring(1);
 
      // 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      if (fn.contains("+")) {
        return operate(fn.split("\\+"), true);
      }
      // 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      else if (fn.contains("-")) {
        return operate(fn.split("-"), false);
      }
      // 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
      else {
        return getPosVal(getPos(fn));
      }
    }
    /*
     * 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
     * */
    else {
      return Integer.parseInt(cell);
    }
  }
 
  // 双目运算
  public static int operate(String[] ops, boolean isAdd) {
    int op1, op2;
 
    if (isPos(ops[0])) {
      // 如果操作数1是单元格
      op1 = getPosVal(getPos(ops[0]));
    } else {
      // 如果操作数1是数字
      op1 = Integer.parseInt(ops[0]);
    }
 
    if (isPos(ops[1])) {
      // 如果操作数2是单元格
      op2 = getPosVal(getPos(ops[1]));
    } else {
      // 如果操作数2是数字
      op2 = Integer.parseInt(ops[1]);
    }
 
    if (isAdd) {
      // 加法运算
      return op1 + op2;
    } else {
      // 减法运算
      return op1 - op2;
    }
  }
 
  // 解析单元格坐标  为  矩阵坐标
  public static int[] getPos(String pos) {
    int c = pos.charAt(0) - 65;
    int r = Integer.parseInt(pos.substring(1)) - 1;
    return new int[] {r, c};
  }
 
  // 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
  public static int getPosVal(int[] pos) {
    int r = pos[0], c = pos[1];
    int val = getCellVal(table[r][c]);
    table[r][c] = val + "";
    return val;
  }
 
  // 判断一个内容是否为单元格坐标
  public static boolean isPos(String str) {
    char c = str.charAt(0);
    return c <= 'Z' && c >= 'A';
  }
}
```

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const { get } = require("http");
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
 
let table, rows, cols, start, end;
 
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [rows, cols] = lines[0].split(" ").map(Number);
  }
 
  if (rows && lines.length === rows + 2) {
    lines.shift();
    [start, end] = lines.pop().split(":");
    table = lines.map((line) => line.split(" "));
    console.log(getResult());
    lines.length = 0;
  }
});
 
function getResult() {
  const [r1, c1] = getPos(start);
  const [r2, c2] = getPos(end);
 
  let ans = 0;
  for (let i = r1; i <= r2; i++) {
    for (let j = c1; j <= c2; j++) {
      ans += getCellVal(table[i][j]);
    }
  }
 
  return ans;
}
 
// 判断一个内容是否为单元格坐标
function isPos(s) {
  return s[0] <= "Z" && s[0] >= "A";
}
 
// 解析单元格坐标  为  矩阵坐标
function getPos(pos) {
  const c = pos[0].charCodeAt() - 65;
  const r = pos.slice(1) - 1;
  return [r, c];
}
 
// 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
function getPosVal(pos) {
  const [r, c] = pos;
  table[r][c] = getCellVal(table[r][c]);
  return table[r][c];
}
 
// 双目运算
function operate(ops, isAdd) {
  let op1, op2;
 
  if (isPos(ops[0])) {
    // 如果操作数1是单元格
    op1 = getPosVal(getPos(ops[0]));
  } else {
    // 如果操作数1是数字
    op1 = parseInt(ops[0]);
  }
 
  if (isPos(ops[1])) {
    // 如果操作数2是单元格
    op2 = getPosVal(getPos(ops[1]));
  } else {
    // 如果操作数2是数字
    op2 = parseInt(ops[1]);
  }
 
  if (isAdd) {
    // 加法运算
    return op1 + op2;
  } else {
    // 减法运算
    return op1 - op2;
  }
}
 
// 获取单元格的值
function getCellVal(cell) {
  /*
   * 单元格内容cell如果以'='开头，则必然是公式
   * */
  if (cell[0] == "=") {
    // fn是公式内容
    const fn = cell.slice(1);
 
    // 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
    if (fn.indexOf("+") != -1) {
      return operate(fn.split("+"), true);
    } else if (fn.indexOf("-") != -1) {
      // 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
      return operate(fn.split("-"), false);
    } else {
      // 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
      return getPosVal(getPos(fn));
    }
  } else {
    /*
     * 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
     * */
    return parseInt(cell);
  }
}
```

### Python算法源码

```
# 输入获取
rows, cols = list(map(int, input().split()))
table = [input().split() for _ in range(rows)]
start, end = input().split(":")
 
 
# 判断一个内容是否为单元格坐标
def isPos(pos):
    return "Z" >= pos[0] >= 'A'
 
 
# 解析单元格坐标  为  矩阵坐标
def getPos(pos):
    c = ord(pos[0]) - 65
    r = int(pos[1:]) - 1
    return r, c
 
 
# 获取矩阵对应坐标的值，并且更新矩阵对应单元格的内容
def getPosVal(pos):
    r, c = pos
    table[r][c] = getCellVal(table[r][c])
    return table[r][c]
 
 
# 双目运算
def operate(ops, isAdd):
    op1 = 0
    op2 = 0
 
    if isPos(ops[0]):
        # 如果操作数1是单元格
        op1 = getPosVal(getPos(ops[0]))
    else:
        # 如果操作数1是数字
        op1 = int(ops[0])
 
    if isPos(ops[1]):
        op2 = getPosVal(getPos(ops[1]))
    else:
        op2 = int(ops[1])
 
    if isAdd:
        return op1 + op2
    else:
        return op1 - op2
 
 
# 获取单元格的值
def getCellVal(cell):
    cell = str(cell)
    # 单元格内容cell如果以'='开头，则必然是公式
    if cell[0] == "=":
        # fn是公式内容
        fn = cell[1:]
 
        # 如果公式内容fn包含“+”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
        if fn.find("+") != -1:
            return operate(fn.split("+"), True)
        # 如果公式内容fn包含“-”，则可能是两个单元格的双目运算，也可能是单元格和数字的双目运算
        elif fn.find("-") != -1:
            return operate(fn.split("-"), False)
        # 如果公式内容fn不包含“+”和“-”，则必然等于某单元格的值，例如=B12
        else:
            return getPosVal(getPos(fn))
    # 单元格内容cell如果不以'='开头，则必然是数字，且是非负正数
    else:
        return int(cell)
 
 
# 算法入口
def getResult():
    r1, c1 = getPos(start)
    r2, c2 = getPos(end)
 
    ans = 0
    for i in range(r1, r2 + 1):
        for j in range(c1, c2 + 1):
            ans += getCellVal(table[i][j])
 
    return ans
 
 
# 算法调用
print(getResult())
```

## 正则解法

### JavaScript算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
let rows, cols;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 1) {
    [rows, cols] = lines[0].split(" ").map(Number);
  }
 
  if (rows && lines.length === rows + 2) {
    lines.shift();
    const [start, end] = lines.pop().split(":");
    const matrix = lines.map((line) => line.split(" "));
    console.log(getResult(matrix, rows, cols, start, end));
    lines.length = 0;
  }
});
 
/**
 * 求和选中区域所有数的和
 * @param {*} matrix 给定表格区域
 * @param {*} rows 给定表格区域的行数
 * @param {*} cols 给定表格区域的列数
 * @param {*} start 选中区域的左上角位置
 * @param {*} end 选中区域的右下角位置
 */
function getResult(matrix, rows, cols, start, end) {
  // 该正则用于分解出Excel单元格位置坐标（形式如A1，B2，C3）的列和行，注意字母是列号，数字是行号
  const regExp = /^([A-Z])(\d+)$/;
 
  // 获取指定坐标pos的单元格内的值，pos形式如A1，B2，C3
  function getCell(pos) {
    let [_, col, row] = regExp.exec(pos);
    col = String(col).charCodeAt() - 65; // 题目说列号取值A~Z，起始列A对应的码值65，A列等价于matrix矩阵的第0行
    row -= 1; // 起始行1，等价于matrix矩阵的第0行
 
    // 如果单元格内容以=开头，则为公式
    if (String(matrix[row][col]).startsWith("=")) {
      // 公式有三种情况
      // 等于某单元格的值，例如=B12
      // 两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
      // 单元格和数字的双目运算（仅为+或-），形如=B1+1、100-B2
      let [_, cell1, cell2] = matrix[row][col].split(/[\=\+\-]/);
      if (!cell2) cell2 = 0; // 对于 =A1 这种情况，cell2结构出来是undefined，我们需要考虑这种情况将其置为0
 
      // 如果cell解析出来是值，则直接使用
      if (/^\d+$/.test(cell1)) {
        cell1 -= 0;
      }
      // 如果cell解析出来不是值，那就是Excel坐标
      else {
        cell1 = getCell(cell1);
      }
 
      // 同上
      if (/^\d+$/.test(cell2)) {
        cell2 -= 0;
      } else {
        cell2 = getCell(cell2);
      }
 
      // 如果cell1和cell2是相加
      if (matrix[row][col].includes("+")) {
        matrix[row][col] = cell1 + cell2;
      }
      // 如果cell1和cell2是相减
      else if (matrix[row][col].includes("-")) {
        matrix[row][col] = cell1 - cell2;
      }
      // 如果没有运算，那就只可能是单值，直接使用
      else {
        matrix[row][col] = cell1;
      }
    }
    // 如果单元格内容不以=开头，则为可以直接使用的数值
    else {
      matrix[row][col] -= 0;
    }
 
    return matrix[row][col];
  }
 
  // 选中区域左上角坐标的解析
  let [_1, col_start, row_start] = regExp.exec(start);
  // 选中区域右下角坐标的解析
  let [_2, col_end, row_end] = regExp.exec(end);
 
  // 列坐标处理
  col_start = String(col_start).charCodeAt();
  col_end = String(col_end).charCodeAt();
  // 行坐标处理
  row_start -= 0;
  row_end -= 0;
 
  let ans = 0;
  for (let j = col_start; j <= col_end; j++) {
    for (let i = row_start; i <= row_end; i++) {
      ans += getCell(`${String.fromCharCode(j)}${i}`);
    }
  }
 
  return ans;
}
```

### Java算法源码

```
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class Main {
  static Pattern p = Pattern.compile("^([A-Z])(\\d+)$");
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    int rows = sc.nextInt();
    int cols = sc.nextInt();
 
    String[][] matrix = new String[rows][cols];
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        matrix[i][j] = sc.next();
      }
    }
 
    String[] range = sc.next().split(":");
 
    System.out.println(getResult(matrix, rows, cols, range[0], range[1]));
  }
 
  /**
   * @param matrix 给定表格区域
   * @param rows 给定表格区域的行数
   * @param cols 给定表格区域的列数
   * @param start 选中区域的左上角位置
   * @param end 选中区域的右下角位置
   * @return 求和选中区域所有数的和
   */
  public static int getResult(String[][] matrix, int rows, int cols, String start, String end) {
    // 正则p于分解出Excel单元格位置坐标（形式如A1，B2，C3）的列和行，注意字母是列号，数字是行号
    Matcher m1 = p.matcher(start);
    Matcher m2 = p.matcher(end);
 
    if (m1.find() && m2.find()) {
      // 选中区域左上角坐标的解析
      int col_start = m1.group(1).charAt(0);
      int row_start = Integer.parseInt(m1.group(2));
 
      // 选中区域右下角坐标的解析
      int col_end = m2.group(1).charAt(0);
      int row_end = Integer.parseInt(m2.group(2));
 
      // ans保存选中区域所有数的和
      int ans = 0;
      // 从左上角坐标遍历到右下角坐标
      for (int j = col_start; j <= col_end; j++) {
        for (int i = row_start; i <= row_end; i++) {
          char c = (char) j;
          ans += getCell(c + "" + i, matrix);
        }
      }
      return ans;
    }
 
    // 异常情况，应该不会走到这步
    return 0;
  }
 
  /**
   * @param pos 指定Excel表格坐标，pos形式如A1，B2，C3
   * @param matrix Excel给定表格区域
   * @return 指定坐标pos的单元格内的值
   */
  public static int getCell(String pos, String[][] matrix) {
    Matcher m = p.matcher(pos);
    if (m.find()) {
      // 题目说列号取值A~Z，起始列A对应的码值65，A列等价于matrix矩阵的第0列
      int col = m.group(1).charAt(0) - 65;
      // 起始行1，等价于matrix矩阵的第0行
      int row = Integer.parseInt(m.group(2)) - 1;
 
      String cell = matrix[row][col];
      // 如果单元格内容以=开头，则为公式
      if (cell.startsWith("=")) {
        // 公式有三种情况
        // 等于某单元格的值，例如=B12
        // 两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
        String[] combine = cell.split("[\\=\\+\\-]");
 
        String cell1 = combine[1];
 
        // 对于 =A1 这种情况，cell2没有值
        String cell2 = null;
        if (combine.length > 2) {
          cell2 = combine[2];
        }
 
        int cell1_val;
        if (cell1.matches("^-?\\d+$")) {
          // 如果cell解析出来是值，则直接使用
          cell1_val = Integer.parseInt(cell1);
        } else {
          // 如果cell解析出来不是值，那就是Excel坐标
          cell1_val = getCell(cell1, matrix);
        }
 
        // 同上
        int cell2_val;
        if (cell2 != null) {
          if (cell2.matches("^-?\\d+$")) {
            cell2_val = Integer.parseInt(cell2);
          } else {
            cell2_val = getCell(cell2, matrix);
          }
        } else {
          cell2_val = 0;
        }
 
        // 如果cell1和cell2是相加
        if (cell.contains("+")) {
          matrix[row][col] = cell1_val + cell2_val + "";
        }
        // 如果cell1和cell2是相减
        else if (cell.contains("-")) {
          matrix[row][col] = cell1_val - cell2_val + "";
        }
        // 如果没有运算，那就只可能是单值，直接使用
        else {
          matrix[row][col] = cell1_val + "";
        }
      }
 
      // 如果单元格内容以=开头，则以上逻辑会将单元格内容更新为数值
      // 如果单元格内容不以=开头，则为可以直接使用的数值
      return Integer.parseInt(matrix[row][col]);
    }
 
    // 异常情况，应该不会走到这步
    return 0;
  }
}
```

### Python算法源码

```
import re
 
# 输入获取
rows, cols = list(map(int, input().split()))
matrix = [input().split() for i in range(rows)]
start, end = input().split(":")
 
# 全局变量，该正则于分解出Excel单元格位置坐标（形式如A1，B2，C3）的列和行，注意字母是列号，数字是行号
pattern = r"^([A-Z])(\d+)$"
 
 
# 算法入口
def getResult(start, end):
    """
    :param start: 选中区域的左上角位置
    :param end: 选中区域的右下角位置
    :return: 求和选中区域所有数的和
    """
 
    # 选中区域左上角坐标的解析
    col_start, row_start = re.findall(pattern, start)[0]
    col_start = ord(col_start)
    row_start = int(row_start)
 
    # 选中区域右下角坐标的解析
    col_end, row_end = re.findall(pattern, end)[0]
    col_end = ord(col_end)
    row_end = int(row_end)
 
    # ans保存选中区域所有数的和
    ans = 0
    # 从左上角坐标遍历到右下角坐标
    for j in range(col_start, col_end + 1):
        for i in range(row_start, row_end + 1):
            ans += getCell(f"{chr(j)}{i}")
 
    return ans
 
 
def getCell(pos):
    """
    :param pos: 指定Excel表格坐标，pos形式如A1，B2，C3
    :return: 指定坐标pos的单元格内的值
    """
    col, row = re.findall(pattern, pos)[0]
 
    # 题目说列号取值A~Z，起始列A对应的码值65，A列等价于matrix矩阵的第0列
    col = ord(col) - 65
    # 起始行1，等价于matrix矩阵的第0行
    row = int(row) - 1
 
    tmp = str(matrix[row][col])
 
    # 如果单元格内容以=开头，则为公式
    if tmp.startswith("="):
        # 公式有三种情况
        # 等于某单元格的值，例如=B12
        # 两个单元格的双目运算（仅为+或-），形如=C1-C2、C3+B2
        combine = re.split("[\\=\\+\\-]", tmp)
 
        cell1 = combine[1]
 
        # 对于 =A1 这种情况，cell2没有值
        cell2 = None
        if len(combine) > 2:
            cell2 = combine[2]
 
        if str(cell1).isdigit():
            # 如果cell解析出来是值，则直接使用
            cell1 = int(cell1)
        else:
            # 如果cell解析出来不是值，那就是Excel坐标
            cell1 = getCell(cell1)
 
        # cell2处理基本和cell1相同，但是cell2是None时，取默认值0
        if cell2 is None:
            cell2 = 0
        elif str(cell2).isdigit():
            cell2 = int(cell2)
        else:
            cell2 = getCell(cell2)
 
        # 如果cell1和cell2是相加
        if tmp.find("+") != -1:
            matrix[row][col] = cell1 + cell2
        # 如果cell1和cell2是相减
        elif tmp.find("-") != -1:
            matrix[row][col] = cell1 - cell2
        # 如果没有运算，那就只可能是单值，直接使用
        else:
            matrix[row][col] = cell1
    else:
        matrix[row][col] = int(tmp)
 
    # 如果单元格内容以=开头，则以上逻辑会将单元格内容更新为数值
    # 如果单元格内容不以=开头，则为可以直接使用的数值
    return matrix[row][col]
 
 
# 算法调用
print(getResult(start, end))
```

