/*!
 * Let Em Know Campus Select
 * Author: Drew Delianides
 * Further changes: @delianides
 * Licensed under the MIT license
 */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.;



$(document).ready(function() {

				$('.jp-audio').each(function() {
                //console.log($(this));
								var thisid = $(this).attr('rel');
								var parent = $(this).parent();
								var mp3 = $(this).parent().find('a.jp-play').attr('href');
                
								$("#" + thisid).jPlayer({
												ready: function(event) {
																$(this).jPlayer("setMedia", {
																				mp3: mp3
																});
												},
												play: function() {
																$(this).jPlayer('pauseOthers');
												},
												swfPath: "http://newspring.cc//images.newspring.cc/uploads",
												supplied: "mp3",
												solution: "html, flash",
												wmode: "window",
                        //errorAlerts: true,
                       	//warningAlerts: true,
												cssSelectorAncestor: "#" + $(this).attr('id')
								});

                $.jPlayer.timeFormat.showHour = true;
                $.jPlayer.timeFormat.sepHour = ":";
								$.jPlayer.timeFormat.sepMin = ":";
                

                //$(this).parent().find('.jp-current-time').hide();
				});
});
