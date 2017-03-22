
$(document).ready(function(){
	$(window).on('load', function(){
		imgLocation();
		
		var imgData = {'data':[{'src':'高圆圆1.jpg'},{'src':'高圆圆3.jpg'},{'src':'高圆圆7.jpg'},{'src':'高圆圆4.jpg'},
							   {'src':'高圆圆6.jpg'},{'src':'高圆圆2.jpg'},{'src':'高圆圆5.jpg'},{'src':'高圆圆8.jpg'},
							   {'src':'高圆圆9.jpg'},{'src':'高圆圆10.jpg'}]};
		
		
		$(window).scroll(function(){
			if(isCloseToEnd()){
				$.each(imgData.data, function(index, value){
					var box = $('<div></div>').addClass('box').appendTo($('#container'));
					var box_img = $('<div></div>').addClass('box_img').appendTo(box);
					var img = $('<img>').appendTo(box_img).attr('src','img/'+$(this).attr('src'));
				});
				imgLocation();
			}
		});
	});
});

function isCloseToEnd(){
	var lastTopHeight = $('.box').last().get(0).offsetTop;
	var scrollHeight = $(window).scrollTop();
	var pageHeight = $(window).height();
	return (lastTopHeight < scrollHeight+pageHeight) ? true : false;
}

function imgLocation(){
	var box = $('.box');
	var imgWidth = box.first().innerWidth();
	var docWidth = $(window).width();
	var imgCols = Math.floor(docWidth/imgWidth);
	box.parent().css({
		'width' : imgCols * imgWidth,
		'margin' : '0 auto'
	});
	
	var imgHeightArray = [];
	var imgHeight;
	var minHeight;
	var minIndex;
	
	box.each(function(index){
		imgHeight = $(this).innerHeight();
		if(index < imgCols){
			imgHeightArray[index] = imgHeight;
		}else{
			minHeight = Math.min.apply(null, imgHeightArray);
			minIndex = $.inArray(minHeight,imgHeightArray);
			$(this).css({
				'position' : 'absolute',
				'top' : minHeight + 'px',
				'left' : box.eq(minIndex).position().left + 'px'
			})
			imgHeightArray[minIndex] += imgHeight;
		}
	})
}