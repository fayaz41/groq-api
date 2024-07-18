require("dotenv").config();
require("./model/")
const express = require("express")
const app = express();
const cors = require("cors");
const child_process = require("child_process");
const helper = require("./Helper/groqAPI");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

const ChatRoutes = require("./routes/chatRoutes");


app.get("/version.json",(req,res)=>{
    try{
        const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();
        console.log("Current version: ",commitHash);
        res.json({version: commitHash});
    }   
    catch(err){
        console.error("Something went wrong: ",err);
        res.status(500).json({error:"Failed to get version"});
    }
});


app.get('/healthcheck',(req,res)=>{
    try{
        let api = process.env.GROQ_API_KEY;
        if(!api){
            throw new API_ERROR("Groq API is missing.");
        }

        let question = 'HI,How are you ?';
        let response = helper.main(question);

        if(!response.length){
            throw new GROQ_ERROR("Response is empty string.");
        }

        res.status(200).json({
            groq_response: response,
        });

    }   
    catch(err){
        console.log("Something went wrong: ",err);
        res.status(500).json({
            message: err.message,
            name: err.name
        });
    }
})

app.use('/',ChatRoutes);

app.listen(3001,()=>{
    console.log("Listening to PORT 3000");
})