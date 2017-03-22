/**
 * Created by tongmeiyan on 2016/9/14.
 */

$(document).ready(function(){
	/*
	$('button').click(function(){
		$('p').toggle('slow');
		alert('弹窗跳出时动画还没有完成');
	});
	*/
	$('button').click(function(){
		$('p').toggle('slow',function(){
			alert('弹窗跳出时动画已经完成');
		});
	})
})