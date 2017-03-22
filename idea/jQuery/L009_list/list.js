
$(document).ready(function(){
    var listObj1 = $(".list-1");
    var listObj2 = $(".list-2");

    listObj1.click(function(){
        listObj1.css("backgroundPosition","0 -26px");
        listObj2.css("backgroundPosition","-30px -26px");
        $(".content li").each(function(index){
            $(this).removeClass("list-2-v").addClass("list-1-h");
        })
    });

    listObj2.bind("click", function(){
        listObj1.css("backgroundPosition","0 0");
        listObj2.css("backgroundPosition","-30px 0");
        $(".content li").removeClass("list-1-h").addClass("list-2-v");
    })
});