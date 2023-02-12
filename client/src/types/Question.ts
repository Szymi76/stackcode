import Answer from "./Answers";
import Report from "./Report";
import User from "./User";

type Question = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: User;
  views: number;
  votes: {
    up: string[];
    down: string[];
  };
  markedBy: string[];
  reports: Report[];
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
};

export default Question;
