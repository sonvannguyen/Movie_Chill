const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socket = require("socket.io");

require("dotenv").config();
express.json();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "20mb",
  })
);
app.use(bodyParser.json());

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect db success !");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

// routes
const movieRoute = require("./routes/movieRoute");
const movieGroupRoute = require("./routes/movieGroupRoute");
const userRoute = require("./routes/userRoute");
const notificationRoute = require("./routes/notificationRoute");
const uploadRoute = require("./routes/uploadCloudRoute");
const adminRoute = require("./routes/adminRoute");
const chatController = require("./controllers/chatController");

app.use("/movie", movieRoute);
app.use("/admin/movieGroup", movieGroupRoute);
app.use("/user", userRoute);
app.use("/notification", notificationRoute);
app.use("/upload", uploadRoute);
app.use("/admin", adminRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next();
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("start server");
});

// const server = http.createServer(app);
const socketIo = socket(server, {
  cors: {
    origin: "*",
  },
});

let userActives = [];

// socket io
socketIo.on("connection", async (socket) => {
  console.log("New client connected" + socket.id);

  if (!userActives.includes(socket.id)) {
    userActives.push(socket.id);
  }

  socket.emit("getId", socket.id);
  socketIo.emit("userActive", { totalUserActive: userActives.length });
  const chatsHistory = await chatController.getChatsHistory();
  socketIo.emit("sendDataServer", { chatsHistory });

  socket.on("sendDataClient", async function (data) {
    await chatController.createChat({
      userId: data.userId,
      message: data.content,
    });
    const chatsHistory = await chatController.getChatsHistory();
    socketIo.emit("sendDataServer", { chatsHistory });
  });

  socket.on("disconnect", () => {
    userActives = userActives.filter((id) => id != socket.id);
    console.log("Client disconnected");
  });
});
