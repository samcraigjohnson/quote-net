curr_game_id = function(){
	if (Games.find({active: true}).count() > 0){
		return Games.findOne({active: true})._id 
	}
	else {
		return '';
	}
}

last_game_id = function(){
	if (Games.find({lastGame: true}).count() > 0){
		return Games.findOne({lastGame: true})._id 
	}
	else {
		return '';
	}
}

change_quote_master = function(userId){
	var users  = Meteor.users.find({});
	Meteor.users.update({}, {$set: { quoteMaster: false, points: 0}}, {multi: true});
	Activity.remove({});
	console.log("cleared quotemaster: " + users.count());
	Meteor.users.update({_id: userId}, {$set: { quoteMaster: true}});
}


Accounts.onCreateUser(function (options, user){
	user.points = 0;
	user.isAdmin = false;
	user.numGuesses = 1;
	if(options.profile)
		user.profile = options.profile;
	return user;
})