//Modules import here
const express = require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
//import dotenv from "dotenv";
const app = express();
const cors = require("cors");
const path =require('path');

//Files import here
const PORT =  4000; //process.env.PORT;
import routerUser from  "./routes/user.js";
import routerNft from "./routes/nft"
import routerCollection from "./routes/collection"


//Include in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')))

//Database Connections
mongoose.connect(
    'mongodb://0.0.0.0:27017/fractodb',
    { useNewUrlParser: true }
).then(()=> {
    console.log("database is connected");
});

app.get('/',(req,res)=>{
    return res.send("hello world");
})

app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
});

app.use("/user", routerUser);
app.use("/nft",routerNft);
app.use("/collection",routerCollection);

module.exports = app;
