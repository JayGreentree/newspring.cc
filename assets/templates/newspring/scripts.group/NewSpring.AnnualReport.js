$(document).ready(function()
{
	$('h1').hide();
	$('#to_the_left').prepend('<ul id="prev_next"><li id="prev"><a href="#prev" title=""><span>Previous Page</span></a></li><li id="next"><a href="#next" title=""><span>Next Page</span></a></li></ul>');
	
	function showButtons()
	{
		var curr_page = $('#pages .current').attr('id');
		var prev_butt = $('#prev span');
		var next_butt = $('#next span');
		var p_temp = '';
		var n_temp = '';
		
		if (curr_page == 'page_1') {
			p_temp = prev_butt.css('display');
			prev_butt.hide();
		}
		else if (curr_page == 'page_18') {
			n_temp = next_butt.css('display');
			next_butt.hide();
		}
		else {
			prev_butt.css('display', p_temp);
			next_butt.css('display', n_temp);
		}
	}
	
	showButtons();
	
	$('#page_nav a').click(function()
	{
		var that = $(this);
		
		$('#page_nav .current').removeClass('current');
		that.parent().addClass('current');
		
		$('#pages .current').removeClass('current');
		$(that.attr('href')).addClass('current');
		
		showButtons();
		
		return false;
	});
	
	$('#prev_next a').click(function()
	{
		var page = $('#pages .current').attr('id').split('_');
		
		// We're slicing from the end because IE 6 and 7 return the fully-qualified href.
		var prev_next = $(this).attr('href').slice(-4);
		var curr = parseInt(page[1],10);
		var prev = curr-1;
		var next = curr+1;
		
		if (curr > 0 && curr < 19)
			$('#page_nav a[href="#page_'+eval(prev_next)+'"]').click();
		
		showButtons();
		
		return false;
	});
	
});
