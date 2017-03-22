/**
 * Created by tongmeiyan on 2016/9/8.
 */
window.onload = function() {
    var parent = document.getElementById("container");
    var content = getChildElement(parent, "box");

    imgLocation(parent, content);

    //应当是向服务器请求数据的，这里内部模拟数据来源。使用json字符串：
    var imgData = {"data":[{"src":"高圆圆1.jpg"},{"src":"高圆圆3.jpg"},{"src":"高圆圆7.jpg"},{"src":"高圆圆4.jpg"},{"src":"高圆圆6.jpg"},
        {"src":"高圆圆2.jpg"},{"src":"高圆圆5.jpg"},{"src":"高圆圆8.jpg"},{"src":"高圆圆9.jpg"},{"src":"高圆圆10.jpg"}]};
    window.onscroll = function() {
        if(checkFlag(content)) {
            for(var i=0; i<imgData.data.length; i++){
                var box = document.createElement("div");
                box.className = "box";
                parent.appendChild(box);
                var box_img = document.createElement("div");
                box_img.className = "box_img";
                box.appendChild(box_img);
                var img = document.createElement("img");
                img.src = "img/" + imgData.data[i].src;
                box_img.appendChild(img);
            }

            content = getChildElement(parent, "box");//因为新增内容，content有变化，故要重新取值。
            imgLocation(parent, content);
        }
    }
};

function checkFlag(content) {
    var lastContentHeight = content[content.length-1].offsetTop; //最后一张图片偏离顶部的高度（未加载新内容时最后一张图片是确定的，则其高度/坐标也是不变的）
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动的高度（随滚动操作而变化）
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;//屏幕可视范围的高度（随屏幕高度调整而变化）
//    console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if(lastContentHeight < scrollTop + pageHeight) { //当最后一张图片偏离内容顶部的高度小于流动高度与屏幕范围的高度之和，说明内容已流动到底部，此时应当加载新内容
        return true;
    }
}

function imgLocation(parent, content) {
    var imgWidth = content[0].offsetWidth; //图片宽度
    var documentWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    var imgCols = Math.floor(documentWidth / imgWidth); //屏幕宽度/图片宽度,获得单行图片个数
    parent.style.cssText = "width:"+ imgCols*imgWidth + "px; margin:0 auto;"; //设置图层宽度，并另令其居中

    var boxHeightArr = [];
    for(var i=0; i<content.length; i++) {
        boxHeight = content[i].offsetHeight;
        if(i < imgCols) {
            boxHeightArr[i] = boxHeight;//获取单行的所有高度值
        } else {
            var minHeight = Math.min.apply(null,boxHeightArr); //获取单行最小高度值
            var minIndex = getMinHeightIndex(boxHeightArr,minHeight);
            content[i].style.position = "absolute";
            content[i].style.top = minHeight + "px";
            content[i].style.left = content[minIndex].offsetLeft + "px";
            boxHeightArr[minIndex] += boxHeight;
        }
    }
}

function getMinHeightIndex(boxHeightArr, minHeight) {
    for(var i=0; i<boxHeightArr.length; i++){
        if(boxHeightArr[i] == minHeight) {
            return i;
        }
    }
    return -1;
}

function getChildElement(parent, content) {
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for(var i=0; i<allContent.length; i++) {
        if(allContent[i].className == content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}