

const socketManager = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);
        // socket.on("scan-guest-qr", (data) => {
        //     io.emit("scan-guest-qr", data);
        // });
    })
}

module.exports = { socketManager };

