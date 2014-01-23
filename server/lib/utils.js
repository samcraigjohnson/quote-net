curr_game_id = function(){
	if (Games.find({active: true}).count() > 0){
		console.log(Games.find({active: true}).count()+ " active games");
		return Games.findOne({active: true})._id 
	}
	else {
		return '';
	}
}

Accounts.onCreateUser(function (options, user){
	user.points = 0;

	if(options.profile)
		user.profile = options.profile;
	return user;
})