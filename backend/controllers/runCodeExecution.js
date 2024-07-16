const util = require('util');
const { exec } = require('child_process');
const fs = require('fs').promises;
const { join } = require('path');

const getCommand = (language, fileName,outputFileName) => {
  switch (language) {
      case 'javascript':
          return `node "${fileName}"`;
      case 'python':
          return `python "${fileName}"`;
      case 'c++':
        return `g++ -o "${outputFileName}" "${fileName}" && "${outputFileName}"`;
      case 'cpp':
        return `g++ -o "${outputFileName}" "${fileName}" && "${outputFileName}"`;
      case 'java':
        return `javac "${fileName}" && java "${outputFileName}"`;
      default:
          return 'exit';
  }
};
const runCode = async (code, language) => {
  try {
    // Get the directory of the script
    const scriptDir = __dirname;

    // Write the code content to a temporary file in the script directory
    const fileName = join(scriptDir, `Main.${language}`);
    await fs.writeFile(fileName, code);
    const outputFileName = join(scriptDir, `MainOutput.${language}`);
    // Execute the code from the temporary file
    const command = getCommand(language,fileName, outputFileName);
    console.log(code);
    const { stdout, stderr } = await util.promisify(exec)(command);
    console.log("Code:",code)
    console.log("Command:",command)
    console.log("Op",stdout)
    // Delete the temporary file after execution
    await fs.unlink(fileName);
    if (language === 'c++') {
      await fs.unlink(outputFileName);
    } else if (language === 'java') {
      await fs.unlink(`${outputFileName}.class`);
    }
    if (stderr) {
      // throw new Error(stderr);
      // console.log(stderr);
      return error;
    }
    return stdout;
  } catch (error) {
    console.log(error);
    const scriptDir = __dirname;
    const fileName = join(scriptDir, `Main.${language}`);
    await fs.unlink(fileName);
    const errorLines = error.message.split('\n').slice(2).join('\n');
    const formattedError = `Error: \n${errorLines}`;
    return formattedError;
  }
};

module.exports = runCode;
