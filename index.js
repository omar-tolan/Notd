const express = require('express')
require("./DB/mongoose.js")

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server up on port ${process.env.PORT}.`)
})