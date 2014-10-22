$(document).ready(function($) { 
    $(".easter-media.video").scrollable();
    //$(".easter-media.twitter").scrollable({circular: true}).autoscroll({ autoplay: true, interval: 10000 });
    $("#easter-photos").scrollable();

    $('.fancybox').fancybox({
      openEffect  : 'fade',
      closeEffect : 'fade',
      helpers : {
        media : {}
      }
    });
    
    $('a[rel="iframe"]').fancybox({
      'width'       : '75%',
      'height'      : '75%',
      'autoScale'       : false,
      'transitionIn'    : 'none',
      'transitionOut'   : 'none',
      'type'        : 'iframe'
    });

    $('.modal').fancybox({
      'width'       : '50%',
      'height'      : '75%',
      'autoScale'       : false,
      'titlePosition'   : 'inside',
      'transitionIn'    : 'none',
      'transitionOut'   : 'none'
    });

    //Open links in new window
    $('a[rel="nofollow"]').click( function() {
    window.open( $(this).attr('href') );
    return false;
    });
}); 

/*
//The following script loads the next set of images for the photo gallery via ajax when a user clicks the next arrow.
var imagesJSON = [{exp:channel:entries channel="get_ready_photos" orderby="title" sort="asc" dynamic="off" limit="1" disable="categories|category_fields|member_data|pagination|trackbacks"}{get_ready_assets sort="asc" backspace="1"}"{url}",{/get_ready_assets}{/exp:channel:entries}];

var currImages = 0;

$(function() {
    currImages = 0;
    LoopThroughImages();

    // initialize scrollable
    $("#easter-photos").scrollable();
    $('#easter-photos .next').click(function() {
        // Load next 4 images using ajax.
        //i am loading images from the array
        LoadNextImagesAjax();
    });
});

function LoopThroughImages() {
    var i = 0;
    var currDiv = null;

    for (var i = 0; i < 8; i++) {
        if(imagesJSON.length < currImages + i)
        {
            currImages+=i;
            return;
        }
        if (i % 4 == 0) {
            currDiv = $('<div></div>');
            $("#easter-photos .items").append(currDiv);
        }
        currDiv.append('<img src="' + imagesJSON[i] + '" />');
    }

    currImages+=8;
}

function LoadNextImagesAjax() {
    for (var i = 0; i < 4; i++) {
        if(imagesJSON.length <= currImages + i)
        {
            currImages+=i;
            return;
        }
        if (i % 4 == 0) {
            currDiv = $('<div></div>');
            $("#easter-photos .items").append(currDiv);
        }
        currDiv.append('<img src="' + imagesJSON[currImages + i] + '" />');
    }

    currImages+=4;
}
*/
