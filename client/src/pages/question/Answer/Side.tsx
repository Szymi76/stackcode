import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FlagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import React from "react";
import Answer from "../../../types/Answers";
import { useAppSelector } from "../../../app/hooks";
import { Box } from "@welcome-ui/box";
import { ModalStateReturn } from "@welcome-ui/modal";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";

/*
    Wrapper dla prawej i lewej Kolumny 
*/
export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Stack px=".5rem" alignItems="center" spacing="md">
      {children}
    </Stack>
  );
};

/*
    Lewa kolumna z akcjami dotyczącymi pytania
*/
export type LeftProps = {
  handleToggleVote: (vote: "up" | "down") => void;
  answer: Answer | null;
};

export const Left = ({ answer, handleToggleVote }: LeftProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const voted = (vote: "up" | "down") => answer?.votes[vote].includes(user?.id || "");

  return (
    <Wrapper>
      {/* głosuj za */}
      <ChevronUpIcon
        className="heroicon"
        title="Głosuj za"
        color={voted("up") ? "#3aafa9" : "black"}
        onClick={() => handleToggleVote("up")}
      />

      {/* bilans głosów */}
      <Text
        m="0"
        variant="h3"
        fontWeight="500"
        children={answer && answer?.votes.up.length - answer?.votes.down.length}
      />

      {/* głosuj przeciw */}
      <ChevronDownIcon
        className="heroicon"
        title="Głosuj przeciw"
        color={voted("down") ? "#3aafa9" : "black"}
        onClick={() => handleToggleVote("down")}
      />
    </Wrapper>
  );
};

/*
    Prawa kolumna z akcjami dotyczącymi pytania
*/
export type RightProps = {
  modal: ModalStateReturn;
  answer: Answer;
  commentsVisible: boolean;
  toggleCommentsVisibility: () => void;
  handleDelete: (answerID: string) => void;
};

export const Right = ({ modal, answer, commentsVisible, toggleCommentsVisibility, handleDelete }: RightProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const showDeleteIcon = user?.id == answer.author._id || user?.roles.includes("moderator") ? true : false;

  return (
    <Wrapper>
      {/* komentarze */}
      <Box position="relative" color={commentsVisible ? "green" : "black"}>
        <ChatBubbleBottomCenterTextIcon
          className="heroicon"
          title={commentsVisible ? "Ukryj komentarze" : "Zobacz komentarze"}
          onClick={toggleCommentsVisibility}
        />
        {/* liczba komentarzy */}
        <Text
          position="absolute"
          display={{ _: "none", md: "block" }}
          right={-8}
          top={5}
          fontSize="xs"
          children={answer.comments.length}
        />
      </Box>

      {/* zgłaszanie pytania */}
      <FlagIcon className="heroicon" title="Zgłoś odpowiedź" onClick={() => modal.show()} />

      {/* usuwanie odpowiedzi */}
      {showDeleteIcon && (
        <TrashIcon
          className="heroicon"
          color="#ef4444"
          title="Usuń odpowiedź"
          onClick={() => handleDelete(answer._id)}
        />
      )}
    </Wrapper>
  );
};
