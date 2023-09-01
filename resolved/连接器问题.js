
/**
题目描述
有一组区间[a0，b0]，[a1，b1]，…（a，b表示起点，终点），区间有可能重叠、相邻，重叠或相邻则可以合并为更大的区间；

给定一组连接器[x1，x2，x3，…]（x表示连接器的最大可连接长度，即x>=gap），可用于将分离的区间连接起来，但两个分离区间之间只能使用1个连接器；

请编程实现使用连接器后，最少的区间数结果。

区间数量<10000，a,b均 <=10000
连接器梳理<10000；x <= 10000

输入描述
区间组：[1,10],[15,20],[18,30],[33，40]
连接器组：[5,4,3,2]

输出描述
1

说明：

合并后：[1,10],[15,30],[33,40]，使用5, 3两个连接器连接后只剩下 [1, 40]。

用例

输入	[1,10],[15,20],[18,30],[33,40]
[5,4,3,2]
输出	1
说明	合并后：[1,10], [15,30], [33,40]，使用5, 3两个连接器连接后只剩下[1,40]。
输入	[1,2],[3,5],[7,10],[15,20],[30,100]
[5,4,3,2,1]
输出	2
说明	无重叠和相邻，使用1，2，5三个连接器连接后只剩下[1,20]，[30,100]
 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if(lines.length === 2){
    const ranges = JSON.parse(lines[0]);
    const connectors = JSON.parse(lines[1]);
    console.log(getResult(ranges, connectors));
    lines.length = 0;
  }
});


function getResult(ranges, connectors) {
  const MAX = 10000;
  connectors.sort((a, b)=>a - b);
  let arr = new Array(MAX).fill(0), i, j;
  for(const [s, e] of ranges){
    arr[s - 1] += 1;
    arr[e] -= 1;
  }
  for(i = 1;i < MAX;i++){
    arr[i] = arr[i] + arr[i - 1];
  }
  i = 0;
  j = MAX - 1;
  while(arr[i] === 0) i++;
  while(arr[j] === 0) j--;
  arr = arr.slice(i, j + 1);
  let n = arr.length, emptyLength, index;
  let count = 1;
  for(let i = 0;i < n;i++){
    if(arr[i] === 0){
      emptyLength = 1;
      while(arr[++i] === 0) emptyLength ++;
      index = findSuitConnectorIndex(connectors, emptyLength);
      if(index === -1){
        count ++;
      }else{
        connectors.splice(index, 1);
      }
    }
  }
  return count;
}

function findSuitConnectorIndex(nums, num){
  let l = 0, r = nums.length - 1, mid;
  if(num > nums[r]) return -1;
  if(num <= nums[l]) return 0;
  while(l <= r){
    mid = (l + r) >> 1;
    if(nums[mid] < num){
      l = mid + 1;
    }else if(nums[mid] > num){
      if(nums[mid - 1] < num) return mid;
      r = mid - 1;
    }else{
      return mid;
    }
  }
  return -1;
}


const inputStr = `
[[1,10],[15,20],[18,30],[33,40]]
[5,4,3,2]
------
[[1,2],[3,5],[7,10],[15,20],[30,100]]
[5,4,3,2,1]
`;

!function test(){
  inputStr.trim().split('\n').map(line=>line.trim()).filter((line)=>!/^-+$/.test(line)).forEach((line)=>{
    rl.emit("line", line);
  });
  process.exit(0);
}();

