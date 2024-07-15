const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      picture: {
        type: String, // MIME type of the image
      },
      gender: {
        type: String,
      },
      age: {
        type: Number,
      },
      interests: {
        type: [String],
      },
      bio:{
        type:String
      }
}, { timestamps: true });
const Auth = mongoose.model("Auth",authSchema);
module.exports = {Auth}