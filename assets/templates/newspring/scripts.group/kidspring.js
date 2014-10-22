var doc = $(document);

doc.ready(function()
{
	var video = $('#video');
	var trans = $('#trans');
	var play = $('#play');

	function toggle()
	{
		if (video.css('display') === 'none') {
			trans.fadeIn('fast');
			video.fadeIn('fast');
		}
		else {
			trans.fadeOut('fast');
			video.fadeOut('fast');
		}
	}

	// Lightbox it when the viewer clicks play
	play.click(function()
	{
		toggle();
	
		return false;
	});

	// Toggle when the viewer clicks the transparent layer
	trans.click(function()
	{
		toggle();
	});

	doc.keyup(function(e)
	{
		// Toggle when the viewer hits the escape key
		if (e.keyCode === 27) {
			toggle();
		}
	});

});
