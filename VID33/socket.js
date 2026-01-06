const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");

  // Receive message from client
  socket.on("message", (msg) => {
    console.log("Client says:", msg);

    // Send message back to client
    socket.emit("message", "Hello Client, message received!");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
