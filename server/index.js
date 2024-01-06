import express from 'express'
import tesseract from "node-tesseract-ocr"
import dotenv from 'dotenv'
////import fileUpload from "./routes/fileupload.route.js"
// const bodyParser = require("body-parser");
// const morgan = require('morgan')
// const multer = require('multer')
import multer from 'multer'
import axios from 'axios'
//const axios = require('axios');
//const { OpenAIAPI } = require('openai');
import OpenAIAPI from 'openai';
const app = express();
const port = 3000
dotenv.config();

const apiKey = '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' || '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';
const openai = new OpenAIAPI({ key: apiKey });

async function callOpenAIChatGPT(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content;
    console.log('ChatGPT Response:', answer);
  } catch (error) {
    console.error('Error calling OpenAI ChatGPT:', error.message);
  }
}

// Call the function with the prompt
callOpenAIChatGPT('Tell me a joke.');


app.use(express.static('./public'))


const upload = multer({
  dest: './public/uploads/',
  limits:{
    fileSize: 1000000
  },
})
async function main() {
  try {
    const text = await tesseract.recognize("2.png", config)
    console.log("Result:", text)
  } catch (error) {
    console.log(error.message)
  }
}

main()



app.post('/file', upload.single('file-to-upload'), (req, res, next) => {
  console.log("req " + req);
  if (!req.file) {
    console.error(`No file selected`)
    return res.send({
      success: false
    })
  } else {
    console.log(`File uploaded`)
    res.send({
      success: true,
      file: req.file,
    })
  }
})


//app.use("/file", fileUpload);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))