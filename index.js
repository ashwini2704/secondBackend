const express = require("express");
const {connection} = require("./db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/notes.route");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())
app.use("/users",userRouter);
app.use("/notes",noteRouter)

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to db")
        console.log("Server is running on port 8080")
    } catch (error) {
        console.log(error)
    }
})