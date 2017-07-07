const socket = io();

socket.on(
    'SERVER_SEND_MSG', 
    randomNumber => console.log('DA NHAN: ' + randomNumber)
);

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MSG', message);
});
