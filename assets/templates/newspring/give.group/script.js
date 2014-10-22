$(document).ready(function($) { 
	$('.modal').fancybox({
	  'width'       : '50%',
	  'height'      : '75%',
	  'autoScale'       : false,
	  'titlePosition'   : 'inside',
	  'transitionIn'    : 'none',
	  'transitionOut'   : 'none',
	});

	$("#switcher li").click(function(){
		if(!$(this).hasClass('active')) {
			$('#switcher li').toggleClass('active');
			if($(this).hasClass('recurring')) {
				// Hide One Time, Show Recurring
				$('#onetime').fadeOut(100,function(){
					$('#recurring').fadeIn(100);
				});
			} else {
				// Hide Recurring, Show One Time
				$('#recurring').fadeOut(100,function(){
					$('#onetime').fadeIn(100);
				});
			}
		}
	});
	$("#switcher .onetime").click(function(){

	});
}); 
