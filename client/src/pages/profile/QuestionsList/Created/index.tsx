import React, { useState } from "react";
import { useGetUserCreatedQuestionsQuery } from "../../../../features/question/questionApiSlice";

// komponenty
import Question from "../../../../types/Question";
import * as List from "../../List";
import * as Rows from "./Rows";

const Created = () => {
  const { data, isLoading, isError, refetch } = useGetUserCreatedQuestionsQuery();
  const [isAllShowed, setIsAllShowed] = useState(false);

  const questions: Question[] | undefined = isAllShowed ? data?.questions : data?.questions.slice(0, 3);

  const toggleIsAllShowed = () => setIsAllShowed(!isAllShowed);

  return (
    <List.Wrapper label="Zaznaczone pytania" refetch={refetch}>
      <List.Content>
        {isLoading || !questions ? <List.Loading /> : <Rows.All questions={questions} refetch={refetch} />}
        <List.Toggle
          isAllShowed={isAllShowed}
          toggleIsAllShowed={toggleIsAllShowed}
          lengthOfQuestions={data?.questions?.length ?? "..."}
        />
      </List.Content>
    </List.Wrapper>
  );
};

export default Created;
