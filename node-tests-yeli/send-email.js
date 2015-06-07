// You'll need a single TembooSession object in your code, eg:


var http = require('http');
var url = require('url');
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("yelly", "myFirstApp", "fb0516146cf34e6691dc7cdc999c35de");

var Google = require("temboo/Library/Google/OAuth");
var googleAuthorization;
var googleCallback;
var googleAccessToken;

var googleRefreshToken = "1/2jsrGJBz2MA3ExkI1u6cyBuhQeobzrqoOGDqe56z_To";
var emailFrom = "oa495@nyu.edu";
var emailTo = "omayeli@nyu.edu";
var messageBody= "Hi what's up";
var subject = "Hey";

var server = http.createServer(function(request, response) {

	var path = url.parse(request.url).pathname;
    response.writeHeader(200, {"Content-Type": "text/html"}); 

    if (path == '/login') {

		var initializeOAuthChoreo = new Google.InitializeOAuth(session);

		// Instantiate and populate the input set for the choreo
		var initializeOAuthInputs = initializeOAuthChoreo.newInputSet();

		// Set inputs
		initializeOAuthInputs.set_ClientID("125650164826-jfcls91s5i7ta1et789r9bvq05lrfatj.apps.googleusercontent.com");
		initializeOAuthInputs.set_Scope("https://www.googleapis.com/auth/gmail.compose  https://mail.google.com/");

		// Run the choreo, specifying success and error callback handlers
		initializeOAuthChoreo.execute(
		    initializeOAuthInputs,
		    function(results){
		    	console.log(results.get_AuthorizationURL());
		    	googleAuthorization = results.get_AuthorizationURL();
		    	googleCallback = results.get_CallbackID();
		    	console.log('Heading to %s.', googleAuthorization);
                response.writeHead(302, {'Location': googleAuthorization});
                response.end();
		    },
		    function(error){console.log(error.type); console.log(error.message);}
		);

		// You'll need a single TembooSession object in your code, eg:
		// var tsession = require("temboo/core/temboosession");
		// var session = new tsession.TembooSession("yelly", "myFirstApp", "fb0516146cf34e6691dc7cdc999c35de");
	} else if (path == '/finalize') {
		var finalizeOAuthChoreo = new Google.FinalizeOAuth(session);

		// Instantiate and populate the input set for the choreo
		var finalizeOAuthInputs = finalizeOAuthChoreo.newInputSet();

		// Set inputs
		finalizeOAuthInputs.set_CallbackID(googleCallback);
		finalizeOAuthInputs.set_ClientSecret("_OdZU2sJHCeZBTOj1bQVvnJL");
		finalizeOAuthInputs.set_ClientID("125650164826-jfcls91s5i7ta1et789r9bvq05lrfatj.apps.googleusercontent.com");

		// Run the choreo, specifying success and error callback handlers
		finalizeOAuthChoreo.execute(
		    finalizeOAuthInputs,
		    function(results){
		    	console.log(results.get_AccessToken());
		    	googleAccessToken = results.get_AccessToken();

		    	var Google = require("temboo/Library/Google/Gmailv2/Messages");
		    	var sendMessageChoreo = new Google.SendMessage(session);

				// Instantiate and populate the input set for the choreo
				var sendMessageInputs = sendMessageChoreo.newInputSet();

				// Set inputs
				sendMessageInputs.set_ClientSecret("_OdZU2sJHCeZBTOj1bQVvnJL");
				sendMessageInputs.set_MessageBody(messageBody);
				sendMessageInputs.set_AccessToken(googleAccessToken);
				sendMessageInputs.set_Subject(subject);
				sendMessageInputs.set_To(emailTo);
				sendMessageInputs.set_RefreshToken(googleRefreshToken);
				sendMessageInputs.set_From(emailFrom);
				sendMessageInputs.set_ClientID("125650164826-jfcls91s5i7ta1et789r9bvq05lrfatj.apps.googleusercontent.com");

				// Run the choreo, specifying success and error callback handlers
				sendMessageChoreo.execute(
				    sendMessageInputs,
				    function(results){
				    	//console.log(results.get_Response());
				    	response.end(results.get_Response());
				    },
				    function(error){console.log(error.type); console.log(error.message);}
				);
			},

			function(error) {
                // On failure, give some hints as the where the problem lies.
                console.log('Error during finalization.');
                console.log(error.type); 
                console.log(error.message);
                response.end('Something bad happend. See log for info.');
             });

             } else {
                    response.end('Log in with <a href="login">Google</a>.<br />');
                }
            });

            server.listen(4567);