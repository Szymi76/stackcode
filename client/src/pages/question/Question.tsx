import useOnScreen from "../../hooks/useOnScreen";
import moment from "moment";
import useOpenImages from "../../hooks/useOpenImages";
import copyToClipboard from "../../utils/copyToClipboard";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useToast } from "@welcome-ui/toast";
import { toggleMarked, toggleQuestionVote } from "../../features/question/questionSlice";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import {
  useToggleQuestionVoteMutation,
  useToggleMarkekQuestionMutation,
} from "../../features/question/questionApiSlice";

// komponenty
import ReportModal from "../../components/ReportModal";
import {
  StarIcon,
  LinkIcon,
  FlagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";
import { useModalState } from "@welcome-ui/modal";

const Question = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modal = useModalState();
  const [showRightSide, setShowRightSide] = useState(false);
  const { question } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleQuestionVoteMutation();
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();

  // hook do otwierania zdjęć w nowej karcie
  useOpenImages("quill-result");

  const wrapperRef = useRef<HTMLDivElement>(null);
  // const visible = useOnScreen(wrapperRef);

  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(question.content.ops, {}).convert();

  // zmiana głosu na pytanie
  const handleToggleVote = async (vote: "up" | "down") => {
    if (!user || !question) return;
    const { votes } = await toggleVoteAsync({ questionID: question?._id, vote }).unwrap();
    dispatch(toggleQuestionVote({ votes }));
  };

  // zaznaczanie / odznaczanie pytania
  const handleToggleMarked = async () => {
    if (!user || !question) return;
    const { markedBy } = await toggleMarkedAsync({ questionID: question._id }).unwrap();
    dispatch(toggleMarked({ markedBy }));
  };

  // sprawdzanie czy użytkownik zagłosował i czy zadał pytanie
  const voted = (vote: "up" | "down") => question?.votes[vote].includes(user?.id || "");
  const marked = question?.markedBy.includes(user?.id || "");

  // ile czasu temu pytanie zostało napisane
  const date = new Date(question?.createdAt || "");
  moment.locale("pl");
  const time = moment(date).fromNow();

  return (
    <Flex ref={wrapperRef} position="relative">
      {/* lewa kolumna */}
      <Stack w="5%" px="1.25rem" display={{ _: "none", md: "flex" }} alignItems="center" spacing="md">
        {/* strzałka w góre */}
        <ChevronUpIcon
          className="move-down"
          height={30}
          color={voted("up") ? "#3aafa9" : "black"}
          title="Głosuj za"
          onClick={() => handleToggleVote("up")}
        />

        {/* bilans głosów */}
        <Text
          variant="h3"
          fontWeight="500"
          m="0"
          color="black"
          children={question && question?.votes.up.length - question?.votes.down.length}
        />

        {/* strzałka w dół */}
        <ChevronDownIcon
          className="move-down"
          height={30}
          style={{ cursor: "pointer" }}
          color={voted("down") ? "#3aafa9" : "black"}
          title="Głosuj przeciw"
          onClick={() => handleToggleVote("down")}
        />
      </Stack>

      {/* środek */}
      <Stack
        w={{ _: "95%", md: "90%" }}
        mx="auto"
        position="relative"
        p="1.5rem"
        bg="white"
        border="1px solid"
        borderColor="light-gray"
        borderRadius="5">
        {/* góra */}
        <Stack>
          {/* tytuł */}
          <Text variant="h3" m="0" mr="1rem" color="black" children={question?.title} />

          {/* tagi */}
          <Flex gap=".25rem">
            {question?.tags.map((tag, i) => (
              <Tag key={`tag-${i}`} variant="3" children={tag} size="sm" />
            ))}
          </Flex>

          {/* czas */}
          <Text variant="body2" mt="0" color="gray" children={time} />
        </Stack>

        {/* kontent */}
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />

        {/* dół */}
        <Flex justify="space-between">
          <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${question?.views}`} />
          <Text m="0" variant="body3" color="gray" children={`Autor: ${question?.author.displayName}`} />
        </Flex>

        {/* 3 kropki - menu */}
        <Box display={{ _: "block", md: "none" }} bg="white" position="absolute" top="1rem" right=".5rem">
          <EllipsisVerticalIcon
            height={30}
            style={{}}
            color={showRightSide ? "#3aafa9" : "gray"}
            onClick={() => setShowRightSide(!showRightSide)}
            cursor="pointer"
          />
        </Box>
      </Stack>

      {/* prawa kolumna */}
      <Stack
        w="5%"
        px="1.25rem"
        alignItems="center"
        spacing="md"
        position={{ _: "absolute", md: "unset" }}
        display={{ _: showRightSide ? "flex" : "none", md: "flex" }}
        top="3.5rem"
        right="2rem"
        border={{ _: "1px solid", md: "none" }}
        borderColor="light-gray"
        borderRadius={5}
        bg={{ _: "white", md: "transparent" }}
        py={{ _: ".5rem", md: "0" }}
        zIndex={20}>
        <StarIcon
          className="move-down"
          height={30}
          color={marked ? "#f5bf42" : "none"}
          onClick={handleToggleMarked}
          style={{ cursor: "pointer" }}
          title="Dodaj do zaznaczonych"
          fill={marked ? "#f5bf42" : "none"}
        />

        <LinkIcon
          className="move-down"
          height={30}
          title="Kopiuj link"
          onClick={() => copyToClipboard({ toast, text: "Skopiowano link", toCopy: location.href })}
        />
        <FlagIcon className="move-down" height={30} title="Zgłoś pytanie" onClick={() => modal.show()} />
        {/* strzałka w góre */}
        <Box borderTop="1px solid" borderColor="light-gray" display={{ _: "block", md: "none" }}>
          <ChevronUpIcon
            className="move-down"
            height={30}
            color={voted("up") ? "#3aafa9" : "black"}
            title="Głosuj za"
            onClick={() => handleToggleVote("up")}
          />
          <Text
            variant="h3"
            fontWeight="500"
            m="0"
            color="black"
            children={question && question?.votes.up.length - question?.votes.down.length}
            textAlign="center"
            py=".5rem"
          />
          <ChevronDownIcon
            className="move-down"
            height={30}
            style={{ cursor: "pointer" }}
            color={voted("down") ? "#3aafa9" : "black"}
            title="Głosuj przeciw"
            onClick={() => handleToggleVote("down")}
          />
        </Box>
      </Stack>
      {modal.visible && question && <ReportModal modal={modal} id={question?._id} reportFor="question" />}
    </Flex>
  );
};

export default Question;
