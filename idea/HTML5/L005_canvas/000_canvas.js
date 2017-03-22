/**
 * Created by tongmeiyan on 2016/9/23.
 */
var CANVAS_WIDTH = 500, CANVAS_HEIGHT = 500;
var mycanvas, context;

window.onload = function() {
    createCanvas();
    drawRect();
//    drawImage();
};

function createCanvas() {
    document.body.innerHTML = "<canvas id=\"myCanvas\" style=\"background-color:aqua;\" width=\""+CANVAS_WIDTH+"\" height=\""+CANVAS_HEIGHT+"\"></canvas>";
    mycanvas = document.getElementById("myCanvas");
    context = mycanvas.getContext("2d");
}

function drawRect() {
/*    context.fillStyle = "#ff0000"; //(color/gradient/pattern)
     //    context.rotate(45); //旋转弧度（对应角度*PI/180） +:顺时针; -:逆时针
     //    context.translate(200,100); //(x,y)平移距离
     context.scale(2, 0.5); //(x,y)缩放
     context.fillRect(0,0,200,200); //(x,y,width,height)画矩形
*/
    var gradient = context.createLinearGradient(0,0,200,100);
    gradient.addColorStop(0,"blue");
    gradient.addColorStop(0.5,"green");
    gradient.addColorStop(1,"yellow");
    context.fillStyle = gradient;
    context.fillRect(0,0,200,100);
/*    context.scale(2,0.5);
    context.fillRect(0,0,200,100);*/
    context.translate(200,200);
    context.fillRect(0,0,200,100);
    context.rotate(180*Math.PI/180);
    context.fillRect(0,0,200,100);
}

function drawImage() {
    var img = new Image();
    img.onload = function() {
        context.drawImage(img,100,50);
    };
    img.src = "高圆圆1.jpg";
}