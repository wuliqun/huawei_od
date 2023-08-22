/**

题目描述
有一座保密大楼，你从0楼到达指定楼层m，必须这样的规则乘坐电梯：

给定一个数字序列，每次根据序列中的数字n，上升n层或者下降n层，前后两次的方向必须相反，规定首次的方向向上，自行组织序列的顺序按规定操作到达指定楼层。

求解到达楼层的序列组合，如果不能到达楼层，给出小于该楼层的最近序列组合。

输入描述
第一行：期望的楼层，取值范围[1,50]; 序列总个数，取值范围[1,23]

第二行：序列，每个值取值范围[1,50]

输出描述
能够达到楼层或者小于该楼层最近的序列

备注
操作电梯时不限定楼层范围。
必须对序列中的每个项进行操作，不能只使用一部分。
用例
输入	5 3
1 2 6
输出	6 2 1
说明	1 2 6，6 2 1均为可行解，按先处理大值的原则结果为6 2 1
题目解析
我的解题思路如下：

由于题目说

给定一个数字序列，每次根据序列中的数字n，上升n层或者下降n层，前后两次的方向必须相反，规定首次的方向向上，自行组织序列的顺序按规定操作到达指定楼层

因此，我们可以认为要从数字序列中选出两组数，一组是上升，一组是下降

假设数字序列总个数n，期望楼层是t

如果n是偶数，则上升组要选n/2个，其余的都是下降组
如果n是奇数，则上升组要选n/2+1个，其余的都是下降组
假设数字序列所有元素之和是 sum，而上升组的和upSum，那么下降组的和就是sum - upSum，

如果 upSum - (sum - upSum) <= t，那么当前分组就是一个可能解，而其中sum，t都是已知的，因此可以转化为如下：

upSum  <= (sum + t) / 2

即，我们要从给定的数字序列中选择固定数量（n/2或者n/2+1）个，让他的和小于且最接近或等于 (sum + t) / 2。

本题数量级不大，可以当成组合问题求解。

组合求解时，有个难点，那就是我们求解的组合是上升序列，而最终题目要求返回的是整体序列。因此如果求组合，我们只记录上升序列的话，则后期还要过滤剩余的下降序列，然后再将二者进行交叉合并，这就非常麻烦了。

我的思路是，定义一个boolean数组，名字是path，长度和nums相同，如果对应的nums[i]是上升序列的元素，则将path[i] = true。

最后，我们只要根据path即可快速分类出nums中哪些元素是上升序列的，哪些元素是下降序列的。

另外，题目自带用例的说明中提到：

1 2 6，6 2 1均为可行解，按先处理大值的原则结果为6 2 1

貌似是一个组合对应多个排列的情况，这个解决方案是，我们可以在求组合之前，就将nums进行降序，这样先被选进组合的元素必然是大值，因此最后交叉合并的目标序列肯定只会是6 2 1，而不会是1 2 6。

还有一个问题，那就是可能存在多个组合都是最优解的情况，此时我们依旧要按照先处理大值的原则，因此下面代码中我实现了compare方法来从多个最优解中选出先处理大值的。
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
 
// 期望的楼层, 序列总个数, 序列
let m, n, nums;
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length === 2) {
    [m, n] = lines[0].split(" ").map(Number);
    nums = lines[1].split(" ").map(Number);
 
    console.log(getResult());
 
    lines.length = 0;
  }
});
let maxUpSum;
let maxUpReached = 0;
let upCount;
let paths = []

function getResult(){
  nums.sort((a,b)=>b-a)
  const sum = nums.reduce((a,b)=>a+b);
  upCount = Math.ceil(n/2);
  maxUpSum = Math.floor((sum + m) / 2);
  dfs(0,"",0,0);
  console.log(getSep(paths[0]));
}

function dfs(index,path,sum,count){
  if(count > upCount || sum > maxUpSum) return ;
  if(count === upCount){
    if (sum === maxUpReached){
      paths.push(path)
    }else if(sum > maxUpReached){
      maxUpReached = sum;
      paths = [path];
    }
    return ;
  }

  if(index < n){
    dfs(index + 1,path + '1',sum + nums[index],count + 1);
    dfs(index + 1,path + '0',sum,count);
  }
}

function getSep(path){
  let res = [];
  let up = [];
  let down = [];
  for(let i= 0;i<n;i++){
    if(path[i] === '1'){
      up.push(nums[i])
    }else{
      down.push(nums[i])
    }
  }
  for(let i = 0;i<down.length;i++){
    res.push(up[i],down[i]);
  }
  if(up.length > down.length){
    res.push(up[up.length - 1]);
  }
  
  return res;
}