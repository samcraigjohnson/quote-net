curr_game_id = function(){
	if (Games.find({active: true}).count() > 0){
		console.log(Games.find({active: true}).count()+ " active games");
		return Games.findOne({active: true})._id 
	}
	else {
		console.log("no active games");
		return null;
	}
}