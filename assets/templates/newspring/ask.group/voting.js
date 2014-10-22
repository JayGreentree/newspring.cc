$(document).ready(function(){

  var uuid = $.cookie('yafi-uuid');

  $("#vote").click(function(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue = false;
    }
    
    if($("#selected-topic").val() == ""){
      $("#section-vote h4").text("You have to vote first!");
      return false;
    }else{
      var form = $("#vote-topic").serialize();
      var ballot = $("#ballot").val()
      $.ajax({
        url: "http://ask.newspring.cc/api/ballots/"+ballot,
        type: "PUT",
        dataType: "json",
        data: form
      }).success(function(data, textStatus, jqXHR){
        window.location.href = "success"  
      }).error(function(jqXHR, textStatus, errorThrown){
        var error = $.parseJSON(jqXHR.responseText);
        $("#section-vote h4").text(error.errors);
        return false;
      });
    }
  });
  console.log (uuid);
  $.ajax({
    url: 'http://ask.newspring.cc/api/ballots', 
    dataType: 'json',
    data: {'uuid':uuid}, 
    success: function(data){
      if(!uuid){
          $("#uuid").val(data.uuid);
          $.cookie('yafi-uuid', data.uuid , { expires: 1 });
      }else{
          $("#uuid").val(uuid);
      }

      $("#ballot").val(data.id);
      
      var topics = [];
      $.each(data.topics, function(key, val){
        topics.push('<li class="question" id="'+val.id+'"><span>'+val.topic+'</span></li>');
      });

      $("#topics").append(topics.join(''));
      
      $("#21").append("<p>WHAT happens when I don\'t agree with what\'s taught from stage? WHY don\'t we do altar calls? Why don\'t we require people to complete seminary? WHO will do my funeral? HOW should I respond to people when they ask about my church? WHY do we do modern songs? WHY can\'t unmarried couples who live together join the church?</p>").addClass('special');

      $(".question").on('click', function(){
        $(this).toggleClass('selected');
        $(this).siblings().removeClass('selected');
        $("#selected-topic").val($(this).attr('id'));
      });
    },
    error: function(error){
      $("#section-vote h4").html("You've voted too many times today. <br>Please come back tomorrow");
      $("#vote-topic").remove();
    }
  });
});


