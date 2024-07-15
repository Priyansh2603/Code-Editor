const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const filerouter = require('./routes/filerouter')
const authroute=  require("./routes/authroute.js")
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
function connectDB(){
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Database Connected!"));
}
connectDB();
app.use(cors())
app.use("/file",filerouter);
app.use("/auth",authroute);
app.get("/auth",(req,res)=>{res.send("<h1>Authentication Service...</h1>")})
app.listen(8000,()=>{
    console.log("Server running on port ",process.env.PORT)
})