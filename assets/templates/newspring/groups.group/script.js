$(document).ready(function(){
	$('p.question').click(function(){
		$(this).next('p.answer').slideToggle();
		$(this).parent().find('.arrow').toggleClass('right down')
	});
	$('ul.questions li').click(function(){
		var index = $(this).index()
		$('ul.questions li, ul.answers li').removeClass('active');
		$(this).addClass('active');
		$('ul.answers li').eq(index).addClass('active');
	});
	$('#listswitch-control li:first-child').click(function(){
		$('#listswitch-control li').removeClass('active');
		$(this).addClass('active');
		$('#donts').hide();
		$('#dos').show();
	});
	$('#listswitch-control li:last-child').click(function(){
		$('#listswitch-control li').removeClass('active');
		$(this).addClass('active');
		$('#dos').hide();
		$('#donts').show();
	});
});
