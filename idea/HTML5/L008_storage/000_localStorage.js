/**
 * Created by tongmeiyan on 2016/9/24.
 */

var ta;
var btn;
window.onload = function() {
    ta = document.getElementById("ta");
    if(localStorage.val){
        ta.value = localStorage.val;
    }
    btn = document.getElementById("btn");
    btn.onclick = function() {
        localStorage.val = ta.value;
    };
};