const formatError = ({ name, message, stack }) => {
  try {
    // jeśli serwer jest w produkcji
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV != "dev") return { name: "Error", message: "Something went wrong", files: [] };

    // tablica plików z błędami
    const pattern = /\((.*?)\)/g;
    const files = stack.match(pattern);

    return { name, message, files };
  } catch (err) {
    console.log(err);
    return { name: "Error", message: "Format error !?", files: [] };
  }
};

export default formatError;
