import express from 'express';
import { recognize } from "node-tesseract-ocr";



const config = {
    lang: "eng", // default
    oem: 3,
    psm: 3,
  }
  
const imageToText = async (req, res) => {
   /// console.log("Req" + JSON.stringify(req));
    try {
        const {image } = req.body;
        console.log("image" + image);



        const text = await recognize("1.png", config)
        console.log("Result:", text)
      } catch (error) {
        console.log(error.message)
      }

}


export default imageToText;
