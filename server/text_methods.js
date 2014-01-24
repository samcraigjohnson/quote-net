var SID = "ACb39b951272829a666bda65ff3c308e40";
var AUTH_TOKEN = "d0c1d96e89726e9502bd444580858161";

twilio = Twilio(SID, AUTH_TOKEN);

twilio.sendSms({
	to: '+13174304646',
	from: '+13173336684',
	body: 'quotenet test text'
}, function(err, responseData){
	if(err)
		console.log(err);

});