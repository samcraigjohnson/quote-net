/**
*	Models
*/

Questions = new Meteor.Collection('questions');
Answers = new Meteor.Collection('answers');
Masters = new Meteor.Collection('masters');

//Meteor.users.remove({});
//Meteor.users.update({username: "sam"}, {$set: {points:0}});
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