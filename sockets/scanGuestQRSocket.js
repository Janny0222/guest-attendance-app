const checkGuest = (io, socket) => {
    socket.on("scan-guest-qr", (data) => {
        io.emit("scan-guest-qr", data);
    });
}