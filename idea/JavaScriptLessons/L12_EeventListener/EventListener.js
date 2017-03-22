/**
 * Created by tongmeiyan on 2016/9/9.
 */

//document.getElementById("bid").addEventListener("click", function(){alert("hellooo");});

var bid = document.getElementById("bid");
bid.addEventListener("click",hello);
bid.addEventListener("click",goodbye);
bid.removeEventListener("click",goodbye);

function hello(){
    alert("hello");
}
function goodbye(){
    alert("goodbye");
}