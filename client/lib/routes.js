
Router.map(function() {

	this.route('home', {
		path: '/',
		template: 'home'
	});

	this.route('admin', {
		path: '/admin',
		template: 'admin'
	});

	this.route('leaderboard', {
		path: '/leaderboard',
		template: 'leaderBoardPage'
	});
});