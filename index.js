/**
题目描述
张兵和王武是五子棋迷，工作之余经常切磋棋艺。这不，这会儿又下起来了。走了一会儿，轮张兵了，对着一条线思考起来了，这条线上的棋子分布如下:
用数组表示: -1 0 1 1 1 0 1 0 1 -1
棋了分布说明:

-1代表白子，0代表空位，1 代表黑子
数组长度L，满足 1 < L < 40，L为奇数
你得帮他写一个程序，算出最有利的出子位置。 最有利定义：

找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大
如果存在多个位置，返回最靠近中间的较小的那个坐标
如果不存在可行位置，直接返回-1
连续长度不能超过5个(五字棋约束)
输入描述
第一行: 当前出子颜色

第二行: 当前的棋局状态

输出描述
1个整数，表示出子位置的数组下标

用例
输入	1
-1 0 1 1 1 0 1 -1 1
输出	5
说明	当前为黑子 (1)，放置在下标为5的位置，黑子的最大连续长度，可以由3到5
输入	-1
-1 0 1 1 1 0 1 0 1 -1 1
输出	1
说明	当前为白子，唯一可以放置的位置下标为1，白子的最大长度，由1变为2
输入	1
0 0 0 0 1 0 0 0 0 1 0
输出	5
说明	可行的位置很多，5最接近中间的位置坐标
题目解析
本题可以使用双指针解题。

定义两个指针L，R，我们假设L,R范围就是要求的连棋范围，那么L,R范围内必须要包含一个0，用于落子，且只能有一个0，范围内其余棋子必须是下棋者对应的颜色（第一行输入的颜色）。

另外，根据题目描述：

连续长度不能超过5个(五字棋约束)

即L,R范围内需要满足三个条件：

L,R范围内必须要包含一个0，用于落子，且只能有一个0
范围内其余棋子必须是下棋者对应的颜色
L,R范围长度不能超过5
上面三个条件约束着双指针的运动，下面给出三个用例的L,R指针运动示意图：

用例1

[![image.png](https://img-blog.csdnimg.cn/042846f3e50f405fabcb1d341d7d0217.png)]

> 通过上面例子，我们可以知道，在什么时机进行连棋的统计，需要统计连棋的落子位置和长度



用例2

[![image.png](https://img-blog.csdnimg.cn/7073057d42e2407dbc0b1173fce6877c.png)]

> 上面例子中，如果连棋中断，即遇到不同颜色的棋子，则L,R需要同时移动到该不同颜色棋子的右侧



用例3

[![image.png](https://img-blog.csdnimg.cn/5b6eb4f122e345b497cd9a6568aa83b2.png)]

 上面例子中，如果落子超标，则我们需要将L指针移动到上一次落子位置的右侧，以此来满足L,R范围内落子数量只有一个

2023.06.04

上面逻辑没有考虑到一个点：

找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大

即落子后，一定要让当前子的最大连续长度变大，如果落子后，该子的最大连续长度没有变大，那么就代表不是最有利位置

因此，下面代码追加了一个getInitMaxConstantLen方法，用于获取初始状态时的最大连续长度，后续落子时，需要看新的连续长度是否超过初始最大的，只有超过了，对应落子位置才是一个可能解。

 */
const readline = require('readline'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lines = [];
rl.on('line', function (line) {
    lines.push(line);
    if(lines.length === 2){
      const cur = Number(lines[0]);
      const nums = lines[1].split(' ').map(Number);
      console.log(getResult(nums,cur));
      lines.length = 0;
    }
});


function getResult(nums,cur){
  let initMax = getMaxSequence(nums,cur) + 1;
  let l = -1,r = -1,zeroIndex = -1,indexes = [];
  for(let i = 0;i<nums.length;i++){
    if(r === -1){
      if(nums[i] === 0){
        l = r = i;
        zeroIndex = i;
      }else if(nums[i] === cur){
        l = r = i;
      }
    }else if(nums[i] === cur){
      r++;
    }else if(nums[i] === 0){
      r ++;
      if(zeroIndex !== -1){
        l = zeroIndex + 1;
      }
      zeroIndex = i
    }else{
      l = -1;
      r = -1;
      zeroIndex = -1;
    }


    if(r !== -1 && r - l + 1 >= initMax && zeroIndex !== -1){
      if(r - l + 1 === initMax){
        indexes.push(zeroIndex);
      }else{
        initMax = r-l+1;
        indexes = [zeroIndex];
      }
    }
  }

  if(!indexes.length) return -1;
  return indexes.sort((a,b)=>compare(a,b,nums.length / 2))[0];
}

function compare(a,b,pos){
  let diff1 = Math.abs(a-pos);
  let diff2 = Math.abs(b-pos);
  if(diff1 !== diff2){
    return diff1 - diff2;
  }else{
    return a-b;
  }
}

function getMaxSequence(nums,cur){
  let max = 0;
  let len = 0;
  for(const num of nums){
    if(num === cur){
      len ++;
    }else{
      max = Math.max(max,len);
      len = 0;
    }
  }
  max = Math.max(max,len);
  return max;
}