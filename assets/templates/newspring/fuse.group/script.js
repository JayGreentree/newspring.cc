$('document').ready(function(){
    $( "#locations" ).accordion({
      active: false,
      heightStyle: "content",
      collapsible: true,
      alwaysOpen: false
    });
    $('.tweet:nth-child(3n+1)').addClass('g_a');
    $('.tweet:nth-child(3n+3)').addClass('g_o');
    $('#p_fuse a.disabled').click(function(){
      return false;
    });
    
    function mycarousel_initCallback(carousel) {
        jQuery('.arrow-wrapper.right').bind('click', function() {
            carousel.next();
            return false;
        });

        jQuery('.arrow-wrapper.left').bind('click', function() {
            carousel.prev();
            return false;
        });
        // Pause autoscrolling if the user moves with the cursor over the clip.
        carousel.clip.hover(function() {
            carousel.stopAuto();
        }, function() {
            carousel.startAuto();
        });
    };

    $('ul.items').jcarousel({
        auto: 5,
        wrap: 'circular',
        initCallback: mycarousel_initCallback,
        buttonNextHTML: null,
        buttonPrevHTML: null
    });

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

    $("#campus-select").click(function() {
        $(this).find('ul').slideToggle(100);
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parent().hasClass("selectbox"))
            $("#campus-select ul").slideUp(100);
    });
});
