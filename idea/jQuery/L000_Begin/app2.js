/**
 * Created by tongmeiyan on 2016/9/13.
 */
$(document).ready(function(){
	$('h3').click(function(){
		$(this).parents('div').children('div').toggle(1000);
	});
});