document.getElementById("userName").innerHTML = localStorage.getItem("user-name");
console.log(localStorage.getItem("user-name"));


var twitterDisplayed = true;
var smsDisplayed = false;
var gmailDisplayed = false;

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
});