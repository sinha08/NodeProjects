$(function () {
    var socket = io();
    $('form').submit(function(){
      var msg = { text:$('#m').val(),
                  userName:$('#welcome_text').text().split(" ")[1]}
      socket.emit('chat message', msg);
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      if (msg.userName !== $('#welcome_text').text().split(" ")[1])
        $('#messages').append($('<li>').text(msg.text).css({"text-align":"right", "color":"#782d3e"}));
      else
        $('#messages').append($('<li>').text(msg.text).css({"text-align":"left", "color":"#06751b"}));
    });
  });