const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
   data: Buffer,
   contentType: String,
   name: String
});
const projectSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   Username:{type:String, required:true},
   projects: [fileSchema]}
   , { timestamps: true })
const File = mongoose.model('File', fileSchema);
const Project = mongoose.model('Project',projectSchema);
module.exports = {File,Project};
