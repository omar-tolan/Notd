const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require("./routers/users.js")
const taskRouter = require("./routers/tasks.js")
require("./DB/mongoose.js")

const app = express()
app.use(express.json())
app.use(cookieParser)
app.use(userRouter)
app.use(taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server up on port ${process.env.PORT}.`)
})