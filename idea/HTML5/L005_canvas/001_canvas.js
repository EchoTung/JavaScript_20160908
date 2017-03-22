/**
 * Created by tongmeiyan on 2016/9/24.
 */

function draw(id) {
    var canvas = document.getElementById(id);
    if(canvas == null) {
        return false;
    }
    var context = canvas.getContext("2d");
    context.fillStyle = "#eeeef";
    context.fillRect(0,0,600,700);
    for(var i=0; i<=10; i++){
        context.beginPath();
        context.arc(i*25, i*25, i*10, 0, Math.PI*2, true);//圆心(x,y)，半径，起始弧度，终止弧度，方向(true：逆时针；false：顺时针)
        context.closePath();
        context.fillStyle = "rgba(255, 0, 0, 0.25)";
        context.fill();
    }
}