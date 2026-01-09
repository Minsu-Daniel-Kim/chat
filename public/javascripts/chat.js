$(document).ready(function(){

	var message = [];

	// Use relative URL to support both development and production environments
	// This prevents "Importing a module script failed" errors in production
	var socketUrl = window.location.protocol + '//' + window.location.host;
	var socket = io.connect(socketUrl);

	socket.on('message', function(data){

		$('#board').append('<div>'+data.message+'</div>');


	});

	// Handle connection errors gracefully
	socket.on('connect_error', function(error){
		console.error('Socket connection error:', error);
	});

	socket.on('reconnect_attempt', function(){
		console.log('Attempting to reconnect...');
	});

	$('#submit').bind('click', function(){

		var content = $('#content').val();

		socket.emit('send', {message : content});

		$('#content').val('');


	});

});