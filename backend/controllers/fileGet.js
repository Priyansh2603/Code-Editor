const { Project } = require("../model/file");

async function getFile(req, res) {
  try {
    const { userId } = req.body; // Assuming userId is a route parameter

    // Validate that userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request parameters' });
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
    res.json({ userId, files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getFile;
