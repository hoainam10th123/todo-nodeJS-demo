const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const fs = require('fs')
const { join } = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ErrorHandler = require('./src/middlewares/errorHandler')
const errorRouter = require('./src/routes/error.route')
const todosRouter = require('./src/routes/todo.route')
const taskRouter = require('./src/routes/task.route')

//require('dotenv/config')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === "production"

const accessLogStream = fs.createWriteStream('access.log', {
    interval: '1d',
    path: join(__dirname, 'log'),
})

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('dev'))
//app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())
app.use(express.json())

// Routes
app.use(`/api/todos`, todosRouter)
app.use(`/api/tasks`, taskRouter)
app.use(`/api/error`, errorRouter)

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler)

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database is ready')
}).catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})