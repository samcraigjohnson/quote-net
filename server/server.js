/**
* Server methods
*/

Meteor.methods({
	ask_question: function(question){
		var question_id = Questions.insert({
			text: question, 
			active: true,
      owner: this.userId, 
			time: Date.now()
		});

    var game_id = Games.insert({
      question: question_id,
      hints: [],
      answers: [],
      active: true,
      master: this.userId,
      time: Date.now()
    });

		return game_id;
	},
	add_answer: function(answer){
		var ans_id = Answers.insert({
			text: answer, 
			owner: this.userId,
			time: Date.now(),
			active: true
		});

		Games.update({active: true}, {$push: {answers: ans_id}});
		console.log("added question: " + answer + ": " + ans_id);
		return ans_id;
	},
	inactive: function(q_id){
		Questions.update({_id: q_id}, {$set: {active: false}});
	},
});


Meteor.publish("questions", function(){
	return Questions.find({active: true});
});

Meteor.publish("answers", function(){
	return Answers.find({active: true});
});

Meteor.publish("userData", function(){
	return Meteor.users.find({_id: this.userId},
        	{fields: {points: 1, quoteMaster: 1}});
});

Meteor.publish("activeGame", function(){
	return Games.find({active: true});
});