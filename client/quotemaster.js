
//Start game, ask question
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

//Update incoming questions
Template.incomingAnswers.inAnswers = function(){
  
  var ans = Games.findOne({}).answers;
  var results = [];
  
  for(var i = 0; i < ans.length; i++){
    results.push(Answers.findOne({_id: ans[i]}));
  }
  console.log(results);
  return results;
}

Template.quoteMasterPage.activeGame = function(){
  var active = Games.find({}).count() > 0;
  return active;
}