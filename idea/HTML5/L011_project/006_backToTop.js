/**
 * Created by tongmeiyan on 2016/10/3.
 */

window.onload = function(){
    var topbtn = document.getElementById("btn");
    var timer = null;
    var pagelookheight = document.documentElement.clientHeight;

    window.onscroll = function(){
        var backtop = document.body.scrollTop;
        if(backtop >= pagelookheight){
            topbtn.style.display = "block";
        }else{
            topbtn.style.display = "none";
        }
    };

    topbtn.onclick = function(){
        timer = setInterval(function(){
            var backtop = document.body.scrollTop;
            var speedtop = backtop / 5;
            document.body.scrollTop = backtop - speedtop;
            if(backtop == 0){
                clearInterval(timer);
            }
        }, 30);
    }
};