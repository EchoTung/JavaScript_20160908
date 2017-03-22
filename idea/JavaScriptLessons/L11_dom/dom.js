/**
 * Created by tongmeiyan on 2016/9/9.
 */

function test(){
	document.getElementById("text").innerHTML = "goodbye";
	document.getElementsByTagName("p")[1].innerHTML = "sir";
	document.getElementById("link").href = "https://www.douban.com";
	document.getElementById("link").innerHTML = "豆瓣";
	document.getElementsByTagName("img")[0].src = "eg_bulbon.gif";
	document.getElementsByTagName("div")[0].style.background = "blue";
	document.getElementsByTagName("div")[0].style.color = "orange";
}

