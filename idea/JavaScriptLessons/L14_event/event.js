/**
 * Created by tongmeiyan on 2016/9/9.
 */
//onmouseover

function onOver(obj){
    obj.innerHTML = "hello";
}
//onmouseout
function onOut(obj){
    obj.innerHTML = "";
}
//onchange
function chgResponse(){
    alert('Things\'ve changed.');
}
//onselect
function selResponse(obj){
    obj.style.color = "white";
}
//onfocus
function focResponse(obj){
    obj.style.background = "red";
}
//onblur
function blurResponse(obj){
    obj.style.background = "white";
    obj.style.color = "black";
}
