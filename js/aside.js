$(function() {
    var flag = true;

    $(window).scroll(function() {
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".aside li").eq(i).addClass("now").siblings("li").removeClass();
                } else {
                    $(".aside li").eq(i).removeClass();
                }
            })
        }
        if ($(document).scrollTop() < 300) {
            $(".aside li").removeClass();
        }
    })




    $(".aside li").click(function() {
        flag = false;

        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, 500, function() {
            flag = true;
        });
        $(this).addClass("now").siblings().removeClass();
    })


})