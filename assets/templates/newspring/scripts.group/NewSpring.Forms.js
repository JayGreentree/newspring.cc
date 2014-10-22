if (typeof(NewSpring) == 'undefined') NewSpring = {};

NewSpring.Forms = function()
{
	var that = this;
	
	this.init = function(args)
	{
		this.sel = args.selector;
		this.has_errors = false;
		this.validate = (typeof(args.validate) == 'undefined');
		this.replace_submit = (typeof(args.replace_submit) == 'undefined');
	};
	
	this.handleStyling = function()
	{
		var input = $(this);
		
		// Add/Remove 'filled' class on text inputs and textareas.
		// Remove 'error' class from the same.
		if (input.val() != '') {
			input.addClass('filled');
			input.removeClass('error');
		}
		else if (input.hasClass('filled'))
			input.removeClass('filled');
		
		// Remove 'error' class from grouped input (e.g., radio inputs) labels.
		if (input.hasClass('error')) {
			$('input[name='+$('#'+input.attr('for')).attr('name')+']').each(function()
			{
				$('label[for='+input.attr('id')+']').removeClass('error');
			});
		}
	};
	
	this.validateTheForm = function()
	{
		var required = $(this.sel+' .required');
		var required_text = required.filter('input:text, textarea');
		var required_inputs = required.filter('input:radio, input:checkbox');
		
		// Add error class to required text inputs and textareas that are empty.
		required_text.each(function()
		{
			var input = $(this);
			
			if (input.val() == '') {
				that.has_errors = true;
				input.addClass('error');
			}
			else { that.has_errors = false; }
		});
		
		// Add error class to required radio/checkbox labels that are unchecked.
		required_inputs.each(function()
		{
			var group_value = $('input[name='+$(this).attr('name')+']:checked').val();
			
			if (typeof(group_value) == 'undefined') {
				that.has_errors = true;
				$('label[for='+$(this).attr('id')+']').addClass('error');
			}
			else { that.has_errors = false; }
		});
	};
	
	this.replaceSubmit = function()
	{
		var submit = $(this.sel+' :submit');
		var submit_id = (submit.val()).toLowerCase().replace(/\s/g, '_');
		
		// Build the button
		var p = $('<p class="button clearfix"></p>');
		var a = $('<a href="#'+ submit_id +'" id="'+ submit_id +'">'+ submit.val() +'</a>');
		p.append(a);
		
		// Hide the submit and append the new button
		submit.parent().hide();
		$(this.sel).append(p);
	};
	
	this.showErrorMessage = function()
	{
		// Show the error message unless it already exists.
		if ($('#error_message').length == 0) {
			var p = $('<p id="error_message">Please correct all of the following errors in <strong>red</strong>. These fields are required.</p>');

			$(this.sel).prepend(p);
		}
	};
	
	this.send = function()
	{
		if (this.validate)
			this.validateTheForm();

		// Go to the beginning and show the error message
		if (this.has_errors) {
			window.scrollTo(0,0);
			this.showErrorMessage();
		}
		
		// Otherwise, All is well. Submit the form.
		else {
			// The jQuery submit() method isn't working. I'm sure it's my fault,
			// but I don't know what I'm doing wrong: $(this.sel).submit();
			// The old school method works, though.
			document.getElementById(this.sel.slice(1)).submit.click();
		}
	};
	
	this.start = function()
	{
		if (this.replace_submit)
			this.replaceSubmit();
		
		// Style inputs and labels appropriately.
		$(this.sel+' :text').blur(this.handleStyling);
		$(this.sel+' textarea').blur(this.handleStyling);
		$(this.sel+' label').click(this.handleStyling);
		
		// Try submitting the form.
		$(this.sel+' .button a').click(function()
		{
			that.send();
			return false;
		});
	};
};
