$(document).ready(
	function(){
		if( $('.simpleCart_quantity').text() != "0") {
			$('#cart a.simpleCart_checkout').removeClass('gray');
		}

		$('h3.button a').click(
			function() {
				if( $(this).parent().parent().find('select').val() != ''){
					$('#cart a.simpleCart_checkout').addClass('bounceOutUp').removeClass('gray').removeClass('bounceOutUp').addClass('simpleCart_checkout').addClass('bounceInDown');
				} else {
					alert("Please select a size!");
					return false;
				}
			}
		);

		$('.simpleCart_empty').click(
			function() {
				$('#cart a.simpleCart_checkout').addClass('gray');
			}
		)
	}
);
