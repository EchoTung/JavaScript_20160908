/**
 * Created by tongmeiyan on 2016/9/13.
 */
 
 $(document).ready(function(){
	 /*
	$('#demo1').click(function(){
		$('#div1').fadeIn();
		$('#div2').fadeIn('slow');
		$('#div3').fadeIn(2000);
		
		$('p').text('演示带有不同参数的 fadeOut() 方法');
		$('#demo2').show();
		$(this).hide();
	}); 
	$('#demo2').click(function(){
		$('#div1').fadeOut();
		$('#div2').fadeOut('fast');
		$('#div3').fadeOut(1000);
		
		$('p').text('演示带有不同参数的 fadeIn() 方法');
		$('#demo1').show('slow');
		$(this).hide();
	});
	*/
	
	$('p').text('演示带有不同参数的 fadeToggle() 方法');
	
	$('#demo1').click(function(){
		$('#div1').fadeToggle();
		$('#div2').fadeToggle('slow');
		$('#div3').fadeToggle(1000);
		$('#demo2').fadeToggle();
	});
	
	$('#demo2').click(function(){
		$('#div1').fadeTo('fast',.15);
		$('#div2').fadeTo('slow', .5);
		$('#div3').fadeTo('fast', .7);
	});
 });
 
 
/*
$(document).ready(function() {
    $("p").text("演示带有不同参数的 fadeToggle() 方法");
    $("#demo1").click(function() {
        $("#div1").fadeToggle();
        $("#div2").fadeToggle("slow");
        $("#div3").fadeToggle(1000);

        $("#demo2").fadeToggle();
    });

    $("#demo2").click(function() {
        $("#div1").fadeTo("slow", 0.15);
        $("#div2").fadeTo("slow", 0.4);
        $("#div3").fadeTo("slow",0.7);
    });
});
*/