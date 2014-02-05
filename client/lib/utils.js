Deps.autorun(function(){
	current_game = function(){
		return Games.findOne({active:true});
	}

	last_game = function(){
		return Games.findOne({lastGame:true});
	}

})