type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  provider: "local" | "google" | "github";
  banned: {
    reason: string;
    by: string;
    until: Date;
  };
  roles: string[];
  emailVerified: boolean;
};

export default User;
