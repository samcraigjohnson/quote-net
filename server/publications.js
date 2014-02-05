/**
* Server methods
*/

Meteor.publish("questions", function(){
	return Questions.find({});
});

Meteor.publish("answers", function(){
	return Answers.find({});
});

Meteor.publish("userData", function(){
	return Meteor.users.find({}, {fields: {username: 1, points: 1, quoteMaster: 1, numGuesses: 1, isAdmin: 1}});
});

Meteor.publish("activeGame", function(){
	return Games.find({active: true});
});

Meteor.publish("lastGame", function(){
	return Games.find({lastGame: true});
})

Meteor.publish("activities", function(){
	return Activity.find({});
});

Meteor.publish("messages", function(){
	return Messages.find({});
});