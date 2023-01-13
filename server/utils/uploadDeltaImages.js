import fs from "fs";
import { v4 as uuid } from "uuid";
import path from "path";
import __dirname from "../config/serverDir.js";

const uploadDeltaImages = (delta) => {
  const { NODE_ENV, DEV_HOST_URL, PROD_HOST_URL } = process.env;
  const SERVER_URL = NODE_ENV === "dev" ? DEV_HOST_URL : PROD_HOST_URL;

  try {
    delta.ops.forEach((row) => {
      if (row.insert && row.insert.image && !row.insert.image.startsWith("http")) {
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

    return delta;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default uploadDeltaImages;
