var SID = "ACb39b951272829a666bda65ff3c308e40";
var AUTH_TOKEN = "d0c1d96e89726e9502bd444580858161";

twilio = Twilio(SID, AUTH_TOKEN);

sendText = function (toNum, message){
	twilio.sendSms({
		to: '+1'+ toNum,
		from: '+13173336684',
		body: message
	}, function(err, responseData){
		if(err)
			console.log("Send text error: " + err);

	});
}