const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

express.json()
const app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}))
mongoose.set('strictQuery', false)

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

//404 handler and pass to error handler
app.use((req, res, next) => {
  next();
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


// routes
const movieRoute = require('./routes/movieRoute')
const movieGroupRoute = require('./routes/movieGroupRoute')

app.use('/movie', movieRoute)
app.use('/admin/movieGroup', movieGroupRoute)


app.listen(process.env.PORT || 5000, () => {
  console.log("start server")
})