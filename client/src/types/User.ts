type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  provider: "local" | "google" | "github";
  //   role: ["user", "moderator", "expert"]
  roles: string[];
  emailVerified: boolean;
};

export default User;
