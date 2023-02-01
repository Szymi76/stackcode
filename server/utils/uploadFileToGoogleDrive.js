import { google } from "googleapis";
import fs from "fs";
import { v4 as uuid } from "uuid";
import __dirname from "../config/serverDir.js";
import path from "path";

// przesyłanie pliku i zwracanie publicznego linku
const uploadFileToGoogleDrive = async (name, body) => {
  // klient z autoryzacją
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_SECRET,
    redirectUri: process.env.GOOGLE_DRIVE_REDIRECT_URI,
  });

  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });

  // dysk google
  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // przesyłanie pliku
    const uploadedFile = await uploadSingleFile(name, body, drive);
    // odebranie publicznego linku
    const publicLinks = await generatePublicURL(uploadedFile.id, drive);
    return { link: publicLinks.webContentLink, error: null };
  } catch (err) {
    return { link: null, error: { name: err.name, message: err.message, stack: err.stack } };
  }
};

export default uploadFileToGoogleDrive;

// przsyłanie pojedyńczego pliku do google drive
async function uploadSingleFile(name, body, drive) {
  const mimeType = "image/png";
  const filename = `${uuid()}.png`;
  const filepath = path.join(__dirname, "uploads", filename);
  fs.writeFileSync(filepath, body);

  const parents = [process.env.GOOGLE_DRIVE_BUCKET_ID];

  try {
    const response = await drive.files.create({
      requestBody: { name, mimeType, parents },
      media: { mimeType, body: fs.createReadStream(filepath) },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    fs.rmSync(filepath);
  }
}

// ustawianie pliku na publiczny oraz pobieranie publicznego linku
async function generatePublicURL(fileID, drive) {
  try {
    await drive.permissions.create({
      fileId: fileID,
      requestBody: { role: "reader", type: "anyone" },
    });

    const result = await drive.files.get({
      fileId: fileID,
      fields: "webViewLink, webContentLink",
    });

    return result.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
