// Assuming you have a Mongoose model named File
const { File } = require('../model/file');
const { Project } = require('../model/file');

const handleSaveFile = async (req, res) => {
  try {
    // Assuming you have the file buffer and mimetype available in req.file
    const { originalname, buffer } = req.file;
    const { name, userId} = req.body;

    // Create a new instance of the File model
    const newFile = {
      data: buffer,
      contentType: req.file.mimetype,
      name: name || originalname, // Use the provided name or the original name
    };


    // Save the file to MongoDB using Mongoose
    console.log(newFile);
    // const newProject = {projects:[...projects,newFile]};
   try{
    const conditions = { userId: userId };
    console.log("userId", userId);
    // Update the projects array field using findOneAndUpdate
    const find = await Project.findOne({userId:userId});
    console.log(find);
    const updatedProject = await Project.findOneAndUpdate(
      conditions,
      { $push: { projects: newFile } },
      { new: true }
    )
      .exec()

        console.log(updatedProject);
   }
      catch(error){
        console.error(error);
      };
    res.json({ message: 'File saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleSaveFile;
