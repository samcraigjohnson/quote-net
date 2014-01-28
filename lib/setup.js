/**
*	Models
*/

Questions = new Meteor.Collection('questions');
Answers = new Meteor.Collection('answers');
Games = new Meteor.Collection('games');


//+==================TEST DATA=======================+

/*
Questions.remove({});
Answers.remove({});
Games.remove({});
//Meteor.users.remove({});*/
//Meteor.users.update({username: "anne"}, {$set: {points: 0}});
/*
var id = Accounts.createUser({
      username: "anne",
      email: "anne@hello.com",
      password: "johnson",
      points: 0,
      quoteMaster: false,
      profile: { name: "Anne" }
    });

console.log(id);*/


//Meteor.loginWithPassword("sam", "johnson");