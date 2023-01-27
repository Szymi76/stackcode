import React, { useState } from "react";
import { useGetUserCreatedQuestionsQuery } from "../../features/question/questionApiSlice";
import { Stack } from "@welcome-ui/stack";
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import { Loader } from "@welcome-ui/loader";
import {
  LinkIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Question from "../../types/Question";
import { useAppSelector } from "../../app/hooks";
import User from "../../types/User";
import copyToClipboard from "../../utils/copyToClipboard";
import { useToast } from "@welcome-ui/toast";
import { useToggleMarkekQuestionMutation } from "../../features/question/questionApiSlice";
import { toggleMarked } from "../../features/question/questionSlice";
import { useNavigate } from "react-router-dom";
import { useModalState } from "@welcome-ui/modal";
import DeleteQuestionModal from "./DeleteQuestionModal";

const CreatedQuestions = () => {
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError, refetch } = useGetUserCreatedQuestionsQuery();
  const { user } = useAppSelector((state) => state.auth);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <Stack mt="2.5rem">
      {/* header */}
      <Flex align="center" justify="space-between">
        <Text variant="h3" my=".25rem" children="Twoje pytania" />
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
                <Row key={`row-${i}`} question={qn} user={user} index={i} showAll={showAll} refetch={refetch} />
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

export default CreatedQuestions;

interface RowProps {
  question: Question;
  user: User;
  index: number;
  showAll: boolean;
  refetch: () => void;
}

// pojedyńczy rekord pytania
const Row = ({ question, user, index, showAll, refetch }: RowProps) => {
  const [marked, setMarked] = useState(question.markedBy.includes(user.id));
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();
  const toast = useToast();
  const deleteModal = useModalState();
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
        mr="1rem"
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
      <Flex gap=".75rem">
        {/* link */}
        <LinkIcon className="move-down" height={30} onClick={() => copyToClipboard({ toast, text, toCopy })} />

        {/* liczba odpowiedzi */}
        <Box position="relative" mr=".25rem">
          <ChatBubbleBottomCenterTextIcon className="move-down" height={30} color="#3b82f6" />
          <Text position="absolute" right={-8} top={5} variant="body4" children={question.answers.length} />
        </Box>

        {/* edit */}
        <PencilSquareIcon
          className="move-down"
          height={30}
          color="#15803d"
          onClick={() => navigate(`/edytuj-pytanie/${question._id}`)}
        />

        {/* usuń */}
        <TrashIcon className="move-down" height={30} color="#ef4444" onClick={() => deleteModal.show()} />
      </Flex>
      {deleteModal.visible && <DeleteQuestionModal modal={deleteModal} question={question} onClose={refetch} />}
    </Flex>
  );
};
