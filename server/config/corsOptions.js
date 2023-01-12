const corsOptions = {
  // allowedHeaders: [],
  credentials: true,
  // exposedHeaders: [],
  // methods: [],
  origin: [process.env.DEV_HOST_URI, process.env.PROD_HOST_URI],
};

export default corsOptions;
