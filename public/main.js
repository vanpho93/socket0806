const socket = io();

$('#div-chat').hide();

socket.on(
    'SERVER_SEND_MSG', 
    message => $('#ulMessages').append('<li>DA NHAN: ' + message + '</li>')
);

socket.on(
    'XAC_NHAN_DANG_KY',
    arrUser => {
        if (!arrUser) return alert('Username da ton tai!');
        $('#div-chat').show();
        $('#div-sign-up').hide();
        arrUser.forEach(user => $('#ulUsers').append(`<li>${user.username}</li>`));
        socket.on(
            'NGUOI_DUNG_MOI', 
            user => $('#ulUsers').append(`<li>${user.username}</li>`)
        );
    }
)

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MSG', message);
});

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_UP', username);
});
/*
    Neu da ton tai? -> Khong cho dang ky. alert()

    Neu chua ton tai -> Cho dang ky.
    an div-sign-up, show div-chat $('#div').show();
    Ai da sign up -> ten phai co trong ulUsers
*/