题目描述
公司最近准备进行拔河比赛，需要在全部员工中进行挑选。
选拔的规则如下：

按照身高优先、体重次优先的方式准备比赛阵容；
规定参赛的队伍派出10名选手。
请实现一个选拔队员的小程序。

输入为一个数组，记录了部门人员的身高、体重信息，如[身高,体重]的方式放置；

部门全部成员数量为大于10的一个数组。

要求输出一个size为10的二维数组。


输入描述
输入为N行员工信息，表示部门报名参加选拔的候选人信息，每行有两个数字，使用空格分隔，表示员工的身高、体重信息
如
181 70
182 70
表示两位候选员工，第一人身高181厘米，体重70公斤;第二人身高182厘米，体重70公斤

输出描述
要求输出一个10行的已经排序的参赛员工信息数据，每行有两个数字，使用空格分隔，表示员工的身高、体重信息如
182 70
181 70

备注
输入数据范围：

成员身高、体重为int数据类型:
输入备选成员数量为N，10 ≤ N ≤ 100
用例
输入	181 70
182 70
183 70
184 70
185 70
186 70
180 71
180 72
180 73
180 74
180 75
输出	186 70
185 70
184 70
183 70
182 70
181 70
180 75
180 74
180 73
180 72
说明	无
题目解析
考察简单的排序。

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
  if (line != "") {
    lines.push(line);
  } else {
    const employees = lines.map((s) => s.split(" ").map(Number));
    getResult(employees);
    lines.length = 0;
  }
});
 
function getResult(employees) {
  employees.sort((a, b) => (a[0] != b[0] ? b[0] - a[0] : b[1] - a[1]));
 
  for (let i = 0; i < 10; i++) {
    console.log(employees[i].join(" "));
  }
}
```

Java算法源码

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
  static class Employee {
    int height;
    int weight;
 
    public Employee(String s) {
      int[] tmp = Arrays.stream(s.split(" ")).mapToInt(Integer::parseInt).toArray();
      this.height = tmp[0];
      this.weight = tmp[1];
    }
 
    @Override
    public String toString() {
      return this.height + " " + this.weight;
    }
  }
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
 
    ArrayList<Employee> employees = new ArrayList<>();
    while (sc.hasNextLine()) {
      String line = sc.nextLine();
 
      if ("".equals(line)) {
        getResult(employees);
        break;
      } else {
        employees.add(new Employee(line));
      }
    }
  }
 
  public static void getResult(ArrayList<Employee> employees) {
    employees.sort((a, b) -> a.height != b.height ? b.height - a.height : b.weight - a.weight);
 
    for (int i = 0; i < 10; i++) {
      System.out.println(employees.get(i));
    }
  }
}
```

Python算法源码

```
# 算法入口
def getResult(employees):
    employees.sort(key=lambda x: (-x[0], -x[1]))
 
    for i in range(10):
        print(" ".join(map(str, employees[i])))
 
 
# 输入获取
employees = []
 
while True:
    line = input()
 
    if line != "":
        employees.append(list(map(int, line.split())))
    else:
        getResult(employees)
        break
```

