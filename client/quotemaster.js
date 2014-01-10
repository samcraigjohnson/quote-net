Meteor.subscribe("userData");

Template.mainpage.quotemaster = function(){
	return Meteor.user().quoteMaster;
}