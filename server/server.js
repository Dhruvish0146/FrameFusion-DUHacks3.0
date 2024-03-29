const express = require('express')
require("dotenv").config();
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express()
// const cookieParser = require("cookie-parser");
const path = require('path');
const { putObject } = require('./s3');
app.use(cors());

const artistRoutes = require("./routes/artistRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const artRoutes = require("./routes/artRoutes");
const orderRoutes = require("./routes/orderRoutes");

if(!process.env.JWT_SECERT){
  console.log("FATAL ERROR: JWT_SECERT is not defined.");
  process.exit(1);
}


//mongoose connection
require("./config/configuration").connect();

//use bodyparser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use(express.json())

//routes
app.use("/user",userRoutes)
app.use("/artist", artistRoutes);
app.use("/api/auth", authRoutes);
app.use("/art",artRoutes)
app.use("/order",orderRoutes);

app.post('/api/upload', async (req, res) => {
  try {
      let { filename, contentType } = req.body;
      const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-');
      filename = currentDateTime+"-"+filename;
      const url = await putObject(filename, contentType);
      const objectUrl = `https://framefusion-art.s3.ap-south-1.amazonaws.com//uploads/user-uploads/${encodeURIComponent(filename)}`;


      res.json({ url, objectUrl });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.use("/api/community", community); //it will display latest uploads and latest artist profile




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is starting at PORT ${PORT}`);
  });


