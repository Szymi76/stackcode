import React, { useState } from "react";
import { useGetUserMarkedQuestionsQuery } from "../../../../features/question/questionApiSlice";
import Question from "../../../../types/Question";
import * as List from "../../List";
import * as Rows from "./Rows";

const Marked = () => {
  const { data, isLoading, isError, refetch } = useGetUserMarkedQuestionsQuery();
  const [isAllShowed, setIsAllShowed] = useState(false);

  const questions: Question[] | undefined = isAllShowed ? data?.questions : data?.questions.slice(0, 3);

  const toggleIsAllShowed = () => setIsAllShowed(!isAllShowed);

  return (
    <List.Wrapper label="Zaznaczone pytania" refetch={refetch}>
      <List.Content>
        {isLoading || !questions ? <List.Loading /> : <Rows.All questions={questions} />}
        <List.Toggle
          isAllShowed={isAllShowed}
          toggleIsAllShowed={toggleIsAllShowed}
          lengthOfQuestions={data?.questions?.length ?? "..."}
        />
      </List.Content>
    </List.Wrapper>
  );
};

export default Marked;
