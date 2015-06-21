document.getElementById("userName").innerHTML = localStorage.getItem("user-name");
console.log(localStorage.getItem("user-name"));
var twitterDisplayed = true;
var smsDisplayed = false;
var gmailDisplayed = false;
var tHandle1;
var email1;
var number1;
var twitterComplete = false;
var smsComplete = false;
var gmailComplete = false;
var alarmStopped = false;
var number1Valid, email1Valid, twitter1Valid;
var alarmSet = false;

window.onbeforeunload = function(e) {
	 return 'Are you sure you want to refresh? All your information will be lost.';
};


$(function() {
	   var username;
      
      var username, UIState = {};
      
      UIState.authenticated = function() {
        $('#login-form').addClass('hidden');
        $('#logged-in').removeClass('hidden');
        $('.username').text(username);
      };
      
      UIState.unauthenticated = function() {
        $('#login-form').removeClass('hidden');
        $('#logged-in').addClass('hidden');
        $('.username').text('');
      };
      
      UIState.initial = function() {
        console.log('initial');
      
        $audioRingIn[0].pause();
        $audioRingOut[0].pause();

      };    
        $('#call-form p, #incoming-call p, #call-connected p').text('');
        $('#incoming-call, #call-connected, .call-terminator, #resume-call-btn').addClass('hidden');
        $('#call-form, .call-initializer').removeClass('hidden')

    var userArray = [];
	$('#twitter').click(function () {
		if (twitterDisplayed == false) {
			$('#twitter-add').show();
			$('#sms-add').hide();
			$('#gmail-add').hide();
			console.log("twitter");
			twitterDisplayed = true;
			gmailDisplayed = false;
			smsDisplayed = false;
		}
	});
	$('#gmail').click(function () {
		if (gmailDisplayed == false) {
			console.log("gmail");
			$('#gmail-add').show();
			$('#twitter-add').hide();
			$('#sms-add').hide();
			gmailDisplayed = true;
			twitterDisplayed = false;
			smsDisplayed = false;
		}
	});

	$('#text').click(function () {
		if (smsDisplayed == false) {
			console.log("text");
			$('#sms-add').show();
			$('#twitter-add').hide();
			$('#gmail-add').hide();
			twitterDisplayed = false;
			gmailDisplayed = false;
			smsDisplayed = true;
		}
	});


	var maxCharacters = 130;
	var characters = $('#tweet').val().length;
	var twitterHandle = $('#twitterHandle1').val().length;
	var total = characters + twitterHandle;
	var overCharacters = false;
	$('#count').text(maxCharacters - total);

	$('#tweet, #twitterHandle1').bind('keyup keydown', function() {
		var count = $('#count');
		characters = $('#tweet').val().length;
		twitterHandle = $('#twitterHandle1').val().length;
		total = characters + twitterHandle;
		if (total > maxCharacters) {
		    count.addClass('over');
		    overCharacters = true;
		} else {
		    count.removeClass('over');
		}
		count.text(maxCharacters - total);
	});


	$('#twitter-submit').click(function() {
		event.preventDefault();
		tHandle1 = $("#twitterHandle1").val();
		if (tHandle1 == null || tHandle1 == '' || tHandle1 == "@twitterhandle1") {
			//console.log("twitter wrong");
			twitter1Valid = false;
			$('#twitterHandle1').attr('class', 'incomplete');
		}
		else if (tHandle1.indexOf('@') != 0) {
			//console.log("twitter wrong 1");
			twitter1Valid = false;
		    $('#twitterHandle1').attr('class', 'incomplete');
		    tHandle1.textContent = "Remember to put the @ sign.";
		}
		else {
			if (!overCharacters) {
				//console.log("twitter true");
				 $('#twitterHandle1').attr('class', 'complete');
				localStorage.setItem("twitter1", tHandle1);
				$("#twitter-submit").html("Thanks!");
				twitterComplete = true;
			}
		}
	});

	$('#gmail-submit').click(function() {
		event.preventDefault();
		email1 = $("#emailTo1").val();
		//console.log(email1);
		 if (email1 == null || email1 == '' || email1 == "email@email.com") {
		 	//console.log("gmail wrong1");
		    email1Valid = false;
		     $('#emailTo1').attr('class', 'incomplete');
		  } else if (email1.indexOf('@') == -1) { // if no @ symbol
		  	//console.log("gmail wrong");
		    email1Valid = false;
		     $('#emailTo1').attr('class', 'incomplete');
		    email1.textContent = "Please enter a valid email address.";
		  } else {
		  //	console.log("gmail true");
		    emailValid = true;
		    $('#emailTo1').attr('class', 'complete');
		    localStorage.setItem("email1", email1);
			$("#gmail-submit").html("Thanks!");
			gmailComplete = true;
		  }
	});

	$('#sms-submit').click(function() {
		event.preventDefault();
		username = 'user1@snoozeyoulose.gmail.com'
        var apiKey = 'DAK02c0a220842d4a4ea87824de0474cd0f'
        var password = '1voluptasaliquame1'
      
        /** login(domainApiId, userName, password,success,failure)
            logs in user to Kandy Platform
            @params <string> domainApiId, <string> userName, <string> password, <function> success/failure
        */
        kandy.login(apiKey, username, password,function(msg){
      
               userArray.push(username);
               kandy.getLastSeen(userArray);
               UIState.authenticated();
           },	
           function(msg){
               UIState.unauthenticated();
               alert('Login Failed!');
           });
        number1 = $("#number1").val();

        if (number1 == null || number1 == '' || number1 == "19100000000") {
        	//console.log("wrong 1");
        	number1Valid = false;
        	$("#number1").attr('class', 'incomplete');
        }
        else if (number1.substring(0, 1) != 1 || number1.length !== 11) {
        	//console.log("wrong 2");
        	number1Valid = false;
        	$("#number1").attr('class', 'incomplete');
        }
        else {
        	//console.log("right");
        	localStorage.setItem("number1", number1);
        	$("#sms-submit").html("Thanks!");
        	$("#number1").attr('class', 'complete');
			smsComplete = true;
        }
		//console.log(number1);
	});

	function complete() {
		if ((smsComplete) && (gmailComplete) && (twitterComplete)) {
			//console.log("everything!");
			clearInterval(ifDone);
			$(".connect").fadeOut("slow", function() {
				 if ($("#clock").css('display') == 'none') {
   			 		 $('#clock').fadeIn("slow");
   				 }
			});
		}
	}

	var ifDone = setInterval(complete, 1000); 
});

