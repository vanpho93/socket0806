const socket = io();
let id;

$('#div-chat').hide();

socket.on(
    'SERVER_SEND_MSG', 
    message => $('#ulMessages').append('<li>' + message + '</li>')
);

socket.on(
    'XAC_NHAN_DANG_KY',
    arrUser => {
        if (!arrUser) return alert('Username da ton tai!');
        $('#div-chat').show();
        $('#div-sign-up').hide();
        arrUser.forEach(user => $('#ulUsers').append(`<li id="${user.id}">${user.username}</li>`));
        socket.on(
            'NGUOI_DUNG_MOI', 
            user => $('#ulUsers').append(`<li id="${user.id}">${user.username}</li>`)
        );
    }
);

socket.on('NGUOI_DUNG_NGAT_KET_NOI', id => $(`#ulUsers #${id}`).remove());

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MSG', message);
});

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_UP', username);
});

$('#ulUsers').on('click', 'li', function() {
    id = $(this).attr('id');
    $('#ulUsers li').removeClass('active');
    $(this).addClass('active');
});

$('#btnSendPrivate').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_PRIVATE_MSG', { id, message });
});

$('#ulRooms li').click(function() {
    const roomName = $(this).text();
    socket.emit('CLIENT_JOIN_ROOM', roomName);
    $('#ulRooms li').removeClass('activeRoom');
    $(this).addClass('activeRoom');
});

$('#btnSendRoom').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_ROOM_MSG', message);
});
/*
    Neu da ton tai? -> Khong cho dang ky. alert()

    Neu chua ton tai -> Cho dang ky.
    an div-sign-up, show div-chat $('#div').show();
    Ai da sign up -> ten phai co trong ulUsers
*/