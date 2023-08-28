
/**
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

输入
1 3
1
=A1+C1
3
A1:C1
输出
8                    |

输入
5 3
10 12 =C5
15 5 6
7 8 =3+C2
6 =B2-A1 =C2
7 5 3
B2:C4
输出
29  
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
let lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 2){
    const [rows, cols] = lines[0].split(' ').map(Number);
    const matrix = lines.slice(1, -1).map(line=>{
      return line.split(' ').map((item)=>{
        if(/^\d+$/.test(item)){
          return Number(item);
        }else{
          return item;
        }
      });
    });
    const sum = lines[lines.length - 1];
    console.log(getResult(matrix, rows, cols, sum));
    lines.length = 0;
  }
});

/**
 * 
 * @param {Array<Array<number|string>>} matrix 
 * @param {number} rows 
 * @param {number} cols 
 * @param {string} sum 
 */
function getResult(matrix, rows, cols, sumSyntax){
  const [[x1, y1], [x2, y2]] = analyseSumSyntax(sumSyntax);
  caculateMatrix(matrix, rows, cols);
  let res = 0;
  for(let j = y1;j <= y2;j++){
    for(let i = x1;i <= x2;i++){
      res += matrix[j][i];
    }
  }
  return res;
}

function caculateMatrix(matrix, rows, cols){
  for(let i = 0;i < rows;i++){
    for(let j = 0;j < cols;j++){
      if(typeof matrix[i][j] === 'string'){
        let exp = matrix[i][j].slice(1);
        if(/-|\+/.test(exp)){
          let [left, right] = exp.split(/-|\+/);
          left = getCellValue(left, matrix);
          right = getCellValue(right, matrix);
          if(/-/.test(exp)){
            matrix[i][j] = left - right;
          }else{
            matrix[i][j] = left + right;
          }
        }else{
          matrix[i][j] = getCellValue(exp, matrix);
        }
      }
    }
  }
}

function analyseSumSyntax(sum){  
  const [from, to] = sum.split(':');
  return [analyseCell(from), analyseCell(to)];
}
function analyseCell(str){
  const ACode = 'A'.charCodeAt(0);
  return [str.charCodeAt(0) - ACode, Number(str.slice(1)) - 1];
}
function getCellValue(str, matrix){
  if(/^\d+$/.test(str)){
    return Number(str);
  }else{
    const [x, y] = analyseCell(str);
    return matrix[y][x];
  }
}


// test
const inputStr = `
1 3
1 =A1+C1 3
A1:C1
--------
5 3
10 12 =C5
15 5 6
7 8 =3+C2
6 =B2-A1 =C2
7 5 3
B2:C4
`;


!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();