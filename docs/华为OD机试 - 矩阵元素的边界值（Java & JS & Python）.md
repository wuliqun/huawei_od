题目描述
给定一个N*M矩阵，请先找出M个该矩阵中每列元素的最大值，然后输出这M个值中的最小值

输入描述
无

输出描述
无

备注
N和M的取值范围均为：[0, 100]

用例
输入	[[1,2],[3,4]]
输出	3
说明	
第一列元素为：1和3，最大值为3；

第二列元素为：2和4，最大值为4

各列最大值3和4的最小值为3

题目解析 
经考友反馈，本题采用核心代码模式，非ACM模式，因此不需要我们处理输入输出。

下面代码仍然以ACM模式实现，但是会将输入输出处理 和 核心代码 分离。考试时，只需要写出核心代码即可。

本题非常简单，遍历矩阵，完成每列的最大值查找，然后再找出这些值中最小的输出。

JS算法源码

```
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
// 输入输出处理
rl.on("line", (line) => {
  const matrix = JSON.parse(line);
  console.log(getResult(matrix));
});
 
// 核心代码
function getResult(matrix) {
  // 本题N和M取值是[0,100]，如果N或M取0的话，则本题没有结果，理论上应该不会出现这种情况，因为题目也没说
  if (matrix.length == 0 || matrix[0].length == 0) return -1;
 
  const col_max_value = matrix[0]; // 取矩阵第一行作为每列的基准值
 
  // 从矩阵第二行开始遍历
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // 保留每列的最大值
      col_max_value[j] = Math.max(col_max_value[j], matrix[i][j]);
    }
  }
 
  // 取每列最大值中的最小值
  return Math.min(...col_max_value);
}
```

java

```
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  // 输入输出处理
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String line = sc.nextLine();
 
    int[][] matrix =
        Arrays.stream(line.substring(2, line.length() - 2).split("],\\["))
            .map(s -> Arrays.stream(s.split(",")).mapToInt(Integer::parseInt).toArray())
            .toArray(int[][]::new);
 
    System.out.println(getResult(matrix));
  }
 
  // 核心代码
  public static int getResult(int[][] matrix) {
    // 本题N和M取值是[0,100]，如果N或M取0的话，则本题没有结果，理论上应该不会出现这种情况，因为题目也没说
    if (matrix.length == 0 || matrix[0].length == 0) return -1;
 
    int[] cols_max_value = matrix[0]; // 取矩阵第一行作为每列的基准值
 
    // 从矩阵第二行开始遍历
    for (int i = 1; i < matrix.length; i++) {
      for (int j = 0; j < matrix[i].length; j++) {
        // 保留每列的最大值
        cols_max_value[j] = Math.max(cols_max_value[j], matrix[i][j]);
      }
    }
 
    // 取每列最大值中的最小值
    return Arrays.stream(cols_max_value).min().orElse(0);
  }
}
```

py

```
# 输入获取
matrix = eval(input())
 
 
# 核心代码
def getResult(matrix):
    # 本题N和M取值是[0,100]，如果N或M取0的话，则本题没有结果，理论上应该不会出现这种情况，因为题目也没说
    if len(matrix) == 0 or len(matrix[0]) == 0:
        return -1
 
    # 取矩阵第一行作为每列的基准值
    col_max_value = matrix[0]
 
    # 从矩阵第二行开始遍历
    for i in range(1, len(matrix)):
        for j in range(len(matrix[i])):
            # 保留每列的最大值
            col_max_value[j] = max(col_max_value[j], matrix[i][j])
 
    # 取每列最大值中的最小值
    return min(col_max_value)
 
 
# 算法调用
print(getResult(matrix))
```

