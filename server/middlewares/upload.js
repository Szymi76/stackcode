import multer from "multer";
import __dirname from "../config/serverDir.js";
import path from "path";

const dest = path.join(__dirname, "uploads");
const upload = multer({ dest });

export default upload;
