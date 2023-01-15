const getUser = async (req, res) => {
  const payload = {
    id: req.user._id.toString(),
    displayName: req.user.displayName,
    email: req.user.email,
    photoURL: req.user.photoURL,
    provider: req.user.provider,
    roles: req.user.roles,
    emailVerified: req.user.emailVerified,
  };

  res.status(200).json({ user: payload });
};

export default getUser;
