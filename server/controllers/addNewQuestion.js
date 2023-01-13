import { v4 as uuid } from "uuid";
import __dirname from "../config/serverDir.js";
import fs from "fs";
import Question from "../models/Question.js";
import path from "path";

const addNewQuestion = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags)
      return res.status(400).json({ message: "Required data is missing" });

    const { NODE_ENV, DEV_HOST_URL, PROD_HOST_URL } = process.env;
    const SERVER_URL = NODE_ENV === "dev" ? DEV_HOST_URL : PROD_HOST_URL;

    if (!content.ops || !Array.isArray(content.ops))
      return res.status(400).json({ message: "Delta have wrong structure" });

    const questionWithGivenTitle = await Question.findOne({ title }).exec();
    if (questionWithGivenTitle)
      return res.status(409).json({ message: "Question with provided title already exists" });

    // podmienienie każdego zdjęcia jako dataURL na link do prawdziwego pliku na serwerze
    content.ops.forEach((row) => {
      if (row.insert && row.insert.image) {
        const dataURL = row.insert.image;
        const filename = uuid();
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = dataURL.match(regex);
        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        const filepath = path.join(__dirname, "uploads", `${filename}.${ext}`);
        fs.writeFileSync(filepath, buffer);
        const imageURL = `${SERVER_URL}/images/${filename}.${ext}`;
        row.insert.image = imageURL;
      }
    });

    await new Question({ author: req.user._id, title, content, tags }).save();

    res.status(201).json({ message: "New question was added" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default addNewQuestion;
