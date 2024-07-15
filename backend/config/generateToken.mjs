import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'url';
import { dirname } from 'path';
const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

dotenv.config({ path: 'config/config.env' }); // Adjust the path as needed

const generateToken = (id) => {
    console.log("secret:", process.env.JWT_SECRET);
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export {generateToken};
