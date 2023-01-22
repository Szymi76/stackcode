import ReactQuill from "react-quill";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAddAnswerMutation } from "../../features/answer/answerApiSlice";
import { addAnswer } from "../../features/question/questionSlice";

// komponenty
import Editor from "../../components/Editor";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";
import { Flex } from "@welcome-ui/flex";
import { Loader } from "@welcome-ui/loader";

const AddAnswer = () => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<ReactQuill>(null);
  const { question, auth } = useAppSelector((state) => state);
  const [addAnswerAsync, { isLoading, isError }] = useAddAnswerMutation();

  // przesyłanie odpowiedzi na pytanie
  const handleSubmit = async () => {
    if (!question || !auth.user) return;

    const content = editorRef.current?.getEditor().getContents();
    if (!content || content.length() <= 1) return;

    const { answer } = await addAnswerAsync({ questionID: question?._id, content }).unwrap();
    dispatch(addAnswer({ answer }));
    editorRef.current?.editor?.setText("");
  };

  const text =
    question?.answers.length == 0
      ? "Bądź pierwszym który odpowie na to pytanie"
      : "Znasz odpowiedź i nie widzisz jej powyżej - Napisz ją";

  return (
    <Flex direction="column" gap=".5rem" mt="3rem" mx="5%">
      <Text variant="h3" m="0" children={text} />

      {/* edytor */}
      <Box bg="white">
        <Editor ref={editorRef} style={{ editor: { height: "300px" } }} />
      </Box>

      {/* przycisk */}
      <Button w="175px" px="1rem" alignSelf="end" disabled={isLoading} onClick={handleSubmit}>
        {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
        Prześlij
      </Button>
    </Flex>
  );
};

export default AddAnswer;
