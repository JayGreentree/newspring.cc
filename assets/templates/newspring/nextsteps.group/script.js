$('document').ready(function(){
	$( "#accordion" ).not('.salvation').accordion({
		heightStyle: "content",
	  	collapsible: true,
	    autoHeight: true,
	    active: false,
	    animate: 150
	});
	$('.resources-trigger').click(function(){
		$('.care-resources').slideToggle();
	})
});

