const { Auth } = require("../model/userauthModel.js");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const  generateToken  = import('../config/generateToken.mjs');
const { Project } = require('../model/file.js')
// const nodemailer = require('nodemailer');
const saltRounds = 10;
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'ishudaksh2603@gmail.com',
//       pass: 'Ishu@2603',
//     },
//   });
  
//   // Function to send an email
//   async function sendEmail(to, text) {
//     const mailOptions = {
//       from: 'your_email@gmail.com',
//       to: to,
//       subject: "Registered to Shoeping!!",
//       text: text,
//       // You can also use HTML in the email body:
//       // html: '<p>HTML content of the email</p>',
//     };
  
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent: ' + info.response);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   }
async function authLogin(req,res){
    const {email,password} = req.body;
    console.log(email," ",password)
    try{
        const user = await Auth.findOne({email:email});
        if(user){
            bcrypt.compare(password, user.password, (compareErr, result) => {
                if (compareErr) {
                  console.error('Error comparing passwords:', compareErr);
                }
                if (result) {
                    // const resUser = {...user,token:generateToken(user._id)};
                    res.status(200).json(user);
                    console.log(user)
                  console.log('Password Matched! Login Successful');
                } else {
                    res.send("Incrorrect")
                  console.log('Incorrect Password. Login Failed');
                }
              });
        }
        else {
            res.json("notexist");
        }
    }catch(e){
        console.log(e);
        res.json(e.toString());
    }

}
const authRegister = async(req,res)=>{
    const {name,lastname,email,password,picture,gender,age,interests,} = req.body;
    try{
        const user = await Auth.findOne({email:email});
        if(user){
            const response = {...user,exist:"true"}
            return res.status(500).json(response);
        }
        try {
            const hashPass = bcrypt.hashSync(password, saltRounds);
            // Store the 'hash' value in your database for this user
           
        const data = {
            name: name,
            lastname: lastname,
            email: email,
            password: hashPass,
            picture: picture,
            gender: gender,
            age: age,
            interests: interests,
          };
          console.log(data)
          // sendEmail(email,`{"Dear ${name},}`+'/n'+ "We Welcome you at Shoeping, Thank You for choosing us /n Explore new world of online shopping with us we respect our customers...")
          await Auth.insertMany([data]);
          const userData = await Auth.findOne({email:email});
          const newProject = new Project({
            userId : userData._id,
            Username: userData.name,
            projects:[]
          })
          newProject.save();
          if(userData){
            console.log(userData);
            // const response = {...userData,exist:"false",token:generateToken(userData._id)};
            const response = {...userData,exist:"false"};
            console.log(response)
            res.status(201).json(response); 
          }
          console.log('Hashed Password:', hashPass);
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json('Error creating user');
        }
    }catch(e){
        console.error('Error checking for existing user:', e);
        res.status(500).json('Error checking for existing user');
    }
}
const getUser = async(req,res)=>{
    const {user_id} = req.body;
    console.log("in getuser user_id:",user_id)
    if(mongoose.Types.ObjectId.isValid(user_id)){
        const user = await Auth.findById(user_id);
        res.json(user);
    }
    else{
        res.send("false")
    }
}
const updateUser = async(req,res)=>{
    console.log("body ",req.body);
    const {userId} = req.body;
    const updatedData = req.body;
    console.log("In update user_id:",userId)
    if(mongoose.Types.ObjectId.isValid(userId)){
        const newuser = await Auth.findByIdAndUpdate(userId,updatedData,{new:true});
        res.json(newuser)
    }
    else{
        res.send("false")
    }
}
module.exports = {authLogin,authRegister,getUser,updateUser}