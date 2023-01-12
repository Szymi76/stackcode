const errorHandler = (err, req, res, next) => {
  console.log("------- ERROR -------");
  console.log(err);
  // console.log(err.toString());
  res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;
