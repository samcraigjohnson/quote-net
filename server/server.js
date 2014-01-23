/**
* Server methods
*/

Meteor.methods({
	ask_question: function(question){
		//start game
		var question_id = Questions.insert({
			text: question, 
			active: true,
      		owner: Meteor.user().username, 
			time: Date.now()
		});

	    var game_id = Games.insert({
	      question: question_id,
	      hints: [],
	      answers: [],
	      active: true,
	      master: Meteor.user().username,
	      time: Date.now()
	    });

		return game_id;
	},
	add_answer: function(answer){
		var ans_id = Answers.insert({
			text: answer, 
			owner: Meteor.user().username,
			game: curr_game_id(),
			time: Date.now(),
			active: true
		});

		Games.update({active: true}, {$push: {answers: ans_id}});
		return ans_id;
	},
	inactive: function(q_id){
		Questions.update({_id: q_id}, {$set: {active: false}});
	},
	wrong_answer: function(ans_id){
		Answers.update({_id: ans_id}, {$set: {wrong: true, active:false}});
	},
	correct_answer: function(ans_id){
		//end game, give point
		Answers.update({_id: ans_id}, {$set: {wrong: false, active:false}});
		var ans = Answers.findOne({_id: ans_id});
		Meteor.users.update({username: ans.owner}, {$inc: {points: 1}});

		Games.update({}, {$set: {active: false}}, {multi: true});
		Questions.update({}, {$set: {active: false}}, {multi: true});
		Answers.update({}, {$set: {active: false}}, {multi: true});
	},
});


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