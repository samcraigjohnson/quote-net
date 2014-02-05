
Template.currentQ.currentQuestion = function(){
	var game = current_game();
	var display_q = {}
	if (game){
	    var question = Questions.findOne({_id: game.question});
		display_q.time = moment(question.time).format('MMMM Do YYYY, h:mm:ss a');
		display_q.text = question.text;
	} 
	else{
		display_q.text = "No Current Question";
		display_q.time = Date.now();
	}
	return display_q;
}

Template.mainpage.currQuestion = function(){
	if(Questions.findOne({active: true})){
		return true;
	}
	else{
		return false;
	}
}


Template.logout.events = {
	'click button#logout' : function(event){
		Meteor.logout();		
	}
}

Template.answers.answers = function(){
	var game = current_game();
	var qs = [];

	if(game){
		var docs = Answers.find({owner: Meteor.user().username, game: game._id}, {sort: {time:-1}, limit: 5});
		docs.forEach(function(doc){
			doc.time = moment(doc.time).format('MMMM Do YYYY, h:mm:ss a');
			qs.push(doc);
		});
	}
	return qs;
}

Template.input.canAnswer = function(){
	if (Meteor.user() && Meteor.user().numGuesses == 0){
		return false;
	}
	else{
		return true;
	}
}

Template.input.events = {
	'keydown input#answerInput' : function(event){
		if(event.which == 13){
			var answer = document.getElementById('answerInput');
			if(answer.value != ""){
				Meteor.call("add_answer", answer.value, function(err, a_id){
					console.log("Answer added: " + a_id);
				});

				document.getElementById('answerInput').value = '';
				answer.value = '';
			}
		}
	}
}



Template.chat.messages = function(){
	return Messages.find({}, {sort: {time:-1}, limit:20});
}

Template.chat.events = {
'keydown input#chatInput' : function(event){
		if(event.which == 13){
			var message = document.getElementById('chatInput');
			if(message.value != ""){
				Meteor.call("send_message", message.value, function(err, id){
					if(err){console.log(err);}
				});

				document.getElementById('chatInput').value = '';
				message.value = '';
			}
		}
	}
}



//LOGIN STUFF --------------------
function loginEvent(event){
	event.stopPropagation();	
	event.preventDefault();
	var username = document.getElementById('usernameInput').value;
	var password = document.getElementById('passwordInput').value;
	Meteor.loginWithPassword(username, password, function(error){
		if(error){ 
			console.log("EROOR");
			$("#login-unsuc").removeClass('hidden');
		}
	});
}

function createEvent(event){
	event.stopPropagation();	
	event.preventDefault();
	var username = document.getElementById('usernameInputCreate').value;
	var password = document.getElementById('passwordInputCreate').value;
	Accounts.createUser({username: username, password: password}, function(error){
		if(error){console.log("error");}
		else{
			Meteor.loginWithPassword(username, password); 
			console.log("created")
		}
	});
}

Template.login.events = {
	'click button#submit' : loginEvent,
	'keydown input#passwordInput' : function(event){
		if(event.which == 13){
			loginEvent(event);
		}
	},
	'click button#submitCreate' : createEvent,
	'keydown input#passwordInputCreate' : function(event){
		if(event.which == 13){
			createEvent(event);
		}
	}
}

