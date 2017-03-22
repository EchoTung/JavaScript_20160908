
$(document).ready(function(){
    $(".vmain>a").click(function(){
        var ulNode = $(this).next("ul");
        ulNode.slideToggle();
        changeIcon($(this));
    });

    $(".hmain").hover(function(){
        $(this).children("ul").slideDown();
        changeIcon($(this).children("a"));
    }, function(){
        $(this).children("ul").slideUp();
        changeIcon($(this).children("a"));
    });
});

function changeIcon(obj){
    if(obj){
        if(obj.css("background-image").indexOf("images/collapse.png") >= 0){
            obj.css("background-image","url('images/unfold.png')");
        } else {
            obj.css("background-image","url('images/collapse.png')");
        }
    }
}

