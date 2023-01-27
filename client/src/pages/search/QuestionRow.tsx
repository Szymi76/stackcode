import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../types/Question";

interface QuestionRowProps {
  question: Question;
}

const QuestionRow = ({ question }: QuestionRowProps) => {
  const navigate = useNavigate();

  const date = new Date(question?.createdAt || "");
  moment.locale("pl");
  const time = moment(date).fromNow();

  return (
    <Flex
      bg="white"
      align="center"
      justify="space-between"
      border="1px solid"
      borderColor="light-gray"
      borderRadius={5}
      p=".75rem"
      px="1.25rem"
      flexGrow="1"
      transition="all .25s ease-out, opacity .25s ease-in-out .25s">
      <Stack spacing="xs" w="80%">
        <Text
          variant="h4"
          textOverflow="ellipsis"
          overflow="hidden"
          m="0"
          whiteSpace="nowrap"
          children={question.title}
          color={{ hover: "green" }}
          textDecoration={{ hover: "underline" }}
          cursor="pointer"
          onClick={() => navigate(`/pytanie/${question._id}`)}
        />
        <Text variant="body2" color="gray" m="0" children={time} />
      </Stack>
      <Text
        variant="h4"
        fontWeight="500"
        m="0"
        mr="2rem"
        children={question.votes.up.length - question.votes.down.length}
      />
    </Flex>
  );
};

export default QuestionRow;
