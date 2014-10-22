if (typeof(NewSpring) == 'undefined') NewSpring = {};

function get_player() {
  return document.getElementById('ooplayer');
}

function setEmbedCode(code) {
  get_player().setEmbedCode(code);
}

NewSpring.EpisodeSelector = function()
{
	var that = this;
		
	this.init = function(args)
	{
		this.episodes_sel = args.episodes_sel;
		this.episodes_details_sel = args.episodes_details_sel;
		this.episode_details;
		this.trailer;
		this.temp;
		this.weblog = (typeof(args.weblog) == 'undefined') ? 'episode' : args.weblog;		
	};
	
	this.start = function()
	{
		this.prepEpisodeContainer();
		this.buildEpisodeDetails();
		this.observeEpisodeClick();
		this.fixTheIEs();	
	};
	
	this.prepEpisodeContainer = function()
	{
		var first = $(this.episodes_sel+' li:first');
		var first_a = $(this.episodes_sel+' li:first a');
		var last = $(this.episodes_sel+' li:last');
		var thumbs = $(this.episodes_sel+' li');
		var p_and_s = (12 - (thumbs.length * 2)) / 2;

		first.addClass('g_a');
		last.addClass('g_o');
		
		// Add prefix and suffix classes
		if (p_and_s) {
			first.addClass('p_'+p_and_s);
			last.addClass('s_'+p_and_s);
		}
		
		// Add and place Dotty
		first.prepend('<i class="ir">Dotty</i>');
		$('i.ir').css('left', (first_a.offset().left) - first.offset().left + 60);
		
		
	};
	
	this.buildEpisodeDetails = function()
	{
		// We don't need to build it if it's already on the page.
		if (!$(that.episodes_details_sel).hasClass('initial')) {
			that.episode_details = '' +
				'<div id="'+ that.episodes_details_sel.slice(1) +'" class="g_12 clearfix" style="display: none;">' +
				'	<i class="ir">Pointy</i>' +
				'	<div class="description">' +
				'		<h1></h1>' +
				'	</div>' +
				'	<ul>' +
				'		<li id="mp3"><em>Audio <a href="#" title="Download the .mp3 file for ">(.mp3)</a></em> Audio <a href="/feeds/sermon_audio/" title="Subscribe to NewSpring\'s Sermon Podcast">(subscribe)</a></li>' +
				'		<li id="mp4"><em>Video <a href="#" title="Download the .mp4 file for ">(.mp4)</a></em> Video <a href="/feeds/sermon_video/" title="Subscribe to NewSpring\'s Sermon Vodcast">(subscribe)</a></li>' +
				'		<li id="m4v"><em>Video <a href="#" title="Download the .m4v file for ">(.m4v)</a></em> Video <a href="/feeds/sermon_video_ipod/" title="Subscribe to NewSpring\'s Sermon Vodcast">(subscribe)</a></li>' +
				'	</ul>' +
				'</div>';
			
			$(that.episodes_sel).after(that.episode_details);
		}
	};
	
	this.observeEpisodeClick = function()
	{
		$(this.episodes_sel+' a').click(function()
		{
			var the_link = $(this);
			
			if (!the_link.hasClass('showing'))
				that.handleEpisodeClick(the_link);
			
			return false;
		});
	};
	
	this.handleEpisodeClick = function(clicked)
	{
		// Remove the current "showing" class and add it to the appropriate
		// video link. The placement of this needs to be after the video has
		// successfully loaded. Adding this to my programming debt.
		$(this.episodes_sel+' a.showing').removeClass('showing');
		clicked.addClass('showing');
		
		var href = clicked.attr('href');
		var url = location.protocol + '//' + location.host + '/json/' + this.weblog + '/' + href.slice(1) + '/';
		
		// (parent.parent - self) gives us the leftmost corner, 60 takes us to the middle across all browsers
		var offset_left = parseInt(clicked.offset().left, 10) - parseInt(clicked.parent().parent().offset().left, 10) + 60;
		var container = $('#container');
		var ed_container = $(that.episodes_details_sel);
						
		// Hide the video container
		//container.fadeOut('fast');
		
		// Show/hide the episode details
		if (ed_container.css('display') != 'none')
			ed_container.slideToggle();
		
		// Move Dotty
		$('i.ir').animate({ left: offset_left });
		
		// Show/Hide the loading message
		$('#loading').ajaxStart(function()
		{
			$(this).fadeIn('slow');
		
		}).ajaxStop(function()
		{
			$(this).fadeOut('slow');
		});
		
		// If they're not requesting the trailer
		if (href.indexOf('trailer') == -1) {

//			 We hold on to the trailer if it's present
//			if (this.trailer.length != 0)
//				this.temp = this.trailer.remove();

			// We fade out the current video, load the requested, fade in the new
			$.ajax({
				dataType: 'json',
				success: function(data)
				{
					var title = data.title+' | '+data.speaker+' | '+data.date;

                    get_player().setEmbedCode(data.embed_code);
                    										
					$(that.episodes_details_sel+' .description p').remove();
					$('h1').html(title);
					$(that.episodes_details_sel+' .description').append(data.description);
					
					/* I need to rewrite this into a function. Adding it to my programming debt. */
					if (data.mp3_url !== '') {
						$('#mp3 em a').attr('href', data.mp3_url);
						$('#mp3 em').show();
					}
					else
						$('#mp3 em').hide();
					
					if (data.mp4_url !== '') {
						$('#mp4 em a').attr('href', data.mp4_url);
						$('#mp4 em').show();
					}
					else
						$('#mp4 em').hide();
					
					if (data.m4v_url !== '') {
						$('#m4v em a').attr('href', data.m4v_url);
						$('#m4v em').show();
					}
					else
						$('#m4v em').hide();
					
					var link_title = $('em a').attr('title');
					$('em a').attr('title', link_title+' '+title);
					
					var ed = $('#episode_details');
					
					if (ed.css('display') == 'none')
						ed.slideToggle();
				},
				url: url
			});
		}
	};
	
	this.fixTheIEs = function()
	{
		$('i.ir').css('zoom', '1');
		$('#tab_nav a').css('zoom', '1');
	};
};
