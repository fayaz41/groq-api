import React from "react"
import Message from "./Message";
import { TextField } from "@mui/material";
import { BASE_API } from "./constants";


const Chat = ()=>{

    const [messages,setMessages] = React.useState([]);
    const [input,setInput] = React.useState('');

    React.useEffect(()=>{
        let url = `${BASE_API}/chat`;

        fetch(url)
            .then((response)=>response.json())
            .then((response)=>{
                if(response.status){
                    setMessages(response.messages);
                }
            })
            .catch((err)=>{
                console.log(err);
            })

    },[]);

    const handleFormSubmit = (e)=>{
        e.preventDefault();

        let url = `${BASE_API}/get`;

        let formData = new FormData(e.target);
        let payload = {};

        for(let [key,value] of formData.entries()){
            payload[key] = value;
        }

        console.log("Payload is ",payload);

        setMessages((prev)=>[...prev,{ role:"user",message:payload.query }]);
        setInput('');


        let options = {
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            }
        };
        
        fetch(url,options)
            .then((response)=> response.json())
            .then((response)=>{
                console.log("Response is :",response);

                if(response.status){
                    setMessages((prev)=> [...prev,response.response]);
                }

            })
            .catch((err)=>{
                console.log(err);
            })
    }
    return(
        <>
            <main style={{overflow: 'hidden'}} className="w-full h-screen">
                <div style={{overflowY:'auto',height:'90%'}} className="w-3/5 m-auto ">
                    {messages.map((item,index)=>{
                        return <Message key={index} Message={item} />
                    })}
                </div>
                <div className="w-3/5 h-10% m-auto">
                    <form onSubmit={handleFormSubmit} className="mt-5">
                        <TextField
                            size="small"
                            type="text"
                            placeholder="Enter Query"
                            className="w-full"
                            name="query"
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                        />
                    </form>
                </div>
            </main>
        </>
    )
}

export default Chat;