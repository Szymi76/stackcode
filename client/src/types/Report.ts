import User from "./User";

type Report = {
  _id: string;
  author: User | string;
  text: string;
  reasons: string[];
  for: "question" | "answer" | "comment" | "user";
  createdAt: Date;
  updatedAt: Date;
};

export default Report;
