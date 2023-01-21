import useOnScreen from "../../hooks/useOnScreen";
import moment from "moment";
import useOpenImages from "../../hooks/useOpenImages";
import copyToClipboard from "../../utils/copyToClipboard";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useToast } from "@welcome-ui/toast";
import { toggleMarked, toggleQuestionVote } from "../../features/question/questionSlice";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import {
  useToggleQuestionVoteMutation,
  useToggleMarkekQuestionMutation,
} from "../../features/question/questionApiSlice";

// komponenty
import { StarIcon, LinkIcon, FlagIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";

const Question = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
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
    <Flex ref={wrapperRef}>
      {/* lewa kolumna */}
      <Stack w="5%" px="1.25rem" alignItems="center" spacing="md">
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
      <Stack w="90%" p="1.5rem" bg="white" border="1px solid" borderColor="light-gray" borderRadius="5">
        {/* góra */}
        <Stack>
          {/* tytuł */}
          <Text variant="h3" m="0" color="black" children={question?.title} />

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
      </Stack>

      {/* prawa kolumna */}
      <Stack w="5%" px="1.25rem" alignItems="center" spacing="md">
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
        <FlagIcon className="move-down" height={30} title="Zgłoś pytanie" />
      </Stack>
    </Flex>
  );
};

export default Question;
