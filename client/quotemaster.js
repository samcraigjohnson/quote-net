Meteor.subscribe("userData");
Meteor.subscribe("activeGame");

Template.askQuestion.events = {
  'keydown input#questionInput' : function(event){
  	if(event.which == 13){
  			var question = document.getElementById('questionInput');

        if(question.value != ""){
          Meteor.call("ask_question", question.value, function(err, id){
            console.log(err);
          });

          document.getElementById('questionInput').value = '';
          question.value = ''; 

          console.log(Questions.find({})[0].text);
        }
    }
  }
}

Template.quoteMasterPage.activeGame = function(){
  var active = Games.find({}).count() > 0;
  return active;
}