/**
 * Created by tongmeiyan on 2016/9/13.
 */



$(document).ready(function() {
	$("#start").click(function(){
	//	$("div").animate({left:'250px', height:'200px', width:'200px', opacity:'.5' });
	//	$("div").animate({height:'toggle'});
	//	$("div").animate({left:"500px", width:"300px", height:"300px",fontSize:'3em'});
	
		var d = $("div");/*
		d.animate({height:"200px", width:"200px"}, 1000);
		d.animate({height:"300px", width:"300px"}, 1000);
		d.animate({height:"200px", width:"200px"}, 1000);
		d.animate({height:"100px", width:"100px"}, 1000);
		*/
		d.animate({left:"200px"},2000);
		d.animate({left:"0"},2000);
	});

    $("#stop").click(function() {
		$('div').stop();
    });

    $("#stopAll").click(function() {
		$('div').stop(true);
    });

    $("#stopToEnd").click(function() {
        $('div').stop(true,true);
    });
});