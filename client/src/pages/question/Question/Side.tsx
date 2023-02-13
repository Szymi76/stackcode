import { ChevronDownIcon, ChevronUpIcon, FlagIcon, LinkIcon, StarIcon } from "@heroicons/react/24/outline";
import { ModalStateReturn } from "@welcome-ui/modal";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { UseToastReturn } from "@welcome-ui/toast";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import Question from "../../../types/Question";

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
  question: Question | null;
};

export const Left = ({ question, handleToggleVote }: LeftProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const voted = (vote: "up" | "down") => question?.votes[vote].includes(user?.id || "");

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
        children={question && question?.votes.up.length - question?.votes.down.length}
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
  toast: UseToastReturn;
  modal: ModalStateReturn;
  handleToggleMarked: () => void;
  question: Question | null;
};

export const Right = ({ toast, modal, question, handleToggleMarked }: RightProps) => {
  const copyToClipboard = useCopyToClipboard();
  const { user } = useAppSelector((state) => state.auth);
  const marked = question?.markedBy.includes(user?.id || "");

  return (
    <Wrapper>
      {/* dodawanie do zaznaczonych */}
      <StarIcon
        className="heroicon"
        color={marked ? "#f5bf42" : "none"}
        title="Dodaj do zaznaczonych"
        fill={marked ? "#f5bf42" : "none"}
        onClick={handleToggleMarked}
      />

      {/* link */}
      <LinkIcon className="heroicon" title="Kopiuj link" onClick={() => copyToClipboard(location.href, "link")} />

      {/* zgłaszanie pytania */}
      <FlagIcon className="heroicon" title="Zgłoś pytanie" onClick={() => modal.show()} />
    </Wrapper>
  );
};
