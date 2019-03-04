/*==================== Start loading animation ====================*/
$(window).on('load' , function(){
	$(".loading").fadeOut(500,function(){
		$(this).remove();
	});
});
/*==================== End loading animation ====================*/
$(document).ready(function(){

    /*==================== Start smooth scroll animation ====================*/
    var scroll = new SmoothScroll('a[href*="#"]:not([data-slide])', {
		speed: 1000, // Integer. How fast to complete the scroll in milliseconds
    });
	/*==================== End smooth scroll animation ====================*/
	
	//INSTANTIATE FILTERIZR
	if($('.filtr-container').length){ 
		var filterizd = $('.filtr-container').filterizr({
			//options object
		});
	}

	//Then simply initialize owl carousel in your script file:
	$(".owl-carousel").owlCarousel({
		loop : true,
		nav : false,
		dots : true,
		responsive: {
			0 : {
				items : 1,
			},
			768 : {
				items : 2,
				margin : 8
			},
			992 : {
				items : 2,
				margin : 16
			}
		}
	});

	//Then simply initialize Sal in your script file:
	sal();

    /*==================== Start navbar animation ====================*/
    /*= on init =*/
	var scrolling = $(document).scrollTop();
	if(scrolling >= 50){
		$(".navbar").removeClass("navbar-light");
		$(".navbar").addClass("navbar-dark");
    }
    /*= whene start scrolling =*/
	$(document).on('scroll' , function(){
		var scrolling = $(document).scrollTop();
		if(scrolling >= 50){
			$(".navbar").removeClass("navbar-light");
			$(".navbar").addClass("navbar-dark");
		}else{
			$(".navbar").removeClass("navbar-dark");
			$(".navbar").addClass("navbar-light");
		}
	});
	/*==================== End navbar animation ====================*/
	
	//********** */
		// Returns width of browser viewport
		var viewport = $( window ).width();
		if (viewport >= 768) {
			$(".about .item img").attr("src", "images/face-4-3.jpg");
		}else{
			$(".about .item img").attr("src", "images/face-1-1.jpg");
		}
		$(window).on('resize', function(e) {
			var viewport = $( window ).width();
			if (viewport >= 768) {
				$(".about .item img").attr("src", "images/face-4-3.jpg");
			}else{
				$(".about .item img").attr("src", "images/face-1-1.jpg");
			}
		});
		
});

