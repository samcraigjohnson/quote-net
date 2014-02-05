
//Start game, ask question
Template.askQuestion.events = {
  'keydown input#questionInput' : function(event){
  	if(event.which == 13){
        event.preventDefault();
  			var question = document.getElementById('questionInput');

        if(question.value != ""){
          Meteor.call("ask_question", question.value, function(err, id){
          });

          document.getElementById('questionInput').value = '';
          question.value = ''; 
        }
    }
  }
}

Template.incomingAnswers.events = {
  //wrong answer
  'click button.btn-danger' : function(event){
    var ans_id = $(event.target).closest("tr").attr('id');
    Meteor.call("wrong_answer", ans_id);
  },
  //right answer
  'click button.btn-success' : function(event){
    var ans_id = $(event.target).closest("tr").attr('id');
    Meteor.call('correct_answer', ans_id);
  }
}

Template.hints.hasHints = function (){
  var game = current_game();
  if(game && game.hasOwnProperty('hints')){
    if(game.hints.length > 0){
      return true;
    }

  }
  return false;
}

Template.hints.hints = function(){
  return current_game().hints;
}

Template.endGame.events = {
  'click button.btn-danger' : function(event){
    Meteor.call("end_game", function(err){
      if(err){console.log(err);}
    })
  }
}

Template.hint.events = {
  'click button.btn-primary' : function(event){
    $("#hintInput").show();
    $(event.target).hide();
    $("#hintInput").focus();
  },

  'keydown input#hintInput' : function(event){
    if(event.which == 13){
      event.preventDefault();
      if (event.target.value != ""){
          Meteor.call("give_hint", event.target.value, function(err, id){});
          event.target.value = "";
          $("#hintInput").hide();
          $('#hintBtn').show();
      }
    }
  }

}

//Update incoming questions
Template.incomingAnswers.inAnswers = function(){
  var curr_game = current_game();
  var ans = Answers.find({game: curr_game._id, active: true});
  var results = [];
  ans.forEach(function(doc){
    doc.time = moment(doc.time).format('MMMM Do YYYY, h:mm:ss a');
    results.push(doc);
  });
  return results;
}
Template.incomingAnswers.rejectAnswers = function(){
  var curr_game = current_game();;
  var ans = Answers.find({game: curr_game._id, active: false}, {sort:{time:-1}});
  var results = [];
  ans.forEach(function(doc){
    doc.time = moment(doc.time).format('MMMM Do YYYY, h:mm:ss a');
    results.push(doc);
  });
  return results;
}

Template.quoteMasterPage.activeGame = function(){
  var active = Games.find({active:true}).count() > 0;
  return active;
}