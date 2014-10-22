if (typeof(NewSpring) == 'undefined') NewSpring = {};

NewSpring.Song = function()
{
	this.init = function(args)
	{
		this.title = args.title;
		this.src = args.src;
		this.time = args.time;
	};
};
