const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bodyParser = require("body-parser");

dotenv.config();

connectDB();
app.use(cors({
  origin:[ "https://mern-chatapp-fe1h.vercel.app",'https://pallavik-pal.github.io',"http://localhost:3000"], // Your deployed frontend
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json()); //to acess json data



app.get("/", (req, res) => {
  res.send("API is running sucessfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

const server = app.listen(
  7000,
  console.log(`server started on port ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://mern-chatapp-fe1h.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room : " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
