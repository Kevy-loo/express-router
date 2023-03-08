const express = require("express")
const app = express()
const port = 3000
const userRouter = require('./routes/user')
const fruitRouter = require('./routes/fruits')
app.use(express.json())


// Express Routes

app.use("/user", userRouter)
app.use("/fruit", fruitRouter)




app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
