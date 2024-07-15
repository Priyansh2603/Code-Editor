const util = require('util');
const { exec } = require('child_process');
const fs = require('fs').promises;
const { join } = require('path');

const runCode = async (code, language) => {
  try {
    // Get the directory of the script
    const scriptDir = __dirname;

    // Write the code content to a temporary file in the script directory
    const fileName = join(scriptDir, `Main.${language}`);
    await fs.writeFile(fileName, code);

    // Execute the code from the temporary file
    const command = language === 'javascript' ? `node "${fileName}"` : language === 'python' ? `python "${fileName}"` : language === 'c++' ? `g++ -o "${fileName.replace(/\.\w+$/, '')}" "${fileName}" && "${fileName.replace(/\.\w+$/, '')}"` : language === 'java' ? `javac "${fileName}" && java "${fileName.replace(/\.\w+$/, '')}"` : 'exit';
    const { stdout, stderr } = await util.promisify(exec)(command);
    console.log("Code:",code)
    console.log("Command:",command)
    console.log("Op",stdout)
    // Delete the temporary file after execution
    await fs.unlink(fileName);
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  } catch (error) {
    throw new Error(`Error executing code: ${error.message}`);
  }
};

module.exports = runCode;
