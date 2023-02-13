type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  provider: "local" | "google" | "github";
  roles: string[];
  emailVerified: boolean;
};

export default User;
