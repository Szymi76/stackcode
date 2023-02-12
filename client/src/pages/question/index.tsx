import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setQuestion } from "../../features/question/questionSlice";
import { useGetQuestionByIdQuery } from "../../features/question/questionApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// komponenty
import AppendAnswer from "./AppendAnswer";
import Answer from "./Answer/index";
import NotFound from "./NotFound";
import Question from "./Question/index";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { Loader } from "@welcome-ui/loader";
import { Text } from "@welcome-ui/text";

const QuestionPage = () => {
  const dispatch = useAppDispatch();
  const { questionId } = useParams();
  const { data, isLoading, isError } = useGetQuestionByIdQuery({ id: questionId! });
  const question = useAppSelector((state) => state.question);

  document.title = question?.title || "Stackcode";

  // ustawianie pytania
  useEffect(() => {
    const result = data ? data.question : null;
    dispatch(setQuestion(result));
  }, [data]);

  // ui dla ładowania i 404
  if (isLoading) return <Flex minH="100vh" pt="6rem" justify="center" children={<Loader color="green" />} />;
  if (!questionId || isError || !question) return <NotFound />;

  return (
    <Box minH="100vh" pt="4rem" bg="very-light-green">
      <Stack py="2rem" spacing="md" maxW="1200px" mx="auto">
        {/* pytanie */}
        <Question />

        {/* odpowiedzi */}
        <Stack mt="3rem">
          <Flex mx="5%">
            <Text variant="h3" children={`Liczba odpowiedzi - ${question.answers.length}`} />
          </Flex>
          {question.answers.map((ans, i) => (
            <Answer key={`answer-${i}`} answer={ans} index={i} />
          ))}
        </Stack>
        <Box>
          {/* dodawanie odpowiedzi */}
          <AppendAnswer />
        </Box>
      </Stack>
    </Box>
  );
};

export default QuestionPage;
