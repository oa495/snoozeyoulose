document.getElementById("userName").innerHTML = localStorage.getItem("user-name");
console.log(localStorage.getItem("user-name"));
var twitterDisplayed = true;
var smsDisplayed = false;
var gmailDisplayed = false;

$(function() {
	$('#twitter').click(function () {
		if (twitterDisplayed == false) {
			twitterDisplayed = true;
			gmailDisplayed = false;
			smsDisplayed = false;
		}
	});
	$('#gmail').click(function () {
		if (gmailDisplayed == false) {
			gmailDisplayed = true;
			twitterDisplayed = false;
			smsDisplayed = false;
		}
	});

	$('#text').click(function () {
		if (smsDisplayed == false) {
			twitterDisplayed = false;
			gmailDisplayed = false;
			smsDisplayed = true;

		}
	});
});