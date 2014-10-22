$(document).ready(function()
{	
	$('#tab_nav a').click(function()
	{
		var new_tab = $(this);
		var current_tab = $('#tab_nav .current');
		
		current_tab.removeClass('current');
		new_tab.addClass('current');
		
		$('.tab:visible').hide();
		$(new_tab.attr('href')).show();
				
		return false;
	});
	
});
