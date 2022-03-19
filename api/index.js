const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const authRouthe = require('./routhes/authRouthe')
const ProductRouthe = require('./routhes/productRouthe')
const BasketRouthe = require('./routhes/basketRouthe')

require('dotenv').config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://e-commercesamir.herokuapp.com/", // <-- location of the react app were connecting to
    credentials: true,
  })
);
 
mongoose 
  .connect('mongodb+srv://samir:test1234@cluster0.1v5vw.mongodb.net/yenie-comerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '/images')
  },
  filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, originalname);  
  }
})
const upload = multer({ storage }); 


app.post('/upload', upload.array('avatar'), (req, res) => {
  return res.json({ status: 'OK', uploaded: req.files.length });
});





app.use(authRouthe)
app.use(ProductRouthe)
app.use(BasketRouthe)


app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



app.listen(process.env.PORT || 4000, () => {
    console.log("Server Has Started");
  });


