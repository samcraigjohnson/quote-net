/**
* Server methods
*/

Meteor.methods({
	add_question: function(question){
		var question_id = Questions.insert({
			text: question, 
			active: true, 
			time: Date.now()
		});
		return question_id;
	},
	add_answer: function(anwser){
		var ans_id = Questions.insert({
			text: answer, 
			owner: this.userId,
			time: Date.now()
		});
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
	return Answers.find({owner: this.userId});
});