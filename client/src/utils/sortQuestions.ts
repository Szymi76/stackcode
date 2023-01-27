import Question from "../types/Question";

type SearchTypes = {
  query: string;
  tags: string[];
  dateASC: boolean;
  votesASC: boolean;
};

type sortQuestionsArgs = (data: Question[], { query, tags, dateASC, votesASC }: SearchTypes) => Question[];

const sortQuestions: sortQuestionsArgs = (data, { tags, dateASC, votesASC }) => {
  let result = [...data];

  // tagi
  const tagsArr = tags.map((t) => t.toLocaleLowerCase());
  if (tags.length > 0)
    result = result.filter((q) => tagsArr.every((t) => q.tags.map((qt) => qt.toLowerCase()).includes(t)));

  // sortowanie według głosów
  result = result.sort((a, b) => b.votes.down.length + b.votes.up.length - a.votes.down.length + a.votes.up.length);
  if (!votesASC) result = result.reverse();

  // sortowanie według daty
  result = result.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  if (dateASC) result = result.reverse();

  return result;
};

export default sortQuestions;
