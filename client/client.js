
Meteor.subscribe("questions");
Meteor.subscribe("answers");
Meteor.subscribe("userData");

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

Template.mainpage.points = function(){
	return Meteor.user().points;
}

Template.logout.events = {
	'click button#logout' : function(event){
		Meteor.logout();		
	}
}

Template.answers.answers = function(){
	var docs = Answers.find({}, {sort: {time:-1}, limit: 5});
	var qs = []
	docs.forEach(function(doc){
		doc.time = moment(doc.time).format('MMMM Do YYYY, h:mm:ss a');
		qs.push(doc);
	});
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

