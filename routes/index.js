const userRoute = require('./userRoute')
const postRoute = require('./postRoute')
const storyRoute = require('./storyRoute')
const messageRoute = require('./messageRoute')
const conversationRoute = require('./conversationRoute')
const uploadCloudRoute = require('./uploadCloudRoute')

const rootRoutes = {
    userRoute,
    postRoute,
    storyRoute,
    messageRoute,
    conversationRoute,
    uploadCloudRoute
}

module.exports = rootRoutes