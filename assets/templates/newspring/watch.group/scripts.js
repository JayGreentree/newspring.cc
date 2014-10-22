{embed='scripts/NewSpring.EpisodeSelector'}

var es = new NewSpring.EpisodeSelector();
es.init({
	episodes_sel: '#episodes',
	episodes_details_sel: '#episode_details'
});

$(document).ready(function()
{
	function get_player() {
	  return document.getElementById('ooplayer');
	}
	
	function setEmbedCode(code) {
	  get_player().setEmbedCode(code);
	}
	
	es.start();
	
	$('#trailer').click(function(){
		var code = $(this).next().val();
		get_player().setEmbedCode(code);
	});
	
				
	// Controls tab switching
	$('#tab_nav a').click(function()
	{
		$('#tab_nav a.current').removeClass('current');
		$('.tab_content:visible').hide();

		$(this).addClass('current');
		$($(this).attr('href')).show();

		return false;
	});
	
	// Insert placeholder text within the inputs and observe focus/blur and
	// toggle the text appropriately.
	$('#freeform :text').each(function()
	{
		prepopulateTheInput(this);
		
		$(this).focus(function()
		{
			toggleTheTextFor(this, 'focus');
			
		}).blur(function()
		{
			toggleTheTextFor(this, 'blur');
		});
	});
	
	function prepopulateTheInput(the_input)
	{
		var input = $(the_input);
		var text = $('#freeform label[for="'+ input.attr('id') +'"]').text();
		
		input.val(text);
	}
	
	function toggleTheTextFor(an_input, given_an_event_type)
	{
		var input = $(an_input);
		var text = $('#freeform label[for="'+ input.attr('id') +'"]').text();
		
		if (given_an_event_type === 'focus' && input.val() === text)
			input.val('');

		if (given_an_event_type === 'blur' && input.val() === '')
			input.val(text);
	}
});
