
$(document).ready(function(){

	var message = [];


	var socket = io.connect();

	socket.on('message', function(data){

		$('#board').append('<div>'+data.message+'</div>');


	});

	$('#submit').bind('click', function(){

		var content = $('#content').val();

		socket.emit('send', {message : content});

		$('#content').val('');


	});

});