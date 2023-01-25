import useOpenImages from "../../hooks/useOpenImages";
import useOnScreen from "../../hooks/useOnScreen";
import { useRef, useState } from "react";
import { useModalState } from "@welcome-ui/modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useToast } from "@welcome-ui/toast";
import { toggleAnswerVote } from "../../features/question/questionSlice";
import copyToClipboard from "../../utils/copyToClipboard";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useToggleAnswerVoteMutation } from "../../features/answer/answerApiSlice";
import AnswerType from "../../types/Answers";
import moment from "moment";
import "moment/locale/pl";

// komponenty
import {
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  FlagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import AddCommentModal from "./AddCommentModal";
import Comment from "./Comment";
import ReportModal from "../../components/ReportModal";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface AnswerProps {
  answer: AnswerType;
  index: number;
}

const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modal = useModalState();
  const [showRightSide, setShowRightSide] = useState(false);
  const reportModal = useModalState();
  const [showComments, setShowComments] = useState(false);
  const { question } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleAnswerVoteMutation();

  const toggleShowComments = () => {
    if (answer.comments.length == 0) return;
    setShowComments(!showComments);
  };

  // hook do otwierania zdjęć w nowej karcie
  useOpenImages("quill-result");

  // const wrapperRef = useRef<HTMLDivElement>(null);
  // const visible = useOnScreen(wrapperRef);

  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(answer.content.ops, {}).convert();

  // zmiana głosu na pytanie
  const handleToggleVote = async (vote: "up" | "down") => {
    if (!user) return;
    const { votes } = await toggleVoteAsync({ answerID: answer?._id, vote }).unwrap();
    dispatch(toggleAnswerVote({ answerID: answer._id, votes }));
  };

  // sprawdzanie czy użytkownik zagłosował i czy zadał pytanie
  const voted = (vote: "up" | "down") => answer?.votes[vote].includes(user?.id || "");

  // kiedy pytanie zostało napisane - np. 5 min temu [AKTUALNIE PO ANKIELSKU]
  const date = new Date(answer.createdAt);
  moment.locale("pl");
  const time = moment(date).fromNow();

  const textToCopy = `${location.origin}${location.pathname}#${index + 1}`;

  return (
    <Flex id={`${index + 1}`} position="relative">
      {/* lewa kolumna */}
      <Stack w="5%" px="1.25rem" display={{ _: "none", md: "flex" }} alignItems="center" spacing="md">
        {/* znaczek veryfikacji */}
        {answer.verified && <CheckBadgeIcon width={30} color="#4BB543" />}

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
          children={answer?.votes.up.length - answer?.votes.down.length}
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
        w={{ _: "97%", md: "90%" }}
        mx="auto"
        position="relative"
        px="1rem"
        py=".5rem"
        bg="white"
        border="1px solid"
        borderColor="light-gray"
        borderRadius="5">
        {/* kontent */}
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />

        {/* dół */}
        <Stack>
          {/* dodaj nowy komentarz */}
          <Text
            variant="body2"
            fontWeight="500"
            color={{ hover: "green" }}
            cursor="pointer"
            children="Dodaj komentarz ★"
            w="min-content"
            whiteSpace="nowrap"
            onClick={() => modal.show()}
            mb="0"
          />

          {/* info */}
          <Flex wrap="wrap" align="center" justify="space-between">
            {/* wyświetlenia i data */}
            <Flex gap=".5rem">
              <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${answer.views}`} />
              <Text m="0" variant="body3" color="gray" children="•" />
              <Text m="0" variant="body3" color="gray" children={time} />
            </Flex>

            {/* przez kogo i czy był edytowany */}
            <Flex align="center" m="0" color="gray">
              {/* {answer.updatedAt != answer.createdAt && <PencilSquareIcon height={15} />} */} {/* DO NAPRAWY  */}
              <Text variant="body3" m="0" children={`Autor: ${question?.author.displayName}`} />
            </Flex>
          </Flex>

          {/* 3 kropki - menu */}
          <EllipsisVerticalIcon
            height={30}
            style={{ position: "absolute", top: "1rem", right: ".5rem" }}
            color={showRightSide ? "#3aafa9" : "gray"}
            onClick={() => setShowRightSide(!showRightSide)}
            cursor="pointer"
          />
        </Stack>

        {/* komentarze */}
        <Stack
          py={showComments ? ".5rem" : "0"}
          h="100%"
          maxH={showComments ? "3000px" : "0px"}
          overflow="hidden"
          transitionDuration={100}>
          {/* ukryj komentarze */}

          <Flex justify="center" align="center" mb="1rem">
            <Box w="45%" h="1px" bg="light-gray" />
            <Text
              color={{ _: "gray", hover: "green" }}
              cursor="pointer"
              whiteSpace="nowrap"
              mx="1.5rem"
              children="ukryj komentarze"
              onClick={() => setShowComments(false)}
            />
            <Box w="45%" h="1px" bg="light-gray" />
          </Flex>

          {answer.comments.map((com, i) => (
            <Comment key={`comment-${com._id}`} comment={com} />
          ))}
        </Stack>
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
        py={{ _: ".5rem", md: "0" }}
        bg={{ _: "white", md: "transparent" }}>
        {/* kopiowanie linku */}
        {/* <LinkIcon
          className="move-down"
          height={30}
          title="Kopiuj link"
          onClick={() => copyToClipboard({ toast, text: "Skopiowano link", toCopy: textToCopy })}
        /> */}

        {/* zgłaszanie */}
        <FlagIcon className="move-down" height={30} title="Zgłoś" onClick={() => reportModal.show()} />

        {/* pokaż / ukryj komentarze */}
        <Box position="relative" color={showComments ? "green" : "black"}>
          <ChatBubbleBottomCenterTextIcon
            className="move-down"
            height={30}
            title={showComments ? "Ukryj komentarze" : "Zobacz komentarze"}
            onClick={toggleShowComments}
          />
          <Text
            position="absolute"
            display={{ _: "none", md: "block" }}
            right={-8}
            top={5}
            variant="body4"
            children={answer.comments.length}
          />
        </Box>
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

      {/* modal do dodawania komentarzy */}
      {modal.visible && <AddCommentModal modal={modal} answer={answer} />}
      {reportModal.visible && <ReportModal modal={reportModal} id={answer._id} reportFor="answer" />}
    </Flex>
  );
};

export default Answer;
