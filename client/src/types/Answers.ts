import Comment from "./Comment";
import Report from "./Report";
import User from "./User";

type Answer = {
  _id: string;
  author: User | string;
  content: object;
  votes: {
    up: User[] | string[];
    down: User[] | string[];
  };
  views: number
  verified: boolean;
  comments: Comment[];
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
};

export default Answer;
