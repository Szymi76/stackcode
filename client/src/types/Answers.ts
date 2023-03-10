import Comment from "./Comment";
import Report from "./Report";
import User from "./User";

type Answer = {
  _id: string;
  author: User & { _id: string };
  content: string;
  votes: {
    up: string[];
    down: string[];
  };
  views: number;
  verified: boolean;
  comments: Comment[];
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
};

export default Answer;
