$(document).ready(function() {
//viewport width
	$(".current-width").text($(window).width());
	$(window).resize(function() {
	  	$('.current-width').text($(window).width());
	  	windowheigt = $(window).height();
	});
//navigation
    var timeout = 5;
    var scroll = $(window).scrollTop();
    var siteheight = document.documentElement.scrollHeight;
    var windowheigt = $(window).height();
    var leftside = $('.side-menu.left-pannel, .sub-menu');
    var rightside = $('.side-menu.right-pannel');
    var rightside2 = $('.side-menu.right-pannel-2');
    var maxleftside = -1;
    var maxrightside = -1;
    var maxrightside2 = -1;
    var oldscroll = scroll;

   	leftside.each(function() {
   		if ( maxleftside < $(this).outerHeight() )
   		{
   			maxleftside = $(this).outerHeight();
   		}
   	});
   	
   	rightside.each(function() {
   		if ( maxrightside < $(this).outerHeight() )
   		{
   			maxrightside = $(this).outerHeight();
   		}
   	});
   	
   	rightside2.each(function() {
   		if ( maxrightside2 < $(this).outerHeight() )
   		{
   			maxrightside2 = $(this).outerHeight();
   		}
   	});
    
    if ( maxleftside < windowheigt ) {
    	maxleftside = windowheigt;
    }
    
    if ( maxrightside < windowheigt ) {
    	maxrightside = windowheigt;
    }
    
    if ( maxrightside2 < windowheigt ) {
    	maxrightside2 = windowheigt;
    }
    
    $('#form-register').hide();
    
//left-pannel
	$('.dim').click(function() {
		$('#close-menu').click();
		$('#close-menu2').click();
		$('#close-menu3').click();
	});
	$('#menu-icon').click(function() {
	    $('.side-menu.left-pannel').show();
	    
		$('.dim').show();
//		alert(maxleftside);
		oldscroll = scroll;

		window.scrollTo(0, 0);
		$('.side-menu.left-pannel, .left-pannel .sub-menu').css('height', maxleftside +'px');
		$('body').css('height', maxleftside +'px');
		$('body').css('overflow', 'hidden');
//		$('.topper').css('margin-top', scroll +'px');
//		$('.sub-menu').css('padding-top', scroll + 'px');
		$('.side-menu.left-pannel').addClass('animating left-300 menu-shadow');
		setTimeout(function(){
			$('.side-menu.left-pannel').addClass('shown');
			$('.side-menu.left-pannel').removeClass('animating left-300');
			$('#close-menu').fadeIn();
		}, 300);
	});
	$('#close-menu').click(function() {
		$('.dim').hide();
		$('body').css('height', 'auto');
		$('body').css('overflow', 'inherit');
		$('#close-menu').fadeOut();
		$('.side-menu.left-pannel').addClass('animating right-300');
		setTimeout(function(){
			$('.side-menu.left-pannel').removeClass('animating right-300 shown menu-shadow');
			$(window).scrollTop(oldscroll);
			$('.side-menu.left-pannel').hide();
		}, 300);
	});
//	right pannel
	$('#profile-icon').click(function() {
	    $('.side-menu.right-pannel').show();
		$('.dim').show();
		oldscroll = scroll;
		
		window.scrollTo(0, 0);
		$('.side-menu.right-pannel').css('height', maxrightside +'px');
		$('body').css('height', maxrightside +'px');
		$('body').css('overflow', 'hidden');
//		$('.topper').css('margin-top', scroll +'px');
//		$('.side-menu.right-pannel').css('height', siteheight +'px');
		$('.side-menu.right-pannel').addClass('animating right-400 menu-shadow');
		setTimeout(function(){
			$('.side-menu.right-pannel').addClass('shown');
			$('.side-menu.right-pannel').removeClass('animating right-400');
			$('#close-menu2').fadeIn();
		}, 300);
	});
	$('#close-menu2').click(function() {
		$('.dim').hide();
		$('body').css('height', 'auto');
		$('body').css('overflow', 'inherit');
		$('#close-menu2').fadeOut();
		$('.side-menu.right-pannel').addClass('animating left-400');
		setTimeout(function(){
			$('.side-menu.right-pannel').removeClass('animating left-400 shown menu-shadow');
			$(window).scrollTop(oldscroll);
			$('.side-menu.right-pannel').hide();
		}, 300);
	});
//end of right pannel
//right contact pannel
	$('#contact-icon').click(function() {
	    $('.side-menu.right-pannel-2').show();
		$('.dim').show();
		oldscroll = scroll;
		
		window.scrollTo(0, 0);
		$('.side-menu.right-pannel-2').css('height', maxrightside2 +'px');
		$('body').css('height', maxrightside2 +'px');
		$('body').css('overflow', 'hidden');
//		$('.topper').css('margin-top', scroll +'px');
//		$('.side-menu.right-pannel-2').css('height', siteheight +'px');
		$('.side-menu.right-pannel-2').addClass('animating right-650 menu-shadow');
		setTimeout(function(){
			$('.side-menu.right-pannel-2').addClass('shown');
			$('.side-menu.right-pannel-2').removeClass('animating right-650');
			$('#close-menu3').fadeIn();
		}, 300);
	});
	$('#close-menu3').click(function() {
		$('.dim').hide();
		$('body').css('height', 'auto');
		$('body').css('overflow', 'inherit');
		$('#close-menu3').fadeOut();
		$('.side-menu.right-pannel-2').addClass('animating left-650');
		setTimeout(function(){
			$('.side-menu.right-pannel-2').removeClass('animating left-650 shown menu-shadow');
			$(window).scrollTop(oldscroll);
			$('.side-menu.right-pannel-2').hide();
		}, 300);
	});
//end of right contact pannel
	$('.subber').children('a:first-child').click(function(event) {
		event.preventDefault();
		if ($(this).parent('li').hasClass('current-menu-item')) {
			return;
		}
		else {
			$('#close-sub-menu').click();
		}
		$('.subber').removeClass('current-menu-item');
		$('.subber').removeClass('current-menu-parent');
		$(this).parent().addClass('current-menu-item');
		
		$('#inner-logo').addClass('small');
		
		var concret = $(this);
		
        setTimeout(function(){
            concret.next('.sub-menu').addClass('animating left');
            setTimeout(function(){
                concret.next('.sub-menu').addClass('sub-shown');
                concret.next('.sub-menu').removeClass('animating left');
                $('#close-sub-menu').fadeIn();
            }, 300);
        }, 300);
	});
	
	$('#close-sub-menu').click(function() {
		$('.subber').removeClass('current-menu-item');	
		$('#inner-logo').removeClass('small');
		$('#close-sub-menu').fadeOut();
		$('.sub-menu').addClass('animating right');
		setTimeout(function(){
			$('.sub-menu').removeClass('animating right sub-shown');
		}, 300);
	});
	
	$('#show-profil').click(function() {
		$('#close-menu3').click();
		setTimeout(function(){
			$('#profile-icon').click();
		}, 300);
	});
	
	$('#show-map').click(function() {
		$('#close-menu2').click();
		setTimeout(function(){
			$('#contact-icon').click();
		}, 300);	
	});
	
	$('.mobile-login').click(function() {
		$('#close-menu').click();	
		setTimeout(function(){
			$('#profile-icon').click();
		}, 300);
	});
	
	$('.mobile-contacts').click(function() {
		$('#close-menu').click();	
		setTimeout(function(){
			$('#contact-icon').click();
		}, 300);
	});
	
	
	
	//end of navigation
	//accordion 
	$('.accordion li h3').click(function() {
		$(this).parent('li').toggleClass('slided');
		$(this).parent('li').find('.icon-arrow-down').toggle();
		$(this).parent('li').find('.icon-arrow-up').toggle();
		$(this).parent('li').find('.accordion-slide').slideToggle('fast');
	});
	
	//search 
	$('#searcher').click(function() {
		$('.search-box').toggleClass('hiden');
	});
	
	// MENU SCROLLING
	//Get Sections top position
	function getTargetTop(elem){
		//gets the id of the section header
		//from the navigation's href e.g. ("#html")
		var id = elem.attr("href");
		//Height of the navigation
		var offset = 0;
		//Gets the distance from the top and 
		//subtracts the height of the nav.
		return $(id).offset().top - offset;
	}
	//Smooth scroll when user click link that starts with #
	$('a[href^="#"]').click(function(event) {
		//gets the distance from the top of the 
		//section refenced in the href.
		var target = getTargetTop($(this));
		var current = $(this);
		//scrolls to that section.
		$('html, body').animate({scrollTop:target}, 500, function() {
			$('a[href^="#"]').removeClass("active");
			current.addClass("active");
		});
		//prevent the browser from jumping down to section.
		event.preventDefault();
	});
	//Pulling sections from main nav.
	var sections = $('a[href^="#"]');
	// Go through each section to see if it's at the top.
	// if it is add an active class
	function checkSectionSelected(scrolledTo){
		//How close the top has to be to the section.
		var threshold = 100;
		var i;
		for (i = 0; i < sections.length; i++) {
			//get next nav item
			var section = $(sections[i]);
			//get the distance from top
			var target = getTargetTop(section);
			//Check if section is at the top of the page.
			if (scrolledTo > target - threshold && scrolledTo < target + threshold) {
				//remove all selected elements
				sections.removeClass("active");
				//add current selected element.
				section.addClass("active");
			}
		};
	}
	//Check if page is already scrolled to a section.
	checkSectionSelected($(window).scrollTop());
	$(window).scroll(function(e){
		checkSectionSelected($(window).scrollTop());
	});
		
	//jCarousel
	$('.jcarousel').jcarousel({
		wrap: 'circular'
	})
		.jcarouselAutoscroll({
		    interval: 5000,
		    target: '+=1',
		    autostart: true
	});
	//jCarousel slider
	$('.red-slider').jcarousel({
		wrap: 'circular'
	})
		.jcarouselAutoscroll({
		    interval: 5000,
		    target: '+=1',
		    autostart: true
	});
	
	var redslider = $('.red-slider');
	
	redslider.swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
            redslider.jcarousel('scroll', '+=1');
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            redslider.jcarousel('scroll', '-=1');
        }
    });
	
    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination();
	    
	var carousel = $('.jcarousel');

    carousel.swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
            carousel.jcarousel('scroll', '+=1');
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            carousel.jcarousel('scroll', '-=1');
        }
    });
 
    //fixed top 
    $(window).on('scroll', function() {
	scroll=$(window).scrollTop();
        if($('.switcher').length > 0) {
            var fromtop = $('.switcher').offset().top;
    //    	$('.switcher').text($('.switcher').offset().top);
   
//            if ($(window).scrollTop() > (fromtop-100)) {
//                $('.top').addClass('fixed');
//            }
//            else {
//                $('.top').removeClass('fixed');
//            }

            if ($(window).scrollTop() > (fromtop-666)) {
                $('.slide-menu').fadeOut();
            }
            else {
                $('.slide-menu').fadeIn();
            }
            
            if ($(window).scrollTop() > 10)
            	$('.scroll-down').fadeOut();
            else {
            	$('.scroll-down').fadeIn();
            }
        }
    });
    
    //your browser is not supported 
    
   	$('.endofstory').click(function() {
   		$(this).hide();
   	});
   	
   	$('.side-menu').hide();
   	
   	// scroll down
   	$('.scroll-down').css('top', windowheigt - 50 +'px');

    $('.submit_on_change').on('change', function(e) {
        var forms = $(this).parents('form');
        if(forms.length > 0)
            forms.submit();
    });
	
   });
