
window.onload = function(){
	var container = document.getElementById('container');
	var content = document.getElementsByClassName('box');
	imgLocation(container, content);
	
	//应当是向服务器请求数据的，这里内部模拟数据来源。使用json字符串：
	var imgData = {'data':[{'src':'高圆圆1.jpg'},{'src':'高圆圆3.jpg'},{'src':'高圆圆7.jpg'},{'src':'高圆圆4.jpg'},
						   {'src':'高圆圆6.jpg'},{'src':'高圆圆2.jpg'},{'src':'高圆圆5.jpg'},{'src':'高圆圆8.jpg'},
						   {'src':'高圆圆9.jpg'},{'src':'高圆圆10.jpg'}]};
	
	window.onscroll = function(){
		if(isCloseToEnd(content)){
			for(var i=0; i<imgData.data.length; i++){
				var box = document.createElement('div');
				box.className = 'box';
				container.appendChild(box);
				var box_img = document.createElement('div');
				box_img.className = 'box_img';
				box.appendChild(box_img);
				var img = document.createElement('img');
				img.src = 'img/' + imgData.data[i].src;
				box_img.appendChild(img);
			}
			imgLocation(container, content);
		}		
	}
};

function isCloseToEnd(content){
	var lastTopHeight = content[content.length-1].offsetTop; //最后一张图片偏离顶部的高度
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	return (lastTopHeight < scrollTop+pageHeight) ? true : false;
}

function imgLocation(container, content){
	var imgWidth = content[0].offsetWidth;
	var docWidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	var imgCols = Math.floor(docWidth/imgWidth);
	container.style.cssText = 'width:' + imgCols*imgWidth + 'px; margin:0 auto'; //设置图层宽度，并另令其居中
	
	var imgHeightArray = [];
	var imgHeight;
	var minHeight;
	var minIndex;
	
	for(var i= 0; i<content.length; i++){
		imgHeight = content[i].offsetHeight;
		if(i < imgCols){
			imgHeightArray[i] = imgHeight;
		}else{
			minHeight = Math.min.apply(null, imgHeightArray); //获取单行最小高度值
			minIndex = getMinHeightIndex(imgHeightArray, minHeight);
			if(minIndex >= 0){
				content[i].style.cssText = 'position:absolute; top:' + minHeight + 'px; Left:' +
											content[minIndex].offsetLeft + 'px'; //将图片放置高度最小的列中
				imgHeightArray[minIndex] += imgHeight; //把整个页面看成 imgCols 列,哪一列最短则填补之,并修改该列高度
			}
		}
	}
}

function getMinHeightIndex(imgHeightArray, minHeight){
	for(var n in imgHeightArray){
		if(minHeight == imgHeightArray[n]){
			return n;
		}
	}
	return -1;
}

function getChildElement(selector, namestring){
	var subContentArray = [];
	var allContentArray = selector.getElementsByTagName('*');
	for(var i=0; i<allContentArray.length; i++){
		if( namestring == allContentArray[i].className){
			subContentArray.push(allContentArray[i]);
		}
	}
	return subContentArray;
}