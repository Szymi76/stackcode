const formatUser = (user) => {
  return {
    id: user._id.toString(),
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    provider: user.provider,
    roles: user.roles,
    emailVerified: user.emailVerified,
  };
};

export default formatUser;
