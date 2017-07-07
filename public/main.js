const socket = io();

$('#div-chat').hide();

socket.on(
    'SERVER_SEND_MSG', 
    message => $('#ulMessages').append('<li>DA NHAN: ' + message + '</li>')
);

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MSG', message);
});
