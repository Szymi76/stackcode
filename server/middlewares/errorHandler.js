import formatError from "../utils/formatError.js";

const errorHandler = (err, req, res, next) => {
  console.log("------- ERROR -------");
  console.log(err);
  // console.log(err.toString());
  res.status(500).json(formatError(err));
};

export default errorHandler;
