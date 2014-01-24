/*
* Server Methods
*/
Meteor.methods({

	//start game with question
	ask_question: function(question){
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

	//user adds an answer to current question
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

	//make question inactive
	inactive: function(q_id){
		Questions.update({_id: q_id}, {$set: {active: false}});
	},

	//mark answer wrong and inactive
	wrong_answer: function(ans_id){
		Answers.update({_id: ans_id}, {$set: {wrong: true, active:false}});
	},

	//mark question correct and end game, giving player a point
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
