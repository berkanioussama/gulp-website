$(document).ready(function(){
    //=require layouts/*.js

    // type your global script here //

    // fire filterizr
    var filterizd = $('.filtr-container').filterizr({
       //options object
    });

    // Owl initializer function
    $(".owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
    });

    //Initialize Smooth Scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500, // Integer. Amount of time in milliseconds it should take to scroll 1000px
    });

    //Initialize sal
    sal();
});