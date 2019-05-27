/*==================== Start navbar animation ====================*/
/*= on init =*/
var scrolling = $(document).scrollTop();
if (scrolling >= 80) {
    $(".navbar").removeClass("navbar-dark");
    $(".navbar").addClass("navbar-light");
    $(".navbar-brand img").attr("src", "images/logo-c.png");
}else{
    $(".navbar-brand img").attr("src", "images/logo.png");
}

/*= whene start scrolling =*/
$(document).on('scroll' , function(){
    var scrolling = $(document).scrollTop();
    if(scrolling >= 80){
        $(".navbar").removeClass("navbar-dark");
        $(".navbar").addClass("navbar-light");
        $(".navbar-brand img").attr("src", "images/logo-c.png");

    }else{
        $(".navbar").removeClass("navbar-light");
        $(".navbar").addClass("navbar-dark");
        $(".navbar-brand img").attr("src", "images/logo.png");
    }
});
/*= whene start scrolling =*/
$(document).on('scroll' , function(){
    var scrolling = $(document).scrollTop();
    var prevScrolling = $(document).scrollTop();
    if(prevScrolling >= 700){
        $(document).on('scroll' , function(){
            var currentScrolling = $(document).scrollTop();
            if(currentScrolling < prevScrolling){
                $(".navbar").css("top", "0");
            }else{
                $(".navbar").css("top", "-100px");
            }
            prevScrolling = currentScrolling;
        });
    }else{
        $(document).on('scroll' , function(){
            var currentScrolling = $(document).scrollTop();
            if(currentScrolling < prevScrolling){
                $(".navbar").css("top", "0");
            }else{
                $(".navbar").css("top", "0");
            }
            prevScrolling = currentScrolling;
        });
    }
});
/*= Collapse dropdown on hover =*/
$(".nav-item.dropdown").hover(function(){
    $(this).find('.dropdown-menu').collapse('show');
}, function(){
    $(this).find('.dropdown-menu').collapse('hide');
});
/*==================== End navbar animation ====================*/