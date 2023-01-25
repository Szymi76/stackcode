import { config } from "dotenv";
import path from "path";
import __dirname from "./serverDir.js";

const envPath = process.env.NODE_ENV == "dev" ? `${__dirname}/.env.local` : "/etc/secrets/.env";

config({ path: path.join(envPath) });

const corsOptions = {
  // allowedHeaders: [],
  credentials: true,
  // exposedHeaders: [],
  // methods: [],
  origin: [process.env.DEV_CLIENT_URL, process.env.PROD_CLIENT_URL, "https://app.stackcode.win"],
};

export default corsOptions;
