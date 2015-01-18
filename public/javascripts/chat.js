
$(document).ready(function(){

	var message = [];


	var socket = io.connect('http://localhost:8080');

	socket.on('message', function(data){

		console.log(data);

	});

	$('#submit').bind('click', function(){

		var content = $('#content').val();
		$('#content').val('');


	});

});