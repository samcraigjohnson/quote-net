
/*
Questions.remove({});
Answers.remove({});
Games.remove({});*/

//
try{
Accounts.createUser({
      username: "sam",
      email: "sjohnson540@gmail.com",
      password: "hello",
});
}catch(err){}

Meteor.users.update({username: 'sam'}, {$set: {isAdmin: true}});