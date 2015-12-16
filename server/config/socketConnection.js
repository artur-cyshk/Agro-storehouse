exports.on=function (socket) {
    socket.on('comment', function (data) {
        socket.broadcast.emit('comment',data);
    });
};