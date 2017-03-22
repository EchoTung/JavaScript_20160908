/**
 * Created by tongmeiyan on 2016/9/18.
 */

/*//original
$(document).ready(function(){
    $("button").click(function(){
        $("p").text("goodbye");
    });
});*/

/*//声明jQuery的noConflict，并将$替换回jQuery
$.noConflict();
jQuery(document).ready(function(){
    jQuery("button").click(function(){
        jQuery("p").text("goodbye");
    })
});*/

/*//自定义变量替代jQuery
var jq = $.noConflict();
jq(document).ready(function(){
    jq("button").click(function(){
        jq("p").text("goodbye");
    })
});*/

//外部使用 jQuery ，内部使用 $
$.noConflict();
jQuery(document).ready(function($){
    $("button").click(function(){
        $("p").text("goodbye");
    })
});
