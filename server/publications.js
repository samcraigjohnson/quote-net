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
	return Meteor.users.find({_id: this.userId},
        	{fields: {points: 1, quoteMaster: 1}});
});

Meteor.publish("activeGame", function(){
	return Games.find({active: true});
});