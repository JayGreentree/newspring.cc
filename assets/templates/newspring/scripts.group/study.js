{embed='scripts/jquery'}
{embed='scripts/NewSpring.Utilities'}

var util = new NewSpring.Utilities();

$(document).ready(function()
{	
	// Superfluous arrow for scripture link
	$(".editorial_scripture li a").append(" <em>&mdash;&raquo;<\/em>").attr("target","_blank");
	
	$('#search').bind('focus blur', function()
	{
		$('form').toggleClass('focus');
	});
	
	util.toggleInputText({
		selector: "#search",
		text: "Search",
		onload: true
	});
	
	// Share via Email ----------------------------------------------------------
	
	// We send their email and show a success/failure message
	$('#send_message').click(function()
	{
		var params = $('#tellafriend_form').serialize();
		
		$.post('http://www.newspring.cc/', params, function(data)
		{
			var response = $(data).find('p:first').text();
			var success_text = "has been sent";
			
			var message = $('#message');
			var success = 'You\'re message has been sent. Thanks for sharing.';
			var failure = 'Uh oh. Something went wrong. Please try again and let us know that you received this message at <a href="mailto:web@newspring.cc" title="Email web@newspring.cc">web@newspring.cc</a>. <a href="#okay" title="Okay" id="okay" onclick="document.getElementById(\'message\').style.display=\'none\'; return false;">Okay</a>';
			
			toggleSharing();
			
			if (response.indexOf(success_text) != -1) {
				message.html(success);
				message.addClass('success');
				setTimeout('$("#message").fadeOut();', 4000);
			}
			else {
				message.html(failure);
				message.addClass('failure');
			}
			
			message.fadeIn();
		});
		
		return false;
	});
	
	// We want to pay attention to a few links, sharing and canceling
	$('a').click(function()
	{
		var the_link = $(this);
		var the_href = the_link.attr('href');
		
		if (the_href.slice(0,1) == '#') {
			
			if (the_href == '#share_email' || the_href == '#cancel')
				toggleSharing();
										
			return false;
		}
	});
	
	// We hide everything if they click off the form
	$('#trans_bg').click(function()
	{
		toggleSharing();
	});
	
	// Toggle the Share via Email form and lightbox background
	function toggleSharing()
	{
		var trans_bg = $('#trans_bg');
		var share_form = $('#tellafriend_form');
		
		if (trans_bg.css('display') == 'none') {
			trans_bg.fadeIn('fast');
			share_form.fadeIn('fast');
			
			$(document).bind('keyup', function(event) {
				if (event.keyCode == 27)
					toggleSharing();
			});
		}
		else {
			trans_bg.fadeOut('fast');
			share_form.fadeOut('fast');
			$(document).unbind('keyup');
		}
	}

});
