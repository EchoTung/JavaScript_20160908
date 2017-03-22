



window.onload = function(){
 	var container = document.getElementById("container");
 	var content = getChildElement(container, "box");
 	imgLocation(container, content);
 	
 	//应当是向服务器请求数据的，这里内部模拟数据来源。使用json字符串：
    var imgData = {"data":[{"src":"高圆圆1.jpg"},{"src":"高圆圆3.jpg"},{"src":"高圆圆7.jpg"},{"src":"高圆圆4.jpg"},
						   {"src":"高圆圆6.jpg"},{"src":"高圆圆2.jpg"},{"src":"高圆圆5.jpg"},{"src":"高圆圆8.jpg"},
						   {"src":"高圆圆9.jpg"},{"src":"高圆圆10.jpg"}]};
        	
	window.onscroll = function(){
		if( isCloseToEnd(content) ){
			for(var i=0; i<imgData.data.length; i++){
				var box = document.createElement("div");
                box.className = "box";
                container.appendChild(box);
                var box_img = document.createElement("div");
                box_img.className = "box_img";
                box.appendChild(box_img);              
				var img = document.createElement("img");
				img.src = "img/" + imgData.data[i].src;
				box_img.appendChild(img);
			}
			
			content = getChildElement(container, "box"); //新增内容 content重新取值
			imgLocation(container, content);
		}
	}
}

function isCloseToEnd(content){
	var lastTopHeight = content[content.length-1].offsetTop; //最后一张图片偏离顶部的高度（未加载新内容时最后一张图片是确定的，则其高度/坐标也是不变的）
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动的高度（随滚动操作而变化）
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;//屏幕可视范围的高度（随屏幕高度调整而变化）
    return (lastTopHeight < scrollTop + pageHeight) ? true : false; //当最后一张图片偏离内容顶部的高度小于滚动高度与屏幕范围的高度之和，说明内容已滚动到底部，此时应当加载新内容
}

function imgLocation(container, content){
	var imgWidth = content[0].offsetWidth;
	var docWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	var imgCols = Math.floor(docWidth/imgWidth);
	container.style.cssText = "width:" + imgCols*imgWidth +"px; margin:0 auto"; //设置图层宽度，并另令其居中
	

	var imgHeightArray = [];	
	for(var i=0; i<content.length; i++){
		imgHeight = content[i].offsetHeight;
		if(i < imgCols){
			imgHeightArray[i] = imgHeight;
		}else{
			var minHeight = Math.min.apply(null,imgHeightArray); //获取单行最小高度值
			var minIndex = getMinHeightIndex(imgHeightArray, minHeight);
			content[i].style.position = "absolute";
			content[i].style.top = minHeight + "px";
			content[i].style.left = content[minIndex].offsetLeft + "px";
			imgHeightArray[minIndex] += imgHeight; //相当于把整个页面看成 imgCols 列,哪一列最短则填补之,并修改该列高度
		}
	}
}

function getChildElement(selector, namestring){
	var subContentArray = [];
	var allContentArray = selector.getElementsByTagName("*");
	for(var i=0; i<allContentArray.length; i++){
		if( namestring == allContentArray[i].className){
			subContentArray.push(allContentArray[i]);
		}
	}
	return subContentArray;
}

function getMinHeightIndex(imgHeightArray, minHeight){
	for(var i in imgHeightArray){
		if(minHeight == imgHeightArray[i]){
			return i;
		}
	}
	return -1;
}

/**
 * Created by tongmeiyan on 2016/9/20.
 */
$(document).ready(function() {
    $(window).on("load",function () {
        imgLocation();

        var imgData = {"data":[{"src":"高圆圆1.jpg"},{"src":"高圆圆3.jpg"},{"src":"高圆圆7.jpg"},{"src":"高圆圆4.jpg"},{"src":"高圆圆6.jpg"},
            {"src":"高圆圆2.jpg"},{"src":"高圆圆5.jpg"},{"src":"高圆圆8.jpg"},{"src":"高圆圆9.jpg"},{"src":"高圆圆10.jpg"}]};
        window.onscroll = function() {
            if(scrollside()) {
                $.each(imgData.data, function(index,value) {
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var box_img = $("<div>").addClass("box_img").appendTo(box);
                //    console.log(value);//value是imgData.data里的对象，每一个imgData.data有6个图片对象
                //    console.log("img/"+$(value).attr("src"));
                    $("<img>").attr("src","img/"+ $(value).attr("src")).appendTo(box_img);
                });
                imgLocation();
            }
        };
    });
});

function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
    var documentHeight = $(document).height();//width();
    var scrollHeight = $(window).scrollTop();
//    console.log(lastboxHeight+":"+documentHeight+":"+scrollHeight);
    return (lastboxHeight < documentHeight + scrollHeight) ? true : false;
}

function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).innerWidth();
    var num = Math.floor($(window).width() / boxWidth);
    box.parent().css({  //设置图层宽度，并另令其居中
        "width": boxWidth*num,
        "margin":"0 auto"
    });

    var boxArr = [];
    box.each(function(index,value){
        var boxHeight = box.eq(index).innerHeight();//此为jQuery方法，对应JavaScript--引用html属性：box.eq(index).get(0).offsetHeight
        if(index < num) {
            boxArr[index] = boxHeight;
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
            $(value).css({
                "position":"absolute",
                "top":minboxHeight+"px",
                "left": box.eq(minboxIndex).position().left +"px"
            });
            boxArr[minboxIndex] += boxHeight;
        }
    });
}