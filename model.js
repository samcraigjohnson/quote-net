/**
*	Models
*/

Questions = new Meteor.Collection('questions');
Answers = new Meteor.Collection('answers');
Masters = new Meteor.Collection('masters');

//Meteor.users.remove({});
/**
var id = Accounts.createUser({
      username: "charles",
      email: "charles@hello.com",
      password: "johnson",
      profile: { name: "Charles" }
    });

console.log(id);
**/

//Meteor.loginWithPassword("sam", "johnson");