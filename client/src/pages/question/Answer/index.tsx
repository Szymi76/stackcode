import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import {useToggleAnswerVoteMutation} from "../../../features/answer/answerApiSlice";
import { toggleAnswerVote } from "../../../features/answer/answerSlice";

// komponenty
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { useModalState } from "@welcome-ui/modal";
import { useToast } from "@welcome-ui/toast";
import * as Side from "./Side";
import * as Content from "./Content";
import * as Dropdown from "./Dropdown";
import ReportModal from "../../../components/ReportModal";

type AnswerProps = {
  answer: AnswerType;
  index: number;
}

const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modal = useModalState();
  const [showDropdown, setShowdropdown] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleAnswerVoteMutation();

  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(answer.content.ops, {}).convert();

  // zmiana głosu na pytanie
  const handleToggleVote = async (vote: "up" | "down") => {
    if (!user) return;
    const { votes } = await toggleVoteAsync({ answerID: answer._id, vote }).unwrap();
    dispatch(toggleAnswerVote({ answerID: answer._id, votes }));
  };

  return (
    <Flex maxW="1200px" mx="auto">
      {/* lewa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Left handleToggleVote={handleToggleVote} answer={answer} />
      </Flex>

      {/* kontent */}
      <Content.Wrapper>
        {/* góra */}
        <Content.Header answer={answer} />

        {/* środek */}
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />

        {/* dół */}
        <Content.Footer answer={answer} />

        {/* menu - trzy kropki prawy górny róg */}
        <Dropdown.Trigger setShowDropdown={setShowdropdown} showDropdown={showDropdown} />

        {/* rozwijane menu pod 3-ma kropkami */}
        {showDropdown && (
          <Dropdown.Actions
            handleToggleMarked={handleToggleMarked}
            handleToggleVote={handleToggleVote}
            modal={modal}
            toast={toast}
            answer={answer}
          />
        )}
      </Content.Wrapper>
      {/* prawa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Right handleToggleMarked={handleToggleMarked} modal={modal} toast={toast} answer={answer} />
      </Flex>

      {/* report modal */}
      {modal.visible && answer && <ReportModal modal={modal} id={answer?._id} reportFor="answer" />}
    </Flex>
  );
};

export default Answer;
