
Router.map(function () {
  this.route('recieveText', {
    path: '/text/recieve',
    where: 'server',
    action: function () {
    	var request = this.request.method;
    	this.response.writeHead(200, {'Content-Type': 'text/html'});
      	this.response.end('hello '+ request +' request from server');
    }
  });
});