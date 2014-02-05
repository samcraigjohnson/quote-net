/**
*	Models
*/

Questions = new Meteor.Collection('questions');
Answers = new Meteor.Collection('answers');
Games = new Meteor.Collection('games');
Activity = new Meteor.Collection('activity');
Messages = new Meteor.Collection('messages');

CORRECT_GUESS = " correctly guessed "
INCORRECT_GUESS = " incorrectly guessed "
//Messages.remove({});
//Activity.remove({})
//+==================TEST DATA=======================+

/*
Questions.remove({});
Answers.remove({});
Games.remove({});
//Meteor.users.remove({});*/
//Meteor.users.update({username: "sam"}, {$set: {username: "Darth Quoter"}});
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