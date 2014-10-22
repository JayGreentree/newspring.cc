/*!
 * jQuery TextChange Plugin
 * http://www.zurb.com/playground/jquery-text-change-custom-event
 *
 * Copyright 2010, ZURB
 * Released under the MIT License
 */

(function ($) {
	
	$.event.special.textchange = {
		
		setup: function (data, namespaces) {
		  $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
			$(this).bind('keyup.textchange', $.event.special.textchange.handler);
			$(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('.textchange');
		},
		
		handler: function (event) {
			$.event.special.textchange.triggerIfChanged($(this));
		},
		
		delayedHandler: function (event) {
			var element = $(this);
			setTimeout(function () {
				$.event.special.textchange.triggerIfChanged(element);
			}, 25);
		},
		
		triggerIfChanged: function (element) {
		  var current = element[0].contentEditable === 'true' ? element.html() : element.val();
			if (current !== element.data('lastValue')) {
				element.trigger('textchange',  [element.data('lastValue')]);
				element.data('lastValue', current);
			}
		}
	};
	
	$.event.special.hastext = {
		
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.hastext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.hastext.handler);
		},
		
		handler: function (event, lastValue) {
			if ((lastValue === '') && lastValue !== $(this).val()) {
				$(this).trigger('hastext');
			}
		}
	};
	
	$.event.special.notext = {
		
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.notext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.notext.handler);
		},
		
		handler: function (event, lastValue) {
			if ($(this).val() === '' && $(this).val() !== lastValue) {
				$(this).trigger('notext');
			}
		}
	};	
 
})(jQuery);

$(document).ready(function(){
  $("#submit").click(function(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue = false;
    }
    
    if($("#question-body").val() == ""){
      $(".error").text("You have to ask a question first!").show();
      return false;
    }else{
      var form = $("#ask-question").serialize();
      $.ajax({
        url: "http://ask.newspring.cc/ask/question",
        type: "POST",
        dataType: "json",
        data: form
      }).success(function(data, textStatus, jqXHR){
        window.location.href = "success";  
      }).error(function(jqXHR, textStatus, errorThrown){
        var error = $.parseJSON(jqXHR.responseText);
        $(".error").text(error.errors).show();
        return false;
      });
    }
  });


  $('#question-body').on('textchange', function (event, previousText) {
    var count = parseInt($(this).val().length);
    if(count > 140){
      $('#character-counter').css('color', '#DC3044').html(140 - count);
      $('button').addClass('disabled').attr('disabled', true);
    }else if(count === 0){
      $('#character-counter').css('color', '#DDD').html(140 - count);
      $('button').addClass('disabled').attr('disabled', true);
    }else{
      $('#character-counter').css('color', '#DDD').html(140 - count);
      $('button').removeClass('disabled').attr('disabled', false);
    }
  });

  $('#question-body').trigger('textchange');
  

  $("#question-body").on('keypress', function(){
    if ($(".error").is(':visible')){
      $(".error").hide();
    }
  }); 
});


