/**
题目描述 
给定一个整数数组 nums、一个数字k，一个整数目标值 target，请问nums中是否存在k个元素使得其相加结果为target，请输出所有符合条件且不重复的k元组的个数

数据范围

2 ≤ nums.length ≤ 200
-10^9 ≤ nums[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9
2 ≤ k ≤ 100
输入描述
第一行是nums取值：2 7 11 15

第二行是k的取值：2

第三行是target取值：9

输出描述
输出第一行是符合要求的元组个数：1

补充说明：[2,7]满足，输出个数是1

用例
输入	-1 0 1 2 -1 -4
3
0
输出	2
说明	[-1,0,1]，[-1,-1,2]满足条件
输入	2 7 11 15
2
9
输出	1
说明	[2,7]符合条件

 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
 
  if (lines.length == 3) {
    const nums = lines[0].split(" ").map(Number);
    const k = parseInt(lines[1]);
    const target = parseInt(lines[2]);
 
    console.log(getResult(nums, k, target));
 
    lines.length = 0;
  }
});
 
function getResult(nums, k, target) {
  if (k > nums.length) return 0;
  nums.sort((a, b) => a - b);
  return kSum(nums,k,target,0);
}

function kSum(nums,k,target,startIndex){
    let count = 0,len = nums.length;
    if(k === 2){
        count += twoSum(nums,target,startIndex);
    }else{
        for(let i = startIndex;i < len - k + 1;i++){
            if(i > startIndex && nums[i] === nums[i-1]) continue;
            if(nums[i] * k > target || nums[i] + nums[i+1] + nums[i+2] > target || nums[len-1] * k < target || nums[len-1] + nums[len-2] + nums[len-3] < target) break;
            count += kSum(nums,k-1,target - nums[i],i);
        }
    }

    return count;
}

function twoSum(nums,target,startIndex){
    let l = startIndex,r = nums.length-1,count = 0;
    if(nums[l] + nums[l+1] <= target && nums[r] + nums[r-1] >= target){
        while(l < r){
            if(nums[l] + nums[r] === target){
                count ++;
                while(nums[l] === nums[l+1]) l++;
                while(nums[r] === nums[r-1]) r--;
                l++;
                r--;
            }else if(nums[l] + nums[r] > target){
                r--;
            }else{
                l++;
            }
        }
    }    
    return count;
}
