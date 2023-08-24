/**
题目描述 
给定一个数组X和正整数K，请找出使表达式：

X[i] - X[i + 1] -  ... - X[i + K - 1]

结果最接近于数组中位数的下标 i ，如果有多个 i 满足条件，请返回最大的 i.

其中，数组中位数：长度为N的数组，按照元素的值大小升序排列后，下标为 N/2 元素的值

输入描述
无

输出描述
无

备注
数组X的元素均为正整数
X的长度n取值范围：2 ≤ n ≤ 1000
K大于0目小于数组的大小
i 的取值范围: 0 ≤ i < 1000
题目的排序数组X[N]的中位数是X[N/2]
用例
输入	[50,50,2,3],2
输出	1
说明	
中位数为50：[50,50,2,3]升序排序后变成[2,3,50,50]，中位数为下标4/2=2的元素50
计算结果为1：X [50,50,2,3] 根据题目计算X[i] - ... - X[i + k - 1] 得出三个数0 (X[0] - X[1] = 50 - 50) 、48 (X[1] - X[2] = 50 - 2) 和 -1 (X[2]-X[3] = 2 - 3) ，其中48最接近50，因此返回下标1。

 */
// const readline = require("readline");
 
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
 
// const lines = [];
// rl.on("line", (line) => {
//     const [x,y,t] = line.split(' ').map(Number);
//     console.log(getResult(x,y,t));
// });

function getResult(nums,k) {
    const mid = nums.slice().sort((a,b)=>a-b)[nums.length >> 1];
    let tmp = nums.slice(1,k).reduce((pre,cur)=>pre-cur,nums[0]);
    let diff = tmp - mid,res = 0,i;
    for(i = 1;i<nums.length - k;i++){
        tmp -= nums[i - 1];
        tmp += nums[i] * 2;
        tmp -= nums[i+k-1];
        console.log(tmp,diff)
        if(Math.abs(diff) >= Math.abs(tmp-mid)){
            diff = tmp - mid;
            res = i;
        }
    }

    return res;
}

console.log(getResult([50,50,2,3],2))

