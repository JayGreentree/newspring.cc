/* ==========================================================================
   NewSpring Staff Scripts - $UTILTIES
   ========================================================================== */
//convert time to EST
function convertToServerTimeZone(dateToSet) {

    var year = dateToSet.getUTCFullYear()
    var month = dateToSet.getUTCMonth()
    var days = dateToSet.getUTCDate()
    var hours = dateToSet.getUTCHours()
    var minutes = dateToSet.getUTCMinutes()
    var seconds = dateToSet.getUTCSeconds()

    serverDate = new Date(year, month, days, hours - 5, minutes, seconds)

    return serverDate


};

//Delay action until certain date
function delayAction(delayTime, action) {

    //define variables
    var rightNow = convertToServerTimeZone(new Date()),
        timeoutDelay = delayTime - rightNow;
    // console.log(delayTime)
    //set delay for function
    var timeCheck = setTimeout(function() {
        action()
    }, timeoutDelay)

}

//start visible countdown on screen
function startCountdown(target_date, target, aftertext) {
    // set the date we're counting down to

    // variables for time units
    var days, hours, minutes, seconds,
        // get tag element
        countdown = target;

    // update the tag with id "countdown" every 1 second
    var countdownTimer = window.setInterval(function() {

        // find the amount of "seconds" between now and target
        var current_date = convertToServerTimeZone(new Date()),
            seconds_left = (target_date - current_date) / 1000;
        if (seconds_left >= 0) {

            // do some time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);


            //  TODO ** Write better way to format date

            // format countdown string
            if (days != 0) countdown.text(days + " days " + hours + " hours " + minutes + " minutes ");
            if (days === 0 && hours != 0) countdown.text(hours + " hours " + minutes + " minutes " + seconds + " seconds ");
            if (days === 0 && hours === 0) countdown.text(minutes + " minutes " + seconds + " seconds ");
            if (days === 0 && hours === 0 && minutes === 0) countdown.text(seconds + " seconds ");
        } else {
            clearInterval(countdownTimer)
            countdown.text(aftertext)
        }
    }, 1000);

}

//see if browser has console
if (!window.console) console = {
    log: function() {}
};

var loadPlayer = function() {
    OO.ready(function() {
        var livePlayer = OO.Player.create('ooyalaplayer', '{PUBLIC_EMBED_CODE}', {
            onCreate: function(player) {
                window.messageBus = player.mb;
                window.player = player;
                window.buffer_count = 0;
                window.fallback_bitrate = '';
                window.debug = false;
                window.pause = false;
            }
        });

        window.messageBus.subscribe("*", "all", function(eventName, payload) {
            // if (window.debug == true) console.log("EVENT: " + eventName, payload);
        });

        window.messageBus.subscribe(OO.EVENTS.PAUSED, "paused", function(eventName, payload) {
            window.pause = true;
        });

        window.messageBus.subscribe(OO.EVENTS.PLAYING, "playing", function(eventName, payload) {
            window.pause = false;
        });

        window.messageBus.subscribe(OO.EVENTS.BUFFERING, 'buffering', function(event) {
            if (window.pause == false) {
                _gaq.push(['_trackEvent', 'Ooyala Live', 'Buffering', 'Number of Buffers', 1]);
            }
        });

        window.messageBus.subscribe(OO.EVENTS.ERROR, 'error', function(error, data) {
            _gaq.push(['_trackEvent', 'Ooyala Live', 'Error', data, 1]);
        });

    });
}

/* ==========================================================================
   NewSpring Staff Scripts - $NEXTSERVICE
   ========================================================================== */

//TODO ** turn into plug-in

