import React from "react";
import QuestionType from "../../types/Question";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";
import { StarIcon, LinkIcon, FlagIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleVoteUp, toggleVoteDown, toggleMarked } from "../../features/question/questionSlice";
import {
  useToggleQuestionVoteMutation,
  useToggleMarkekQuestionMutation,
} from "../../features/question/questionApiSlice";
import { Button } from "@welcome-ui/button";
import { Toast, useToast } from "@welcome-ui/toast";
import copyToClipboard from "../../utils/copyToClipboard";

const Question = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { question } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleQuestionVoteMutation();
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();

  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(question.content.ops, {}).convert();

  // zmiana głosu na pytanie
  const handleToggleVote = async (vote: "up" | "down") => {
    if (!user || !question) return;
    await toggleVoteAsync({ questionID: question?._id, vote });
    dispatch(vote == "up" ? toggleVoteUp({ userID: user.id }) : toggleVoteDown({ userID: user.id }));
  };

  // zaznaczanie / odznaczanie pytania
  const handleToggleMarked = async () => {
    if (!user || !question) return;
    await toggleMarkedAsync({ questionID: question._id });
    dispatch(toggleMarked({ userID: user.id }));
  };

  // sprawdzanie czy użytkownik zagłosował i czy zadał pytanie
  const voted = (vote: "up" | "down") => question?.votes[vote].includes(user?.id || "");
  const marked = question?.markedBy.includes(user?.id || "");

  return (
    <Flex>
      {/* lewa kolumna */}
      <Stack w="5%" px="1.25rem" alignItems="center" spacing="md">
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
        {/* góra */}
        <Stack>
          <Text variant="h3" m="0" color="black" children={question?.title} />
          <Flex gap=".25rem">
            {question?.tags.map((tag, i) => (
              <Tag key={`tag-${i}`} variant="3" children={tag} size="sm" />
            ))}
          </Flex>
        </Stack>

        {/* kontent */}
        <Box dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" />

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
