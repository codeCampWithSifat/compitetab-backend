import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifire from "streamifier";
import "dotenv/config";

const router = express.Router();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

    // Function To Handle The stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        //  Use Streamfire to convert file buffer to a stream
        streamifire.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call The StreamUpload Function
    const result = await streamUpload(req.file.buffer);

    // response iwth uploaded image url
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
