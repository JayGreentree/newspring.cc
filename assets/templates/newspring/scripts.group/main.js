var util = new NewSpring.Utilities();

/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-dropdown.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){function d(){a(b).parent().removeClass("open")}var b='[data-toggle="dropdown"]',c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),e=c.attr("data-target"),f,g;return e||(e=c.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,"")),f=a(e),f.length||(f=c.parent()),g=f.hasClass("open"),d(),!g&&f.toggleClass("open"),!1}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api",d),a("body").on("click.dropdown.data-api",b,c.prototype.toggle)})}(window.jQuery)

$(document).ready(function()
{
	util.toggleInputText({
		selector: '#site_search',
		text: 'Search',
		onload: true
	});
	util.fixIE6();
	
	$('.dropdown-toggle').dropdown();
	
	// Open external links in a new window
	// This is expensive. Is it worth it?
	$('a[rel="external"]').attr({ 'target' : '_blank' });
	
	$('a.revelation').click(function()
	{
		if ($(this).attr('href').charAt(0) == '#') {
			$(this).toggleClass('rotate');
			//console.log($(this).attr('data-alt'));
			if($(this).attr('data-alt')){
				var save_label = $(this).text();
				$(this).text($(this).attr('data-alt'));
				$(this).attr('data-alt', save_label);
			}
			$($(this).attr('href')).slideToggle();
			return false;
		}
	});
	
	$('.fauxlink').click(function()
	{
		window.location = $(this).find('a').attr('href');
	});
	
	/* Blog Category and Archive links --------------------------------------- */
	if ($('#archives_categories').length != 0) {
		$('li.more').hide();

		$('a.more').click(function()
		{
			var dad_or_mom_im_not_sexist = $(this).parent();
			dad_or_mom_im_not_sexist.parent().find('li.more').slideDown();
			dad_or_mom_im_not_sexist.slideUp(function() { $(this).remove(); });
			return false;
		});
	}
	
	/* Page specific superfluities ------------------------------------------- */
	$('#p_kidspring #body').prepend('<i id="peekaboo"></i><i id="values"></i><i id="eyes"></i><i id="start"></i>');
	$('#p_kenya #body').prepend('<i id="left_montage"></i><i id="right_montage"></i><i id="right_montage2"></i>');
	$('#p_stories #etc li:last').addClass('last');
	$('#p_watch_and_listen #gigantor').append('<span id="cap_left"></span><span id="cap_right"></span>');
	$('.ie ul#episodes li:nth-child(6)').css("marginRight", "0px");
	$('.ie ul#episodes li:nth-child(7)').css("marginLeft", "0px");
	
	
	/* Form ------------------------------------------------------------------ */
	$('form .hidden').hide();
	$('input[type="text"]').addClass('text');
});
