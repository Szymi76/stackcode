import React, { useState } from "react";
import { useGetUserMarkedQuestionsQuery } from "../../features/question/questionApiSlice";
import { Stack } from "@welcome-ui/stack";
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { Loader } from "@welcome-ui/loader";
import { ClockIcon, LinkIcon, StarIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Question from "../../types/Question";
import { useAppSelector } from "../../app/hooks";
import User from "../../types/User";
import copyToClipboard from "../../utils/copyToClipboard";
import { useToast } from "@welcome-ui/toast";
import { useToggleMarkekQuestionMutation } from "../../features/question/questionApiSlice";
import { toggleMarked } from "../../features/question/questionSlice";
import { useNavigate } from "react-router-dom";

const MarkedQuestions = () => {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, isError, refetch } = useGetUserMarkedQuestionsQuery();
  const { user } = useAppSelector((state) => state.auth);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <Stack mt="2.5rem">
      {/* header */}
      <Flex align="center" justify="space-between">
        <Text variant="h3" my=".25rem" children="Zaznaczone pytania" />
        <ArrowPathIcon className="move-down" height={30} onClick={refetch} />
      </Flex>

      {/* kontent */}
      <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
        {isLoading ? (
          // ładowanie
          <Flex py="2rem" justify="center" children={<Loader color="green" />} />
        ) : (
          // lista pytań
          <Stack>
            {data &&
              user &&
              data.questions.map((qn, i) => (
                <Row key={`row-${i}`} question={qn} user={user} index={i} showAll={showAll} />
              ))}
          </Stack>
        )}

        {/* pokaż wszytskie lub ukryj */}
        <Text
          textAlign="center"
          variant="body3"
          color="green"
          textDecoration="underline"
          children={showAll ? "ukryj" : "pokaż wszystkie"}
          cursor="pointer"
          onClick={toggleShowAll}
          m="0"
        />
      </Stack>
    </Stack>
  );
};

export default MarkedQuestions;

interface RowProps {
  question: Question;
  user: User;
  index: number;
  showAll: boolean;
}

// pojedyńczy rekord pytania
const Row = ({ question, user, index, showAll }: RowProps) => {
  const [marked, setMarked] = useState(question.markedBy.includes(user.id));
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const toCopy = `${location.origin}/pytanie/${question._id}`;
  const text = "Skopiowano link";

  const show = !showAll && index >= 3 ? false : true;

  const handleToggleMarked = async () => {
    await toggleMarkedAsync({ questionID: question._id }).unwrap();
    setMarked(!marked);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="light-gray"
      display={show ? "flex" : "none"}>
      {/* tytył */}
      <Text
        variant="h4"
        w="50%"
        my=".75rem"
        fontWeight="500"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        cursor="pointer"
        color={{ hover: "green" }}
        textDecoration={{ hover: "underline" }}
        transitionDuration={50}
        children={question.title}
        onClick={() => navigate(`/pytanie/${question._id}`)}
      />

      {/* ikony */}
      <Flex gap=".5rem">
        <LinkIcon className="move-down" height={30} onClick={() => copyToClipboard({ toast, text, toCopy })} />
        <StarIcon
          className="move-down"
          height={30}
          color={marked ? "#f5bf42" : "none"}
          fill={marked ? "#f5bf42" : "none"}
          onClick={handleToggleMarked}
        />
      </Flex>
    </Flex>
  );
};
