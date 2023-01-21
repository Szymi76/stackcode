import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useOnScreen from "../../hooks/useOnScreen";
import { useToast } from "@welcome-ui/toast";
import useOpenImages from "../../hooks/useOpenImages";
import { toggleAnswerVote } from "../../features/question/questionSlice";
import copyToClipboard from "../../utils/copyToClipboard";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useToggleAnswerVoteMutation } from "../../features/answer/answerApiSlice";
import AnswerType from "../../types/Answers";
import moment from "moment";
import "moment/locale/pl";

// komponenty
import {
  ChatBubbleBottomCenterIcon,
  LinkIcon,
  FlagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";

interface AnswerProps {
  answer: AnswerType;
}

const Answer = ({ answer }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { question } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleAnswerVoteMutation();

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
  const date = new Date(answer.createdAt);
  moment.locale("pl");
  const time = moment(date).fromNow();

  return (
    <Flex>
      {/* lewa kolumna */}
      <Stack w="5%" px="1.25rem" alignItems="center" spacing="md">
        {/* ZNACZEK WERYFIKACJI */}
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
          children={answer?.votes.up.length - answer?.votes.down.length}
        />
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
      <Stack w="90%" p="1.5rem" bg="white" border="1px solid" borderColor="light-gray" borderRadius="5">
        {/* kontent */}
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" />

        {/* dół */}
        <Flex justify="space-between">
          <Flex gap=".5rem">
            <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${answer.views}`} />
            <Text m="0" variant="body3" color="gray" children="•" />
            <Text m="0" variant="body3" color="gray" children={time} />
          </Flex>
          <Text m="0" variant="body3" color="gray">
            {answer.verified && <PencilSquareIcon />}
            Autor: {question?.author.displayName}
          </Text>
        </Flex>
      </Stack>

      {/* prawa kolumna */}
      <Stack w="5%" px="1.25rem" alignItems="center" spacing="md">
        <LinkIcon
          className="move-down"
          height={30}
          title="Kopiuj link"
          onClick={() => copyToClipboard({ toast, text: "Skopiowano link", toCopy: location.href })}
        />
        <FlagIcon className="move-down" height={30} title="Zgłoś pytanie" />
        <ChatBubbleBottomCenterIcon className="move-down" height={30} title="Zobacz komentarze" />
      </Stack>
    </Flex>
  );
};

export default Answer;
