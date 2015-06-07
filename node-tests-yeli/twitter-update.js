// You'll need a single TembooSession object in your code, eg:

var http = require('http');
var url = require('url');

var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("yelly", "myFirstApp", "fb0516146cf34e6691dc7cdc999c35de");

var Twitter = require("temboo/Library/Twitter/OAuth");
var callback;
var secret;
var authorization;
var accessTokenS;
var statusUpdate = "vkjfnsvsfldmdl";

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    response.writeHeader(200, {"Content-Type": "text/html"}); 

    if (path == '/login') {
        var initializeOAuthChoreo = new Twitter.InitializeOAuth(session);

        // Instantiate and populate the input set for the choreo
        var initializeOAuthInputs = initializeOAuthChoreo.newInputSet();

        // Set inputs
        initializeOAuthInputs.set_ConsumerSecret("XOJp8dCl4sYWDM9kEE4QoC6y52E9gWxKjAHJVmoIRcClFtCPmV");
        initializeOAuthInputs.set_ConsumerKey("CpdG5mmQAT4RUWUP5Brp1ZhuT");


                initializeOAuthChoreo.execute(
            initializeOAuthInputs,
            function(results) {
                authorization = results.get_AuthorizationURL();
                console.log(authorization);
                callback = results.get_CallbackID();
                secret = results.get_OAuthTokenSecret();
                console.log(secret);
                console.log(callback);
                console.log('Heading to %s.', authorization);
                response.writeHead(302, {'Location': authorization});
                response.end();
            },
            // On failure, give some hints as the where the problem lies.
            function(error) {
                console.log('Error during initialization.');
                console.log(error.type); 
                console.log(error.message);
                response.end('Something bad happend. See log for info.');
            }
        );
    } else if (path == '/finalize') {

        var finalizeOAuthChoreo = new Twitter.FinalizeOAuth(session);

        // Instantiate and populate the input set for the choreo
        var finalizeOAuthInputs = finalizeOAuthChoreo.newInputSet();

        // Set inputs
        finalizeOAuthInputs.set_CallbackID(callback);
        finalizeOAuthInputs.set_OAuthTokenSecret(secret);
        finalizeOAuthInputs.set_Timeout("60");
        finalizeOAuthInputs.set_ConsumerSecret("XOJp8dCl4sYWDM9kEE4QoC6y52E9gWxKjAHJVmoIRcClFtCPmV");
        finalizeOAuthInputs.set_ConsumerKey("dwA1UMfMdkuigqu7wIIgrafprKLTswXb");
        // Run the choreo. Upon success, run another choreo to show user info.

        finalizeOAuthChoreo.execute(
            finalizeOAuthInputs,
            function(results){
                    accessTokenS = results.get_AccessTokenSecret();


                //console.log(results.get_AccessTokenSecret());

                var Twitter = require("temboo/Library/Twitter/Tweets");

                var statusesUpdateChoreo = new Twitter.StatusesUpdate(session);

                // Instantiate and populate the input set for the choreo
                var statusesUpdateInputs = statusesUpdateChoreo.newInputSet();

                // Set inputs
                statusesUpdateInputs.set_AccessToken(accessToken);
                statusesUpdateInputs.set_AccessTokenSecret(accessTokenS);
                statusesUpdateInputs.set_ConsumerSecret("XOJp8dCl4sYWDM9kEE4QoC6y52E9gWxKjAHJVmoIRcClFtCPmV");
                statusesUpdateInputs.set_StatusUpdate(statusUpdate);
                statusesUpdateInputs.set_ConsumerKey("CpdG5mmQAT4RUWUP5Brp1ZhuT");

                
                 statusesUpdateChoreo.execute(
                    statusesUpdateInputs,
                    function(results){
                    console.log(results.get_Response());
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
                    response.end('Log in with <a href="login">Twitter</a>.<br />');
                }
            });

            server.listen(4567);