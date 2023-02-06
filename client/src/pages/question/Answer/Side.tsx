import { ChevronDownIcon, ChevronUpIcon, FlagIcon, LinkIcon, StarIcon } from "@heroicons/react/24/outline";
import { ModalStateReturn } from "@welcome-ui/modal";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { UseToastReturn } from "@welcome-ui/toast";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import Answer from "../../../types/Answer";
import copyToClipboard from "../../../utils/copyToClipboard";

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
  toast: UseToastReturn;
  modal: ModalStateReturn;
  answer: Answer | null;
};

export const Right = ({ toast, modal, answer }: RightProps) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Wrapper>
      {/* link */}
      <LinkIcon
        className="heroicon"
        title="Kopiuj link"
        onClick={() => copyToClipboard({ toast, text: "Skopiowano link", toCopy: location.href })}
      />

      {/* zgłaszanie pytania */}
      <FlagIcon className="heroicon" title="Zgłoś odpowiedź" onClick={() => modal.show()} />
    </Wrapper>
  );
};
