const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main(question) {
  try{
    const chatCompletion = await getGroqChatCompletion(question);
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  
    return chatCompletion.choices[0]?.message?.content || "";
  }
  catch(err){
    return err;
  }

}

async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: question
      },
    ],
    model: "llama3-8b-8192",
  });
}


module.exports = {
    main,
}

