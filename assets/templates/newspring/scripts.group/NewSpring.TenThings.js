$(document).ready(function() {

		$('.audio-btn').hover(function() {
			$(this).parent().find('.listen').toggleClass('listen-hover');
		});
	
		$('.listen').hover(function() {
		  	$(this).parent().find('.audio-btn').toggleClass('audio-hover');
		});
		
		$('.video-title').hover(function(){
			$(this).parent().find('.video-image').toggleClass('video-image-hover');
			$(this).parent().parent().find('.box').toggleClass('box-hover');
			$(this).parent().find('.video-image').find('play').toggleClass('play-hover');
		});
		
		$('.video-image').hover(function(){
			$(this).parent().parent().find('.box').toggleClass('box-hover');
			$(this).find('.play').toggleClass('play-hover');
		});

		
		$('#words').hover(function() {
			$(this).parent().find('#icon').toggleClass('icon-hover');
		});
		
		$('#icon').hover(function() {
			$(this).parent().find('#words').toggleClass('words-hover');
		});


		$('#download-words').hover(function() {
			$(this).parent().find('#download-icon').toggleClass('download-icon-hover');
		});

		$('#download-icon').hover(function() {
			$(this).parent().find('#download-words').toggleClass('download-words-hover');
		});
	
		//get width and height of the wrapper and give it to the UL	
		var wrapperwidth = $('#things').width() *  $('#things ul > li').size();
		$('#things ul').css('width', wrapperwidth);
		var wrapperheight = $('#things').height();
		$('#things ul').css('height', wrapperheight);	


		//set my li width
		var width = $('#things').width();
		$('#things ul li').css('width', width);

		//set my counter vars
		var counter = $('#things ul > li').size();
		var decount = 1;
		var autocount = 1;

	//slide the button to the next item
	function goNext() {
		//console.log('next');
		if ( decount != counter) {
		$('#things ul').animate({ left: '-=' + $('#things').width() }, 400, 'swing', function() { });
		$('.activenum').removeClass('activenum').parent().next().find('a.nav').addClass('activenum');
		decount++;
		window.location.hash = decount;
		}
	}

	function goBack() {
		if ( decount != 1) {
		//Moves things to the left
		$('#things ul').animate({ left: '+=' + $('#things').width() }, 400, 'swing', function() { });
		$('.activenum').removeClass('activenum').parent().prev().find('a.nav').addClass('activenum');
		decount--;
		window.location.hash = decount;
		}
	}

	//make the number clickable
	$("#numbers li a.nav").click(function(e) {
		if(e.preventDefault){
			e.preventDefault();
		} else {
			e.returnValue = false; //For IE
		}
		
		var num = $(this).attr('id').substr(2);
		
		var clickednum = $(this).html() * - $('#things').width() + $('#things').width();
		$('#things ul').animate({ left: clickednum }, 400, 'swing', function() { });
		$('.activenum').removeClass('activenum');
		$(this).addClass('activenum');
		decount = $(this).html();
		window.location.hash = $(this).html();	
	});


	//thaths the hash-shizzle
	if ( window.location.hash != '') {
		//get hash, scroll to position
		var hashnum = window.location.hash.substr(1) * - $('#things').width() + $('#things').width();
		
		$('#things ul').animate({ left: hashnum }, 0, function() { });
		//set counters to position
		decount = window.location.hash.substr(1);
		
		$('.activenum').removeClass('activenum');
		var hashname = window.location.hash.substr(1);
		$('#id' + hashname + ' > a').addClass('activenum');
	} else {
		$('#id1 > a').addClass('activenum');
	}

	//get my clickers
	$("#right").click(function(e) {
		if(e.preventDefault){
			e.preventDefault();
		} else {
			e.returnValue = false; //For IE
		}	
	goNext(); 
	});	
	$("#left").click(function(e) {
		if(e.preventDefault){
			e.preventDefault();
		} else {
			e.returnValue = false; //For IE
		}
	goBack(); 
	});	

});
	
