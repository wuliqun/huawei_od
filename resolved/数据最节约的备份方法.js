
/**
题目描述
有若干个文件，使用刻录光盘的方式进行备份，假设每张光盘的容量是500MB，求使用光盘最少的文件分布方式

所有文件的大小都是整数的MB，且不超过500MB；文件不能分割、分卷打包

输入描述
一组文件大小的数据

输出描述
使用光盘的数量

备注
不用考虑输入数据不合法的情况；假设最多100个输入文件。

用例
输入	100,500,300,200,400
输出	3
说明	
(100,400),(200,300),(500) 3张光盘即可。

输入和输出内容都不含空格。

输入	1,100,200,300
输出	2
说明	无
 */

// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//   if(line === ''){
//     console.log(getResult(lines.map(l=>l.split(' '))));
//     lines.length = 0;
//   }else{
//     lines.push(line);
//   }
// });

function getResult(nums){
  nums.sort((a,b)=>b-a);
  let min = 1,max = nums.length,mid = (min + max) >> 1,res = max;
  while(min <= max){
    if(check(nums,mid)){
      res = mid;
      max = mid - 1;
    }else{
      min = mid + 1;
    }
    mid = (min + max) >> 1
  }
  return res;
}

function check(nums,m){
  const buckets = new Array(m).fill(0);
  return partition(buckets,nums,0);
}

function partition(buckets,nums,index){
  if(index === nums.length) return true;
  const cur = nums[index];
  for(let i = 0;i<buckets.length;i++){
    if(i > 0 && buckets[i] === buckets[i-1]) continue;
    if(buckets[i] + cur <= 500){
      buckets[i] += cur;
      if(partition(buckets,nums,index + 1)) return true;
      buckets -= cur;
    }
  }

  return false;
}


console.log(getResult([100,500,300,200,400]))
console.log(getResult([1,100,200,300]))
