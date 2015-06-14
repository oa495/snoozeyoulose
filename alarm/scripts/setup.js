document.getElementById("userName").innerHTML = localStorage.getItem("user-name");
console.log(localStorage.getItem("user-name"));


var twitterDisplayed = true;
var smsDisplayed = false;
var gmailDisplayed = false;
var tHandle1;
var email1;
var number1;

$(function() {
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
	$('#twitter-submit').click(function() {
		tHandle1 = $("#twitterHandle1").val();
		console.log(tHandle1);
		localStorage.setItem("twitter1", tHandle1);
		event.preventDefault();
	});
	$('#gmail-submit').click(function() {
		event.preventDefault();
		email1 = $("#emailTo1").val();
		console.log(email1);
		localStorage.setItem("email1", email1);
		event.preventDefault();
	});
	$('#sms-submit').click(function() {
		number1 = $("#number1").val();
		console.log(number1);
		localStorage.setItem("number1", number1);
		event.preventDefault();
	});
});





/*function validateForm(e) {
	if (e == twitter) {
		var twitterHandles = twitterForm; //get children of input[text]
		for (var i; i < twitterHandles.length; i++) {
			if (twitterHandles[i].value == null || twitterHandles[i].value == '') {
				twitterHandles[i].className = "incomplete";
			}
			 else if (twitterHandles[i].value.indexOf('@') != 0) { // if no @ symbol
			  //  emailValid = false;
			    twitterHandles[i].className = 'incomplete';
			  //  emailLabel.textContent = "Please enter a valid email address.";
			  }
			else {
				tHandle + i = twitterHandles[i].value; //set email1 equal to value in first input box
			}
		}
	}
	else if (e == gmail) {
		var emails = gmailForm; //get children of input[text]
		for (var i; i < emails.length; i++) {
			if (emails[i].value == null || emails[i].value == '') {
				emails[i].className = "incomplete";
			}
			 else if (emails[i].value.indexOf('@') == -1) { // if no @ symbol
			  //  emailValid = false;
			    email[i].className = 'incomplete';
			  //  emailLabel.textContent = "Please enter a valid email address.";
			  }
			else {
				email + i = emails[i].value; //set email1 equal to value in first input box
			}
		}

	}
	else if (e == sms) {
		var numbers = smsForm; //get children of input[text]
		for (var i; i < numbers.length; i++) {
			if (numbers[i].value == null || numbers[i].value == '') {
				numbers[i].className = "incomplete";
			}
			else {
				number + i = numbers[i].value; //set email1 equal to value in first input box
			}
			//check if 10 digits
			//check for dashes and stuff
		}
	}
}

twitterForm.addEventListener('submit', validateForm, false);
gmailForm.addEventListener('submit', validateForm, false);
smsForm.addEventListener('submit', validateForm, false); 
*/