var regularServices = function(target, startAction, endAction) {

    var nextService = convertToServerTimeZone(new Date()),
        daytoset = 0,
        currentDay = nextService.getDay(),
        $target = target,
        //stored as integers grouped by two for ease of use with javascripts native Date proto
        serviceTimes = [8, 20, 9, 50, 11, 20, 16, 50, 18, 20];





    if (currentDay != 0) {
        distance = daytoset - currentDay + 7

        //set Day to next sunday
        nextService.setDate(nextService.getDate() + distance);

        //set Hours to first service
        nextService.setHours(serviceTimes[0], serviceTimes[1], 00)
        //console.log(nextService)
        startCountdown(nextService, $target, 'LIVE')
        delayAction(nextService, startAction)
    } else {

        //Set first service time in date format
        var currentService = new Date(nextService),
            count = 0;

        var checkTimes = function() {

            if (count < serviceTimes.length) {

                //set to next (or current) service
                currentService.setHours(serviceTimes[count], serviceTimes[count + 1], 00);

                //set to end of service
                endofService = new Date(currentService);
                endofService.setHours(endofService.getHours() + 1);
                endofService.setMinutes(endofService.getMinutes() + 25);
                //console.log(currentService, endofService)
                //check for service
                if (nextService < endofService) {
                    startCountdown(currentService, $target, 'LIVE')
                    delayAction(currentService, startAction);
                    delayAction(endofService, endAction)
                }

                //if service passed, move to next one
                else {
                    count++;
                    count++;
                    checkTimes();
                }
            } else {
                distance = daytoset - currentDay + 7

                //set Day to next sunday
                nextService.setDate(nextService.getDate() + distance);

                //set Hours to first service
                nextService.setHours(serviceTimes[0], serviceTimes[1], 00)

                startCountdown(nextService, $target, 'LIVE')
                delayAction(nextService, startAction)
            }

        }

        checkTimes()

    }
};

var specialServices = function(target, startAction, endAction) {
    $target = target;
    var rightNow = convertToServerTimeZone(new Date())
    var currentService = new Date("{LIVE_PAGE_OVERRIDE}");

    //set to end of service
    endofService = new Date(currentService);
    endofService.setHours(endofService.getHours() + 1);
    endofService.setMinutes(endofService.getMinutes() + 25);


    if (rightNow > endofService) {
        endAction();
    } else {

        startCountdown(currentService, $target, 'LIVE')
        delayAction(currentService, startAction);
        delayAction(endofService, endAction)
    }


};

var startAction = function() {

    $('#livelog, #overlay').show();

    // Set the overlay's width and height for IE 6
    if ($.browser.msie && $.browser.version === '6.0') {
        var $window = $(window);

        $('#overlay').css({
            height: $window.height() + 'px',
            width: $window.width() + 'px'
        });

        $('#livelog').fadeIn();
    }
    $('#not_live').hide()
    $('#live, #live_banner').show()
    loadPlayer()

}

var endAction = function() {
    regularServices($('#countdown'), startAction, endAction)

    $('#not_live').show()
    $('#live, #live_banner').hide()
}


