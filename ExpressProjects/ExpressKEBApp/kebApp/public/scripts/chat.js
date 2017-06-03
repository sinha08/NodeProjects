$(function () {
    var socket = io();
    var aiBot = false;
    /*$('form').submit(function(){
      var msg = { text:$('#m').val(),
                  userName:$('#welcome_text').text().split(" ")[1]}
      socket.emit('chat message', msg);
      $('#m').val('');
      var reply = null;
      if (msg.text.toUpperCase() === "Hi Alice".toUpperCase()) {
        aiBot = true;
        reply = { text:"Hi "+$('#welcome_text').text().split(" ")[1]+", I am not yet completed",
                  userName:"Alice"}
      } else if (msg.text.toUpperCase() === "Bye".toUpperCase()) {
        aiBot = false;
        reply = { text:"Bye, see you soon",
                  userName:"Alice"}
        socket.emit('chat message', reply);
      }
      if (aiBot) {
        //add some reg expression for static bots or to make it more interesting add ml
        //for now
        if (msg.userName === $('#welcome_text').text().split(" ")[1]) {
          socket.emit('chat message', reply);
        }
      }
      return false;
    });*/
    socket.on('chat message', function(msg){
      if (msg.userName !== $('#welcome_text').text().split(" ")[1]){
        $('#messages').append($('<li>').text(msg.text).css({"text-align":"right", "color":"#782d3e"}));
        $('#chatMessages').append($('<li>').text(msg.text).css({"text-align":"right", "color":"#782d3e"}));
      }else{
        $('#messages').append($('<li>').text(msg.text).css({"text-align":"left", "color":"#06751b"}));
        $('#chatMessages').append($('<li>').text(msg.text).css({"text-align":"left", "color":"#06751b"}));
      }
    });


    $('#sendMessageBtn').click(function(){
      if($('#messageText').val() == ''){
        return;
      }
      $('#chatPanel').addClass('collapse in');
      var msg = { text:$('#messageText').val(),
                  userName:$('#welcome_text').text().split(" ")[1]}
      socket.emit('chat message', msg);
      $('#messageText').val('');
      var reply = null;
      if (msg.text.toUpperCase() === "Hi Alice".toUpperCase()) {
        aiBot = true;
        reply = { text:"Hi "+$('#welcome_text').text().split(" ")[1]+", I am not yet completed",
                  userName:"Alice"}
      } else if (msg.text.toUpperCase() === "Bye".toUpperCase()) {
        aiBot = false;
        reply = { text:"Bye, see you soon",
                  userName:"Alice"}
        socket.emit('chat message', reply);
      } else {
        reply = { text:"Didn't get you. Enter \'Bye\' to exit.",
                  userName:"Alice"}
      }
      if (aiBot) {
        //add some reg expression for static bots or to make it more interesting add ml
        //for now
        if (msg.userName === $('#welcome_text').text().split(" ")[1]) {
          socket.emit('chat message', reply);
        }
      }
      return false;
    });

    $('#closeChatPanelBtn').click(function(){
      $('#chatPanel').removeClass('in');
    });

    $('#messageText').keyup(function(event){
      if(event.keyCode == 13){
        $('#sendMessageBtn').click();
      }
    });



  });
