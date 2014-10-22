$(document).ready(function(){
    $('.flexslider').flexslider({
      namespace: "flex-",
      selector: ".flex-slides > li",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      slideDirection: "horizontal",
      slideshow: true,
      slideshowSpeed: 5000,
      animationDuration: 700,
      pauseOnAction: false,
      pauseOnHover: true,
      useCSS: true, 
      itemWidth: 940,
      itemMargin: 0, 
      manualControls: ".flex-control-nav li a",
      controlsContainer: ".flex-container",
      start: function(){
        $('.flex-control-nav li').first().find('a').addClass('flex-active');
        var $current = $('.flex-control-nav li').first();
        var left = ($current.offset().left - $current.parent().offset().left) + ($current.width() / 2) - ($('#tippy').width() / 2);
        $('#tippy').css({ 'left': left+'px' }).css('display','block');
      },
      before: function(slider){
         var $current = $('.flex-control-nav li').eq(slider.animatingTo);
         var left = ($current.offset().left - $current.parent().offset().left) + ($current.width() / 2) - ($('#tippy').width() / 2);
         $('#tippy').css({ 'left': left+'px' }).addClass('loaded');
       }
    });
	$("blockquote.pullquote").insertAfter(".article p:first");  
});
//I want to replace tippy with CSS instead, IE would not incorporate tippy.  I hate tippy.	

;
