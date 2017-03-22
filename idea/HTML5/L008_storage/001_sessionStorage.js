/**
 * Created by tongmeiyan on 2016/9/24.
 */

var num = 0;
var txt;
var btn;

window.onload = function() {
    txt = document.getElementById("txt");
    btn = document.getElementById("btn");

    if(sessionStorage.num){
        num = sessionStorage.num;
    } else {
        num = 0;
    }

    btn.onclick = function(){
        num++;
        sessionStorage.num = num;
        txt.innerHTML = num;
    };
};