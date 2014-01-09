
Meteor.subscribe("questions");
Meteor.subscribe("answers");

Template.currentQ.currentQuestion = function(){
		var cq = Questions.findOne({active:true});
		var display_q = {}
		display_q.time = moment(cq.time).format('MMMM Do YYYY, h:mm:ss a');
		display_q.text = cq.text;
		return display_q;
}

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
	var docs = Answers.find({});
	return docs;
}

Template.input.events = {
	'keydown input#answerInput' : function(event){
		if(event.which == 13){
			var answer = document.getElementById('answerInput');
			if(answer.value != ""){
				Meteor.call("add_answer", answer.value, function(err, a_id){
					console.log(a_id);
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
			if(error){ console.log(error);}
		});
}
Template.login.events = {
	'click button#submit' : loginEvent,
	'keydown input#answerInput' : function(event){
		if(event.which == 13){
			loginEvent(event);
		}
	}
}

