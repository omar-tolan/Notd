const express = require('express')
const userRouter = require("./routers/users.js")
require("./DB/mongoose.js")

const app = express()
app.use(express.json())
app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server up on port ${process.env.PORT}.`)
})