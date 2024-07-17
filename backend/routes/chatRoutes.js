const express = require("express");
const router = express.Router();
const groqHelper = require("../Helper/groqAPI");
const Chat = require("../model/chat");

router.post('/get',async(req,res)=>{
    try{
        let query = req.body.query;
        if(!query){
            return res.status(400).json({
                status: 400,
                message:"You need to provide a question..."
            });
        };

        let question = await Chat.create({ message: query });

        let response = await groqHelper.main(query);
        // console.log("Response from groq is :",response);

        let answer = await Chat.create({ message: response, role:'bot' });

        res.status(200).json({
            status: true,
            response: {
                role:'bot',
                message:response
            }
        })
    }
    catch(err){
        console.log("Something went wrong: ",err);
    }
})


router.get('/chat',async(req,res)=>{
    try{
        const allMessages = await Chat.find({});

        res.status(200).json({
            status: true,
            messages: allMessages,
        })

    }   
    catch(err){
        console.log("Something went wrong: ",err);
    }
})

module.exports = router;