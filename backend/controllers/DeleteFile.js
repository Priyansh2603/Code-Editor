const { Project } = require("../model/file");
const getFile = require("./fileGet");

async function deleteFile(req, res) {
  try {
    const { userId, fileId } = req.body;

    // Validate that userId and fileId are provided
    if (!userId || !fileId) {
      return res.status(400).json({ error: 'userId and fileId are required in the request parameters' });
    }

    // Update the Project document to remove the file with the specified fileId
    const updatedProject = await Project.findOneAndUpdate(
      { userId },
      { $pull: { projects: { _id: fileId } } },
      { new: true }
    ).exec();

    if (!updatedProject) {
      return res.status(404).json({ error: 'User or file not found' });
    }
    const project = await Project.findOne({ userId });

    if (!project) {
      return res.status(404).json({ error: 'Files not found for the specified userId' });
    }

    const files = project.projects.map(file => ({
      _id: file._id,
      data: file.data.toString('utf8'), // Convert Buffer to string
      contentType: file.contentType,
      name: file.name,
    }));

    // Send the formatted files data as the response
    res.json({ userId, files,message:"File Deleted Successfully!" });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteFile;
