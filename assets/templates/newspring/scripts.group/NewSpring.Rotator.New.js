if (typeof(NewSpring) == 'undefined') NewSpring = {};

// TODO: GoTo doesn't work in IE
// TODO: Fix "caught in the middle" bug
// TODO: Clean up setup()

NewSpring.Rotator = function()
{
	var that = this;
	
	this.init = function(args)
	{
		this.sel = args.selector;
		this.container_width = $(this.sel.split(' ')[0]).css('width').slice(0,-2);
		this.current = 0;
		this.duration = parseInt(args.duration, 10) * 1000;
		this.is_playing = false;
		this.is_setup = false;
		this.speed = 800;
		this.time = 0;
	};

	this.updateTime = function()
	{
		this.time += 1000;
		
		if (this.time === this.duration) {
			this.flow();
			this.time = 0;
		}
	};
	
	this.flow = function()
	{
		var curr = this.current;
		// loop back to the beginning if we exceed the length
		var next = this.current = (this.current+1 === $(this.sel).length) ? 0 : this.current+1;

		this.slide('#hero_'+curr, '#hero_'+next);
	};

	this.slide = function(from_current, to_next)
	{
		$(from_current).animate({
		  left: '-'+this.container_width+'px'
		}, this.speed);

		$(to_next).animate({
		  left: '0'
		}, this.speed, function()
		{
		  $(from_current).css({ left: that.container_width+'px' });
		
			// Update Navigation
			that.updateSlideNav(from_current.split('_')[1], to_next.split('_')[1]);
		});
	};
	
	this.goTo = function(slide)
	{
		this.slide($('a.current').attr('href'), slide);
		
		this.current = parseInt(slide.split('_')[1], 10);
		
		if (this.is_playing)
			this.stop();
	};
	
	this.updateSlideNav = function(from_current, to_next)
	{
		$('#slide_nav_'+from_current).removeClass('current');
		$('#slide_nav_'+to_next).addClass('current');
		
		this.updateIndicator();
	};
	
	this.updateIndicator = function()
	{
		var $current = $('#slide_nav a.current').parent();
		var left = ($current.offset().left - $current.parent().offset().left) + ($current.width() / 2) - ($('#tippy').width() / 2);
		
		$('#tippy').css({ 'left': left+'px' });
	};
	
	this.start = function()
	{
		// We only start the rotator if there is more than one hero to rotate
		if ($(this.sel).length > 1) {
			if (!this.is_setup)
				this.setup();

			// start the timer
			that.interval = setInterval(function()
			{
				that.updateTime();
			}, 1000);

			$('#pause_play').removeClass('paused');
			that.is_playing = true;
			
			this.updateIndicator();
		}
	};
	
	this.stop = function()
	{
		clearInterval(that.interval);
		this.time = 0;
		
		$('#pause_play').addClass('paused');
		that.is_playing = false;
	};
	
	this.setup = function()
	{
		// Setup the hero ids and positions
		$(this.sel).each(function(i)
		{
			var $this = $(this)

			$this.attr('id', 'hero_'+i);

			if (i != 0)
				$this.css({ left: '940px' });
		});
		
		// Build and insert the slide nav
		var $parent = $(this.sel.split(' ')[0]);
		var slide_nav = this.buildSlideNav(this.sel);
		var $slide_nav = $(slide_nav);
		
		$parent.before(slide_nav);
		
		var margin_left = (($parent.width() - $slide_nav.width()) / 2) + parseInt($slide_nav.css('padding-left').slice(0,-2), 10);

		$slide_nav.css('margin-left', margin_left+'px');
		
		$('#slide_nav_0').addClass('current');
		
		$('#slide_nav a').click(function()
		{
			if (!$(this).hasClass('current'))
				that.goTo($(this).attr('href'));
			
			return false;
		});
		
		// Build and insert the pause/play button
		var pause_play = $('<a>').attr({
			'class': 'ir',
			'href': '#pause_play',
			'id': 'pause_play'
		}).text('Pause').hide().click(function()
		{
			if (that.is_playing)
				that.stop();
			else
				that.start();
				
			return false;
				
		}).mouseover(function()
		{
			// kills the parent container mouseover flicker
			$(this).show();
		});
		
		$parent.before(pause_play);

		$parent.mouseover(function()
		{
			$('#pause_play').show();
			
		}).mouseout(function()
		{
			$('#pause_play').hide();
		});
		
		this.is_setup = true;
	};
	
	this.buildSlideNav = function(for_slides)
	{
		var nav = $('<ul>').attr({
			'id': 'slide_nav', 
			'class': 'clearfix g_12'
		});
		
		nav.append('<i id="tippy"></i>');
		
		$(for_slides).each(function(i)
		{
			var title = $(this).find('a').attr('title') || $(this).find('img').attr('title');
			nav.append('<li><a href="#hero_'+ i +'" title="" id="slide_nav_'+ i +'">'+ title +'</a></li>');
		});
		
		return nav;
	};
};
