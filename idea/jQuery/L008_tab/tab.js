
var timer;
$(document).ready(function(){
	$("#tab1 li").each(function(index){
        var liNode = $(this);
        liNode.mouseover(function(){
            timer = setTimeout(function(){
                $("#tab1 .tabin").removeClass("tabin");
                liNode.addClass("tabin");
                $(".selected").removeClass("selected");
                $('.content1').eq(index).addClass("selected");
            },300);
        }).mouseout(function(){
            clearTimeout(timer);
        })
    });

    $("#tab2 li").each(function(index){
        $(this).click(function() {
            $("#tab2 .tabin").removeClass("tabin");
            $(this).addClass("tabin");
            $(".content2").text(index+1);
        });
    });
});
