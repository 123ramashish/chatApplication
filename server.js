import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { connectToDB } from "./config.js";
import chatModel from "./chat.Schema.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = [];

io.on("connection", (socket) => {
  console.log("Connection Established!");
  socket.on("join", ({ username }) => {
    socket.username = username;
    if (username !== null && username !== undefined) {
      users.push(username);
    }

    socket.emit("message", { text: `Welcome ${username}`, users });
    // chatModel
    //   .find()
    //   .sort({ timestamp: 1 })
    //   .limit(50)
    //   .then((messages) => {
    //     socket.emit("updateMessage", messages);
    //   })
      // .catch((err) => {
      //   console.log(err.message);
      // });
  });

  socket.on("newMessage", (data) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    const newMessage = {
      username: data.username,
      time: `${day}/${month}/${year}, ${hour}:${minutes}`,
      message: data.message,
    };
    // const newChat = new chatModel({
    //   username: data.username,
    //   message: data.message,
    //   timestamp: `${day}/${month}/${year}, ${hour}:${minutes}`,
    // });
    // newChat.save();
    io.emit("updateMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Connection is disconnected!");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000!");
  connectToDB();
});
