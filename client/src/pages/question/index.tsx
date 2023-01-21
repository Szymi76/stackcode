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
import { Loader } from "@welcome-ui/loader";
import NotFound from "./NotFound";
import Answer from "./Answer";
import Editor from "../../components/Editor";
import Response from "./Response";
import { Text } from "@welcome-ui/text";

const QuestionPage = () => {
  const dispatch = useAppDispatch();
  const { questionTitle } = useParams();
  const { data, isLoading, isError } = useGetQuestionByTitleQuery({ questionTitle: questionTitle! });
  const question = useAppSelector((state) => state.question);

  // ustawianie pytania
  useEffect(() => {
    const result = data ? data.question : null;
    dispatch(setQuestion(result));
  }, [data]);

  // ui dla ładowania i pytania nie znaleziono
  if (isLoading) return <Flex minH="100vh" pt="6rem" justify="center" children={<Loader color="green" />} />;
  if (!questionTitle || isError || !question) return <NotFound />;

  return (
    <Box minH="100vh" pt="4rem" bg="very-light-green">
      <Stack py="2rem" spacing="md" maxW="1200px" mx="auto">
        <Question />
        <Stack mt="3rem">
          <Flex mx="5%">
            <Text variant="h3" children={`Liczba odpowiedzi ${question.answers.length}`} />
          </Flex>
          {question.answers.map((ans, i) => (
            <Answer key={`answer-${i}`} answer={ans} />
          ))}
        </Stack>
        <Box>
          <Response />
        </Box>
      </Stack>
    </Box>
  );
};

export default QuestionPage;
