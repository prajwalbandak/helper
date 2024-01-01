import express from 'express'
import tesseract from "node-tesseract-ocr"
////import fileUpload from "./routes/fileupload.route.js"
// const bodyParser = require("body-parser");
// const morgan = require('morgan')
// const multer = require('multer')
import multer from 'multer'
import axios from 'axios'
const app = express()
const port = 3000

// app.use(morgan('dev'))


// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.use(express.static('./public'))

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
const config = {
  lang: "eng", // default
  oem: 3,
  psm: 3,
}
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


app.post('/api/chat', async (req, res) => {
  const { message } = req.body
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens:200
      });
  
   res.json({ response: completion.data.choices[0].text })
    });

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