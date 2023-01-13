import { config } from "dotenv";
import path from "path";
import __dirname from "./serverDir.js";

config({ path: path.join(__dirname, ".env.local") });

const corsOptions = {
  // allowedHeaders: [],
  credentials: true,
  // exposedHeaders: [],
  // methods: [],
  origin: [process.env.DEV_CLIENT_URL, process.env.PROD_CLIENT_URL],
};

export default corsOptions;
