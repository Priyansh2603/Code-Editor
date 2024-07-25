const { join } = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');

async function compileAndRunJavaCode(code, inputs) {
    const scriptDir = __dirname;
    const language = 'java';

    // Paths for the code file and input file
    const fileName = join(scriptDir, `Main.${language}`);
    const inputFile = join(scriptDir, 'input.txt');
    const classFile = join(scriptDir, 'Main.class');

    try {
        // Write the code content to a temporary file in the script directory
        await fs.writeFile(fileName, code);
        await fs.writeFile(inputFile, inputs);

        const command = `javac "${fileName}" && java -cp "${scriptDir}" Main < "${inputFile}"`;

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error.message}`);
                try {
                    await fs.unlink(fileName);
                    await fs.unlink(inputFile);
                    await fs.unlink(classFile);
                } catch (cleanupError) {
                    console.error(`Cleanup error: ${cleanupError.message}`);
                }
                return error;
            }
            if (stderr) {
                console.error(`Compilation/Execution stderr: ${stderr}`);
                try {
                    await fs.unlink(fileName);
                    await fs.unlink(inputFile);
                    await fs.unlink(classFile);
                } catch (cleanupError) {
                    console.error(`Cleanup error: ${cleanupError.message}`);
                }
                return stderr;
            }
            console.log(`Output: ${stdout}`);
            
            // Cleanup: Remove temporary files
            try {
                await fs.unlink(fileName);
                await fs.unlink(inputFile);
                await fs.unlink(classFile);
            } catch (cleanupError) {
                console.error(`Cleanup error: ${cleanupError.message}`);
            }
            return stdout;
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        try {
            await fs.unlink(fileName);
            await fs.unlink(inputFile);
            await fs.unlink(classFile);
        } catch (cleanupError) {
            console.error(`Cleanup error: ${cleanupError.message}`);
        }
        return err.message;
    }
}
module.exports = compileAndRunJavaCode;