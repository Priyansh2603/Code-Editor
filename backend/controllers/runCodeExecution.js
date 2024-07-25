const util = require('util');
const { exec } = require('child_process');
const fs = require('fs').promises;
const { join } = require('path');
const compileAndRunJavaCode = require('./runJavaCode');
const getCommand = (language, fileName, outputFileName, inputFile) => {
  switch (language) {
    case 'javascript':
      return `node "${fileName}" < "${inputFile}"`;
    case 'python':
      return `python "${fileName}" < "${inputFile}"`;
    case 'c++':
    case 'cpp':
      return `g++ -o "${outputFileName}" "${fileName}" && "${outputFileName}" < "${inputFile}"`;
    case 'java':
      return `javac "${fileName}" && java "${outputFileName}" < "${inputFile}"`;
    default:
      return 'exit';
  }
};
const runCode = async (code, language, inputs) => {
  if(language==='java'){
    compileAndRunJavaCode(code,inputs);
    return;
  }
  try {
    // Get the directory of the script
    const scriptDir = __dirname;

    // Write the code content to a temporary file in the script directory
    const fileName = join(scriptDir, `Main.${language}`);
    await fs.writeFile(fileName, code);
    const outputFileName = join(scriptDir, language=='java'?`Main`:`MainOutput`);
    const inputFile = join(scriptDir, 'input.txt');
    await fs.writeFile(inputFile, inputs);
    // Execute the code from the temporary file
    const command = getCommand(language,fileName, outputFileName,inputFile);
    // console.log(code,inputs);
    const { stdout, stderr } = await util.promisify(exec)(command);
    // console.log("Code:",code)
    // console.log("Command:",command)
    // console.log("Op",stdout)
    // Delete the temporary file after execution
    await fs.unlink(fileName);
    await fs.unlink(inputFile);
    if (language === 'c++' || language === 'cpp') {
      await fs.unlink(outputFileName);
    } else if (language === 'java') {
      await fs.unlink(`${outputFileName}.class`);
    }
    if (stderr) {
      // throw new Error(stderr);
      console.log(stderr);
      await fs.unlink(inputFile);
      return stderr;
    }
    return stdout;
  } catch (error) {
    console.log(error);
    const scriptDir = __dirname;
    const fileName = join(scriptDir, `Main.${language}`);
    await fs.unlink(fileName);
    // await fs.unlink('input.txt');
    const errorLines = error.message.split('\n').slice(2).join('\n');
    const formattedError = `Error: \n${errorLines}`;
    return formattedError;
  }
  // finally {
  //   // Cleanup: Delete the temporary file after execution
  //   await fs.unlink(fileName).catch(() => {});
  //   if (language === 'c++' || language === 'cpp' || language === 'java') {
  //     await fs.unlink(outputFileName).catch(() => {});
  //     if (language === 'java') {
  //       await fs.unlink(`${outputFileName}.class`).catch(() => {});
  //     }
  //   }
  // }
};

module.exports = runCode;
