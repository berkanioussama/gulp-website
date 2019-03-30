//=require ../../node_modules/jquery/dist/jquery.min.js
//=require ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//=require ../../node_modules/filterizr/dist/jquery.filterizr.min.js
//=require ../../node_modules/lozad/dist/lozad.min.js
//=require ../../node_modules/sal.js/dist/sal.js
//=require ../../node_modules/smooth-scroll/dist/smooth-scroll.min.js
//=require vendors/owl.carousel.min.js

$(document).ready(function(){
    //=require layouts/*.js

    // type your global script here //

    // instantiate Lozad as follows:
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    //Initialize Smooth Scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500, // Integer. Amount of time in milliseconds it should take to scroll 1000px
    });

    //Initialize sal
    sal();

    // fire filterizr
    if( $('.filtr-container').length )         // use this if you are using class to check
    {
        var filterizd = $('.filtr-container').filterizr({
           //options object
        });
    }
    
    // Owl initializer function
    $(".owl-testimonial").owlCarousel({
        items: 1,
        nav: true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
    });

});