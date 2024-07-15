const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const filerouter = require('./routes/filerouter')
const authroute=  require("./routes/authroute.js")
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();
const path = require('path');
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Deployment logic
const __dirname1 = path.resolve(__dirname, '..');; // Adjust the base directory path

if (process.env.NODE_ENV === 'Production') {
    // Serve static files from the 'coderunner/build' directory
    app.use(express.static(path.join(__dirname1, 'coderunner', 'build')));

    // Serve the index.html file for any other routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'coderunner', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API Running Successfully!');
    });
}
//Deployment logic
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