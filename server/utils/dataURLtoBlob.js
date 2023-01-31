import { v4 as uuid } from "uuid";

function dataURLtoBlob(dataurl) {
  const filename = uuid();
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = dataurl.match(regex);
  const ext = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, "base64");
  return buffer;
}

export default dataURLtoBlob;
