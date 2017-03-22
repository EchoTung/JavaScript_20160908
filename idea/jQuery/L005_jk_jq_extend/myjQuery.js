/**
 * Created by tongmeiyan on 2016/9/18.
 */
/*
//不常使用
$.myjq = function(){
    alert("hello");
};
*/
//常用
$.fn.myjq = function(){
    $(this).text("hello");
};

