
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
  var curr_game = Games.findOne({});
  var ans = Answers.find({game: curr_game._id});
  var results = [];
  ans.forEach(function(doc){
    doc.time = moment(doc.time).format('MMMM Do YYYY, h:mm:ss a');
    results.push(doc);
  });
  return results;
}

Template.quoteMasterPage.activeGame = function(){
  var active = Games.find({}).count() > 0;
  return active;
}