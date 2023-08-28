
/**
题目描述
有一名科学家想要从一台古董电脑中拷贝文件到自己的电脑中加以研究。

但此电脑除了有一个3.5寸软盘驱动器以外，没有任何手段可以将文件持贝出来，而且只有一张软盘可以使用。

因此这一张软盘是唯一可以用来拷贝文件的载体。

科学家想要尽可能多地将计算机中的信息拷贝到软盘中，做到软盘中文件内容总大小最大。

已知该软盘容量为1474560字节。文件占用的软盘空间都是按块分配的，每个块大小为512个字节。一个块只能被一个文件使用。拷贝到软盘中的文件必须是完整的，且不能采取任何压缩技术。

输入描述
第1行为一个整数N，表示计算机中的文件数量。1 ≤ N ≤ 1000.
接下来的第2行到第N+1行(共N行)，每行为一个整数，表示每个文件的大小Si，单位为字节。

0 ≤ i < N,0 ≤ Si

输出描述
科学家最多能拷贝的文件总大小

备注
为了充分利用软盘空间，将每个文件在软盘上占用的块记录到本子上。即真正占用软盘空间的只有文件内容本身。

用例
输入	3
737270
737272
737288
输出	1474542
说明	3个文件中，每个文件实际占用的大小分别为737280字节、737280字节、737792字节。
只能选取前两个文件，总大小为1474542字节。虽然后两个文件总大小更大且未超过1474560字节，但因为实际占用的大小超过了1474560字节，所以不能选后两个文件。
输入	6
400000
200000
200000
200000
400000
400000
输出	1400000
说明	
从6个文件中，选择3个大小为400000的文件和1个大小为200000的文件，得到最大总大小为1400000。

也可以选择2个大小为400000的文件和3个大小为200000的文件，得到的总大小也是1400000
 */

const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
let lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === parseInt(lines[0]) + 1){
    const nums = lines.slice(1).map(Number);
    console.log(getResult(nums));
    lines.length = 0;
  }
});

const SIZE = 1474560;
const PACK_SIZE = 512;
const PACKS = SIZE / PACK_SIZE;
function getResult(nums){ 
  const files = nums.map(num=>({
    value: num,
    weight: Math.ceil(num / PACK_SIZE),
  }));
  return getMaxValue(files, PACKS);
}

/**
 * dp[i][j]  从0 - i中 不超过j的最大价值
 * @param {Array<{value:number;weight:number}>} files 
 * @param {number} total 
 */
function getMaxValue(files, total){
  const n = files.length;
  const dp = new Array(n + 1).fill(0).map(()=>new Array(total + 1).fill(0));
  let file;
  for(let i = 1;i <= n;i++){
    file = files[i - 1];
    for(let j = 0;j <= total;j++){
      if(file.weight > j){
        dp[i][j] = dp[i - 1][j];
      }else{
        dp[i][j] = Math.max(dp[i - 1][j], file.value + dp[i - 1][j - file.weight]);
      }
    }
  }
  return dp[n][total];
}


// test
const inputStr = `
3
737270
737272
737288
--------
6
400000
200000
200000
200000
400000
400000
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

