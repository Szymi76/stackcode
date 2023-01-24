import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import errorHandler from "./middlewares/errorHandler.js";
import __dirname from "./config/serverDir.js";
import dbConnect from "./config/dbConnect.js";
import path from "path";
import corsOptions from "./config/corsOptions.js";

import authRouter from "./routes/auth.js";
import questionRouter from "./routes/question.js";
import questionsRouter from "./routes/questions.js";
import reportRouter from "./routes/report.js";
import commentRouter from "./routes/comment.js";
import answerRouter from "./routes/answer.js";

const envPath = process.env.NODE_ENV == "dev" ? ".env.local" : ".env";
// konfiguracja .env.local
config({ path: path.join(__dirname, envPath) });

// port
const PORT = process.env.PORT || 3000;

// połączenie z bazą danych
dbConnect();

// podstawowa konfiguracja
const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(passport.initialize());

// proxy
app.set("trust proxy", 1);

// statyczna ścieżka dla zdjęć
app.use("/images", express.static(path.join(__dirname, "uploads")));

// endpoints
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/report", reportRouter);
app.use("/api/comment", commentRouter);
app.use("/api/answer", answerRouter);

app.post("/test", (req, res) => {
  const cookies = req;

  res.status(200).json({ req });
});

// error handler
app.use(errorHandler);

// nasłuchiwanie
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
