require("dotenv").config();
require("./model/")
const express = require("express")
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

const ChatRoutes = require("./routes/chatRoutes");
app.use('/',ChatRoutes);

app.listen(3001,()=>{
    console.log("Listening to PORT 3000");
})