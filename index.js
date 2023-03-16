const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors');
const cors = require('cors')
require('dotenv').config()
const rootRoutes = require('./routes/index')
const bodyParser = require('body-parser')
const socket = require("socket.io");

const connectDB = async() => {
    try {
        await mongoose.connect((process.env.MONGODB_URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect db success')
    } catch (error) {
        console.log(error.message)
    }
}

connectDB()

const app = express()
express.json()
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', rootRoutes.userRoute)
app.use('/post', rootRoutes.postRoute)
app.use('/story', rootRoutes.storyRoute)
app.use('/messages', rootRoutes.messageRoute)
app.use('/conversations', rootRoutes.conversationRoute)
app.use('/uploads', rootRoutes.uploadCloudRoute)


//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
})

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("start ")
})

const io = socket(server, {
    cors: {
        origin: "https://in4me.netlify.app",
    },
});

let users = []

const addNewUser = (userId, socketId) => {
    if(!users.some(user => user.userId === userId)){
        users.push({userId, socketId})
    }
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
    // listen addUser and emit get users for client
    socket.on('addUser', (userId) => {
        addNewUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
       
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        })
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})
