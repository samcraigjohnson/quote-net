Template.activityFeed.activites = function(){
	var lg = last_game();
	if(lg){
		var acts = Activity.find({game: lg._id});
		if(acts)
			return acts;
	}
}

Template.activityFeed.question = function(){
	var lg = last_game();
	if(lg){
		var lq = Questions.findOne({_id:lg.question});
		if(lq)
			return lq.text;
	}
}

Template.activityFeed.answer = function(){
	var lg = last_game();
	if(lg){
		var correct = Activity.findOne({game: lg._id, action: CORRECT_GUESS});
		if(correct)
			return correct.body;
	}
}

Template.leaderboard.users = function(){
	var users = [];
	Meteor.users.find({}, {sort: {points: -1}}).forEach(function(user){
		if(!user.quoteMaster)
			users.push(user);
	});
	return users;
}