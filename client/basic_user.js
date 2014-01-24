
Template.currentQ.currentQuestion = function(){
	var game = Games.findOne({});
	var display_q = {}
	if (game){
	    var question = Questions.findOne({_id: game.question});
		display_q.time = moment(question.time).format('MMMM Do YYYY, h:mm:ss a');
		display_q.text = question.text;
		Session.set("currentQuestion", true);
	} 
	else{
		display_q.text = "No Current Question";
		display_q.time = Date.now();
		Session.set("currentQuestion", false);
	}
	return display_q;
}

$(document).ready(function (){
	if(Session.get("currentQuestion")){
		document.getElementById("answerInput").disabled = false;
	}
	else{
		document.getElementById("answerInput").disabled = true;
	}

})

Template.mainpage.userName = function(){
	var name = Meteor.user().profile.name;
	return name;
}

Template.logout.events = {
	'click button#logout' : function(event){
		Meteor.logout();		
	}
}

Template.answers.answers = function(){
	var game = Games.findOne({});
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

