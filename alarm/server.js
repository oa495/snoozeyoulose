var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('static'));

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render("index.html");
});

app.post('/gmail', function (req, res) {
  if(req.body.message && req.body.email) {
    var message = req.body.message;
    var email = req.body.email;
    console.log(message, email);
    return;
  }
});

app.post('/sms', function (req, res) {
  if(req.body.message && req.body.phoneNumber) {
    var message = req.body.message;
    var phoneNumber = req.body.phoneNumber;
    console.log(message, phoneNumber);
    return;
  }
});

app.post('/twitter', function (req, res) {
  if(req.body.message && req.body.twitterHandle) {
    var message = req.body.message;
    var twitterHandle = req.body.twitterHandle;
    console.log(message, twitterHandle);
    return;
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});