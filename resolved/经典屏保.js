/**
题目描述
DVD机在视频输出时，为了保护电视显像管，在待机状态会显示“屏保动画”，如下图所示，DVD Logo在屏幕内来回运动，碰到边缘会反弹。



请根据如下要求，实现屏保Logo坐标的计算算法。

屏幕是一个800*600像素的矩形，规定屏幕的左上角点坐标原点，沿横边向右方向为X轴，沿竖边向下方向为Y轴
Logo是一个50*25像素的矩形，初始状态下，左上角点坐标记做(x，y)，它在X和Y方向上均以1像素/秒的速度开始运动
遇到屏幕四个边缘后，会发生镜面反弹，即以45°碰撞边缘，再改变方向以45°弹出
当Logo和四个角碰撞时，两个边缘同时反弹的效果是Logo会原路返回


 请编码实现，t秒后Logo左上角点的坐标。

输入描述
输入3个数字，以空格分隔：

x y t

第一个数字表示Logo左上角点的初始X坐标；
第二个数字表示Logo左上角点的初始Y坐标；
第三个数字表示时间 t，题目要求即求 t 秒后Logo左上角点的位置。

输出描述
输出2个数字，以空格分隔:

x y

第一个数字表示 t 秒后，Logo左上角点的X坐标
第二个数字表示 t 秒后，Logo左上角点的Y坐标

备注
所有用例均保证:

输入的x和y坐标会保证整个Logo都在屏幕范围内，Logo不会出画；
所有输入数据都是合法的数值，且不会出现负数；
t 的最大值为100000。
用例
输入	0 0 10
输出	10 10
说明	输入样例表示Logo初始位置在屏幕的左上角点，10s后，Logo在X和Y方向都移动了10像素，因此输出10 10。
输入	500 570 10
输出	510 570
说明	输入样例表示初始状态下，Logo的下边缘再有5像素就碰到屏幕下边缘了，5s后，会与屏幕碰撞，碰撞后，斜向45弹出，又经过5s后，Logo与起始位置相比，水平移动了10像素，垂直方向回到了原来的高度。

 */
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const lines = [];
rl.on("line", (line) => {
    const [x,y,t] = line.split(' ').map(Number);
    console.log(getResult(x,y,t));
});
const screen = {width:800,height:600};
const logo = {width:50,height:25};
function getResult(x,y,t) {
    let speedX = 1,speedY = 1;
    let xReach,yReach,reach;
    while(t > 0){
        xReach = speedX === 1 ? screen.width - (x + logo.width) : x;
        yReach = speedY === 1 ? screen.height - (y + logo.height) : y;
        reach = Math.min(xReach,yReach);
        if(t <= reach){
            x += speedX * t;
            y += speedY * t;
            t = 0;
        }else{
            x += speedX * reach;
            y += speedY * reach;
            if(xReach > yReach){
                speedY = -speedY;
            }else if(xReach < yReach){
                speedX = -speedX;
            }else{
                speedX = -speedX;
                speedY = -speedY;
            }
            t -= reach;
        }
    }
    return x + ' ' + y;
}

