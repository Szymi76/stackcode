import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetQuestionByTitleQuery } from "../../features/question/questionApiSlice";
import { useImmer } from "use-immer";

import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Stack } from "@welcome-ui/stack";
import Question from "./Question";
import QuestionType from "../../types/Question";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setQuestion } from "../../features/question/questionSlice";

const QuestionPage = () => {
  const dispatch = useAppDispatch();
  const { questionTitle } = useParams();
  const { data, isLoading, isError } = useGetQuestionByTitleQuery({ questionTitle: questionTitle! });
  const question = useAppSelector((state) => state.question);

  useEffect(() => {
    console.log(question);
  }, [question]);

  useEffect(() => {
    const result = data ? data.question : null;
    console.log(result);
    dispatch(setQuestion(result));
  }, [data]);

  if (!questionTitle || isError) return <div style={{ padding: "5rem" }}>Nie ma takiego pytania</div>;
  return (
    <Box minH="100vh" pt="4rem" bg="very-light-green">
      <Stack py="2rem" spacing="md" maxW="1200px" mx="auto">
        {question && <Question />}
      </Stack>
    </Box>
  );
};

export default QuestionPage;