$(document).ready(function() {

    // temporary overwrite! 
    $('#countdown').on('click', startAction);

    //check user agent
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf('android') > -1;

    if (isAndroid) {
        window.location.href = "http://ooyalahd2-f.akamaihd.net/i/newspring02_delivery@120045/master.m3u8";
    }

    if ("{LIVE_PAGE_OVERRIDE}" === 'off') {
        regularServices($('#countdown'), startAction, endAction);
    }
    if ("{LIVE_PAGE_OVERRIDE}" !== 'off') {
        specialServices($('#countdown'), startAction, endAction);
    }

    // Do nothing if it's a Playsation
    if ((navigator.appVersion.indexOf('PLAYSTATION') === -1)) {

        // $('#video').hide();
        // $('#livelog, #overlay').show();

        // // Set the overlay's width and height for IE 6
        // if ($.browser.msie && $.browser.version === '6.0') {
        //     var $window = $(window);

        //     $('#overlay').css({
        //         height: $window.height() + 'px',
        //         width: $window.width() + 'px'
        //     });

        //     $('#livelog').fadeIn();
        // }

        // set up some dictionaries -------------------------------------------------
        // default form values
        var default_inputs = {
            location: 'Zip Code or City and State',
            quantity: '1'
        };

        // ajax params
        var ajax = {
            url: '/?ACT=116',
            pre_load_text: $('a#go').text(),
            loading_text: 'Submitting…'
        };

        // login messages
        var messages = {
            login_welcome: $('form#livelog p.welcome').val(),
            login_error: '<strong>It looks like there was a problem.</strong> Please correct the following <span>errors in red</span> to proceed.',
            default_welcome: '<strong>Hello!</strong> We\'re glad you joined us for church online today.',
            skip_welcome: 'We\'re glad you joined us for church online today.'
        };

        // preload login form images, everyone hates pop-ins
        var images = new Array('bottom_bg.png', 'close.png', 'error.png', 'form_bg.png', 'go.png', 'loading.gif');
        for (var i = 0; i < images.length; ++i) {
            var image = new Image();
            image.src = '//images.newspring.cc/site/live/log/' + images[i];
        }

        // manage form inputs -------------------------------------------------------
        // sets default values and colors
        function resetForm() {
            $('form#livelog input').each(function() {
                $(this).val(default_inputs[$(this).attr('name')]);
                $(this).removeClass('focused error');
            });
        };

        //resetForm();
        // clear out the inputs on focus
        $('form#livelog input').each(function() {
            $(this).focus(function() {
                // give input a darker color
                $(this).removeClass('error');
                $(this).addClass('focused');

                // clear it only when it's the default
                if ($(this).val() == default_inputs[$(this).attr('name')]) $(this).val('');
            });
        });

        // re-fill or leave alone on blur
        $('form#livelog input').each(function() {
            $(this).blur(function() {

                // if empty, refill with default and reset color
                if ($(this).val() == '') {
                    $(this).val(default_inputs[$(this).attr('name')]);
                    $(this).removeClass('focused');
                }
            });
        });

        // form submission ----------------------------------------------------------
        // submit form on enter
        $('form#livelog input').keyup(function(event) {
            if (event.keyCode == 13) beginAjax();
        });

        // submit form on GO
        $('#go').click(function(e) {
            e.preventDefault();
            beginAjax();
        });

        if (Modernizr.touch == true) {
            //Still want to count one.
            beginAjax();
        }


        // error overlay ------------------------------------------------------------
        function toggleConnectionError() {
            var error = $('#error');
            var form = $('form#livelog');

            if (error.css('display') == 'block') {
                error.fadeOut('fast');
                form.fadeTo('fast', 1);
            } else {
                form.fadeTo('fast', 0.1);
                error.fadeIn('fast');
            }

            return false; // don't clutter the url
        }

        $('#close').click(toggleConnectionError);

        function showFormErrors(data) {
            // change the welcome message to an error message
            $('form#livelog p.welcome').html(messages.login_error).addClass('error');

            // highlight the errors
            $(data.errors).each(function() {
                $('#' + this).addClass('error');
            });
        }

        function showWelcomeMessage() {
            fadeEverything();
        }

        // the ajax goodness --------------------------------------------------------
        function beginAjax() {
            $.ajax({
                type: "GET",
                url: ajax.url,
                data: $('#livelog').serialize(),
                success: function(data) {
                    var num_of_people = parseInt($('#quantity').val());
                    _gaq.push(['_trackEvent', 'Watch Live', 'Play', 'People Watching the Live Service', num_of_people]);
                    fadeEverything();
                },
                error: function(jqXHR, textStatus, error) {
                    fadeEverything();
                }
            });
        }

        // overlay and form fade in/out ---------------------------------------------
        function fadeEverything() {
            // hide the form, overlay, and chat button
            $('form#livelog').fadeOut('fast');
            $('#overlay').fadeOut('fast');

            $('#video').fadeIn();
        }

        function registerSkip() {
            $.getJSON(ajax.url, 'skip=1');
        }

        var one = 1;
        $('#overlay').click(function() {
            registerSkip();
            fadeEverything();
            _gaq.push(['_trackEvent', 'Watch Live', 'Skipped', 'Clicked the Overlay', one]);

            return false; // don't clutter the url
        });

        $('#skip').click(function() {
            registerSkip();
            fadeEverything();
            _gaq.push(['_trackEvent', 'Watch Live', 'Skipped', 'Skipped the Popup Form', one]);

            return false; // don't clutter the url
        });

    }

    // if (typeof OO != 'undefined') {


    // }
});
