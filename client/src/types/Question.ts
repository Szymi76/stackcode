import Answer from "./Answers";
import Report from "./Report";
import User from "./User";

type Question = {
  _id: string;
  title: string;
  content: object;
  tags: string[];
  author: User;
  views: number;
  votes: {
    up: User[] | string[];
    down: User[] | string[];
  };
  markedBy: User[] | string[];
  reports: Report[];
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
};

export default Question;
