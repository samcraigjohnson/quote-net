/**
* Server methods
*/

Meteor.publish("questions", function(){
	return Questions.find({active: true});
});

Meteor.publish("answers", function(){
	return Answers.find({});
});

Meteor.publish("userData", function(){
	if(this.userId != null && Meteor.users.findOne({_id: this.userId}).isAdmin)
		return Meteor.users.find({},
        	{fields: {username: 1, points: 1, quoteMaster: 1, isAdmin: 1}});
	else
		return Meteor.users.find({_id: this.userId},
        	{fields: {points: 1, quoteMaster: 1, isAdmin: 1, numGuesses: 1}});
});

Meteor.publish("activeGame", function(){
	return Games.find({active: true});
});