const runCode = require('./runCodeExecution.js')
const codeRunner = async (req, res) => {
    const { code, language } = req.body;
  
    try {
      const output = await runCode(code, language);
      console.log("op: ",output);
      res.status(200).json({output});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  module.exports=codeRunner;