$(function() {
	var timeUp = false;
	var clock = $('#clock');
	var alarm = clock.find('.alarm');
	var ampm = clock.find('.ampm');

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
			console.log(pos);

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



		timeNow = h1+h2+":"+m1+m2;
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

	$('.submit').click(function () {
   		indicatedTime = $('#time').combodate('getValue');
   		$('.setup').fadeOut( "slow", function() {
   			if ($('.connect').css('display') == 'none') {
   				$('.connect').fadeIn("slow");
   			}
   			/* if ($("#clock").css('display') == 'none') {
   			 	 //$('#clock').fadeIn("slow");
   			 }*/
   		});
	});

	function check_time(){
		if (timeNow === indicatedTime) {
			console.log("yay!");
			timeUp = true;
		}
		else {
			//console.log(indicatedTime);
			//console.log(timeNow);
			//console.log('here!');
		}
		if (timeUp == 'true') {
			clearTimeout(timeOut);
			//console.log("it's true!");
			time_is_up.fadeIn();
		try {
      	  $('#alarm-ring')[0].play();
   		 }
   		 catch(e){}
		}
	};

	setInterval(check_time, 1000); 

});

