/**
*	Models
*/

Questions = new Meteor.Collection('questions');
Answers = new Meteor.Collection('answers');
Games = new Meteor.Collection('games');


//+==================TEST DATA=======================+


//Meteor.users.remove({});
//Meteor.users.update({username: "charles"}, {$set: {quoteMaster:true}});
/**
var id = Accounts.createUser({
      username: "charles",
      email: "charles@hello.com",
      password: "johnson",
      points: 0,
      profile: { name: "Charles" }
    });

console.log(id);
**/

//Meteor.loginWithPassword("sam", "johnson");