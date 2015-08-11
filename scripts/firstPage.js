var userName;
var user = document.getElementById('userName');
var snoozeText = $('#snooze').offset();
var nameForm = document.querySelector('form');
var topPos;
var leftPos;
var topEnd;
var leftEnd;

$(document).ready(function() {
  	$("#down").click(function() {
  		  $('html, body').animate({
      		  scrollTop: $("#about").offset().top
    		}, 2000);
	});
	$(".aboutsection-open").click(function() {
		$(".explain").fadeIn("slow");
	});
	$("#cancel").click(function() {
		$(".explain").fadeOut("slow");
	});
});
function snore() {
	var daZzz = document.createElement('span');

	daZzz.innerText = "z";
	daZzz.setAttribute('class', 'z');

	topPos = snoozeText.top + 10;
	leftPos = snoozeText.left + 350;
	topEnd = topPos - 150;
	leftEnd = leftPos + Math.round(Math.random()*80);

	$(daZzz).css({
		"top": topPos,
		"left": leftPos
	});
	$('main').append(daZzz);

	$(daZzz).animate({
		"top": topEnd,
		"left": leftEnd,
		"font-size": "60px",
		"opacity": 0
	}, 5000,  function() { //Function
      $(this).remove(); //Remove
  });

}
function validateForm(e) {
  var nameField = document.getElementById('name');
  userName = nameField.value;
  if (nameField.value == null || nameField.value == '' || nameField.value == 'Your name') {
    nameValid = false;
    nameField.className = "incomplete";
  } else {
    nameValid = true;
     storeName();
    nameField.className = "complete";
  }

  if (nameValid == false || (localStorage.getItem("user-name") == null)) {
    e.preventDefault(); // prevent form from being submitted
  }
}
function storeName() {
	if (typeof(Storage) != "undefined") {
		console.log("stored");
		console.log(userName);
    // Store
    localStorage.setItem("user-name", userName);

	} else {
	    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}


nameForm.addEventListener('submit', validateForm, false);
setInterval(snore, 1000);
snore();