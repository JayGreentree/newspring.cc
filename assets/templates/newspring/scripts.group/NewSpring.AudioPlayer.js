if (typeof(NewSpring) == 'undefined') NewSpring = {};

NewSpring.AudioPlayer = function()
{
	var that = this;
	
	this.init = function(args)
	{
		this.selector = args.selector;
		this.color = (typeof(args.color) == 'undefined') ? 'white' : args.color;
		this.song = {
			title: args.song.title,
			src: args.song.src,
			time: args.song.time
		};
		this.time = this._time = this.song.time;
		this.elapsed = 0;
		this.playing = false;
		this.face = {
			image_play: args.play,
			image_stop: args.stop,
			image_pause: args.pause,
			playimg: null,
			player: null
		};
	};
	
	this.build = function() {
		var p = document.createElement('p');
		var a = document.createElement('a');
		var span_pb = document.createElement('span');
		var span_te = document.createElement('span');
		var span_tt = document.createElement('span');
		var img = document.createElement('img');
		var url = this.song.src;
		
		p.className = 'player ' + this.color;
		p.id = this.song.title.toLowerCase().replace(/ /g,'_');
		
		a.href = this.song.src;
		a.title = this.song.title;
		
		span_pb.className = 'progress_bar';
		span_te.className = 'time_elapsed';
		span_tt.className = 'time_total';
		span_tt.innerHTML = this.createDisplayTime(this.time);
		span_te.innerHTML = this.createDisplayTime(this.elapsed);
		
		img.src = this.face.image_play; 
		img.title = this.song.title;
		img.height = img.width = 16;
		img.style.border = 'none';
		img.style.cursor = 'pointer';
		img.onclick = function()
		{
			that.togglePlay(img, url); 
			that.toggleTimer();
		};
		
		span_pb.appendChild(span_te);
		
		p.appendChild(span_tt);
		p.appendChild(span_pb);
		p.appendChild(a);
		p.appendChild(img);

		$(this.selector).append(p);
	};
	
	this.createDisplayTime = function(t)
	{
		var time = parseInt(t, 10);
		var mins = Math.floor(time/60);
		var secs = time%60;
		var pretty_mins = (mins < 10) ? "0"+mins : mins;
		var pretty_secs = (secs < 10) ? "0"+secs : secs;
		return pretty_mins+":"+pretty_secs;
	};
	
	this.updateTime = function()
	{
		this.elapsed++;
		this.time--;
		
		if (this.elapsed == this._time) {
			this.stopTimer();
			this.destroy();
		}
	};
	
	this.startTimer = function()
	{
		if (this.elapsed == this._time)
			this.stopTimer();
		else {
			this.interval = setInterval(function()
			{
				that.updateTime();
				that.updateControls();
			}, 1000);
			this.playing = true;
		}
	};
	
	this.pauseTimer = function()
	{
		clearInterval(this.interval);
		this.playing = false;
	};
	
	this.stopTimer = function()
	{
		this.pauseTimer();
		this.elapsed = 0;
		this.time = this._time;
		this.updateControls();
	};
	
	this.toggleTimer = function()
	{
		if (this.playing)
			this.stopTimer();
		else
			this.startTimer();
	};
	
	this.percentageComplete = function()
	{
		return (this.elapsed/this._time)*100;
	};
	
	this.updateControls = function()
	{
		$(this.selector + " .player .time_elapsed").html(this.createDisplayTime(this.elapsed));
		$(this.selector + " .player .time_total").html(this.createDisplayTime(this.time));
		$(this.selector + " .player .time_elapsed").css("width", this.percentageComplete()+"%");
	};
	
	this.togglePlay = function(img, url)
	{
		if (this.face.playimg == img) 
			this.destroy();
		else {
			if (this.face.playimg) 
				this.destroy();
			
			var a = img.nextSibling;
			img.src = this.face.image_stop;
			this.face.playimg = img;

			this.face.player = document.createElement('span');
			this.face.player.style.opacity = '0';
			this.face.player.style.filter = 'alpha(opacity=0)';
			this.face.player.style.position = 'absolute';
			this.face.player.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' +
				'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ' +
				'width="0" height="0" id="player" align="middle">' +
				'<param name="wmode" value="transparent" />' +
				'<param name="allowScriptAccess" value="sameDomain" />' +
				'<param name="flashVars" value="theLink='+url+'" />' +
				'<param name="movie" value="http://www.newspring.cc/music/media/audio/player.swf" /><param name="quality" value="high" />' +
				'<embed style="vertical-align:bottom;margin-right:0.2em" src="http://www.newspring.cc/music/media/audio/player.swf" flashVars="theLink='+url+'" '+
				'quality="high" wmode="transparent" width="0" height="0" name="player" ' +
				'align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" ' +
				'pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
			
			img.parentNode.insertBefore(this.face.player, img.nextSibling);
		}
	};

	this.destroy = function()
	{
		this.face.playimg.src = this.face.image_play;
		this.face.playimg = null;
		this.face.player.removeChild(this.face.player.firstChild);
		this.face.player.parentNode.removeChild(this.face.player);
		this.face.player = null;
	};
};