$(function() {
	var timeUp = false;
	var clock = $('#clock');
	var alarm = clock.find('.alarm');
	var ampm = clock.find('.ampm');
	var timeIsUp = $('#time-is-up').parent();

	var digitToName = 'zero, one, two, three, four, five, six, seven, eight, nine'.split(',');
	var digits = {};
	var positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];
	var h1, h2, m1, m2;
	var zone;
	var year;
	var month;
	var day;
	var timeNow;
	var indicatedTime;
	var sh1, sh2, sm1, sm2;

	var digit_holder = clock.find('.digits');

	$.each(positions, function() {

		if (this == ':') {
			digit_holder.append('<div class="dots">')
		}
		else {
			var pos = $('<div>');

			for(var i=1; i<8; i++){
				pos.append('<span class="d' + i + '">');
			}
			digits[this] = pos;
			//console.log(pos);

			// Add the digit elements to the page
			digit_holder.append(pos);
		}

	});

	var weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' '),
	weekday_holder = clock.find('.weekdays');

	$.each(weekday_names, function(){
		weekday_holder.append('<span>' + this + '</span>');
	});

	var weekdays = clock.find('.weekdays span');

	(function update_time(){

		var now = moment().format("hhmmssdA");
		h1 = now[0];
		h2 = now[1];
		m1 = now[2];
		m2 = now[3];
		zone = now[7]+now[8];

		timeNow = h1+h2+":"+m1+m2+ " "+zone;
		timeNow = timeNow.toLowerCase();
		//console.log(timeNow);
		digits.h1.attr('class', digitToName[now[0]]);
		digits.h2.attr('class', digitToName[now[1]]);
		digits.m1.attr('class', digitToName[now[2]]);
		digits.m2.attr('class', digitToName[now[3]]);
		digits.s1.attr('class', digitToName[now[4]]);
		digits.s2.attr('class', digitToName[now[5]]);

		// The library returns Sunday as the first day of the week.
		// Stupid, I know. Lets shift all the days one position down, 
		// and make Sunday last

		var dow = now[6];
		dow--;
		
		// Sunday!
		if(dow < 0){
			// Make it last
			dow = 6;
		}

		// Mark the active day of the week
		weekdays.removeClass('active').eq(dow).addClass('active');

		// Set the am/pm text:
		ampm.text(now[7]+now[8]);

		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();

	//combodate

	$(function(){
   		 $('#time').combodate({
   	     firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
       	 minuteStep: 1,
       	 customClass: 'choose-time'
   		 });  
	});

	$('#setTime').click(function () {
		alarmSet = true;
   		indicatedTime = $('#time').combodate('getValue');
   		indicatedTime = "0" + indicatedTime;
   		//console.log(indicatedTime);
   		$('.setup').fadeOut( "slow", function() {
   			if ($('.connect').css('display') == 'none') {
   				$('.connect').fadeIn("slow");
   				//console.log("set time submit");
   			}
   		});
	});

	function reset() {
		alarmSet = false;
		timeUp = false;
		timeIsUp.fadeOut();
   		$('#clock').fadeOut("slow", function() {
   			$('.setup').fadeIn("slow");
   		});
   		twitterDisplayed = true;
		smsDisplayed = false;
		gmailDisplayed = false;
		twitterComplete = false;
		smsComplete = false;
		gmailComplete = false;
		alarmStopped = false;
		number1Valid = false;
		email1Valid = false;
		twitter1Valid = false;
		$("#twitter-submit").html("Submit");
		$("#sms-submit").html("Submit");
		$("#gmail-submit").html("Submit");
		$("#twitterHandle1").val('@twitterhandle1');
		$("#emailTo1").val('email@email.com');
		$("#number1").val('19100000000');
	}
	function check_time(){
		if (timeNow === indicatedTime) {
			//console.log("yay!");
			clearInterval(alarmTime);
			timeIsUp.fadeIn();
      	 	$('#alarm-ring')[0].play();
      	 	setTimeout(sendMessages, 2000);
      	 	//change to 60s 
      	 	//console.log("played!");
		}	
	};

	function sendMessages() {
		$("#end-alarm").click(function(){
			//console.log("ended");
			timeIsUp.fadeOut();
			alarmStopped = true;
		});

		if (alarmStopped != true) {
			setTimeout(function() {
			  alert("sent!");
			  //console.log("you're screwed");
			  var sender = localStorage.getItem("user-name");
			 // console.log(number1);
			 // console.log(sender);
	          var receiver = number1;
	          var message = "hey sup";
	      

	      	//kandy.messaging.sendSMS(number (string), sender(object), text (string), success, failure) : Void

	      	//FOR RECEIVER, PUT COUNTRY CODE FIRST, NO NON-NUMERIC CHARACTERS
	          kandy.messaging.sendSMS(
	            receiver,
	            sender,
	            message,
	            function() {
	              alert('sms sent');
	            },
	            function(message, status) {
	              alert(message + status + ' message not sent!');
	            }
	          );
			}, 600000);
		}

		reset();
	}
	var alarmTime = setInterval(check_time, 1000); 

});
