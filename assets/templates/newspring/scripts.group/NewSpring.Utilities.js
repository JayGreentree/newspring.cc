if (typeof(NewSpring) == "undefined") NewSpring = {};

NewSpring.Utilities = function()
{
	// Toggles the value of a text input on click and blur.
	// --------------------------------------------------------------------------
	// Required arguments: 
	//   selector (valid jQuery selector)
	//   text (the text to be toggled)
	// Optional argument:
	//   onload (true|false)
	//
	this.toggleInputText = function(args)
	{
		var sel = args.selector;
		var txt = args.text;
		var replace_onload = (typeof(args.onload) != undefined) ? args.onload : false;
		
		if (replace_onload)
			$(sel).val(txt);

		$(sel).bind('focus blur', function()
		{
			var $this = $(this);
			
			if ($this.val() == txt)
				$this.val('');

			else if ($this.val() == '')
				$this.val(txt);
		});
	};

	// A collection of fixes for our beloved friend.
	// --------------------------------------------------------------------------
	//
	this.fixIE6 = function()
	{
		$('body').css('margin', '0 auto');
	};

	// Returns truncated text of specified length plus ellispis
	// --------------------------------------------------------------------------
	//
	this.truncate = function(text, length)
	{
		return text.slice(0,length)+"...";
	};
	
};
