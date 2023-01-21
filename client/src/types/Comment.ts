import Report from "./Report";
import User from "./User";

type Comment = {
  _id: string;
  author: User;
  content: string;
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
};

export default Comment;
