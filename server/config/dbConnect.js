import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.set("strictQuery", true);
  // mongoose.set("strictPopulate", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((value) => {
      console.log("Połączono z bazą danych");
    })
    .catch((err) => {
      console.log("Nie udało połączyć się z bazą dancyh");
      console.log(err);
    });
};

export default dbConnect;
