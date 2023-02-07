import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { toggleMarked, toggleQuestionVote } from "../../../features/question/questionSlice";
import {
  useToggleMarkekQuestionMutation,
  useToggleQuestionVoteMutation,
} from "../../../features/question/questionApiSlice";

// komponenty
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { useModalState } from "@welcome-ui/modal";
import { useToast } from "@welcome-ui/toast";
import * as Side from "./Side";
import * as Content from "./Content";
import * as Dropdown from "./Dropdown";
import ReportModal from "../../../components/ReportModal";

const Question = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modal = useModalState();
  const [showDropdown, setShowdropdown] = useState(false);
  const { question } = useAppSelector((state) => state);
  const { user } = useAppSelector((state) => state.auth);
  const [toggleVoteAsync] = useToggleQuestionVoteMutation();
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();

  const triggerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Flex maxW="1200px" mx="auto">
      {/* lewa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Left handleToggleVote={handleToggleVote} question={question} />
      </Flex>

      {/* kontent */}
      <Content.Wrapper>
        {/* góra */}
        <Content.Header question={question} />

        {/* środek */}
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />

        {/* dół */}
        <Content.Footer question={question} />

        {/* menu - trzy kropki prawy górny róg */}
        <Dropdown.Trigger ref={triggerRef} setShowDropdown={setShowdropdown} showDropdown={showDropdown} />

        {/* rozwijane menu pod 3-ma kropkami */}
        {showDropdown && (
          <Dropdown.Actions
            triggerRef={triggerRef}
            handleToggleMarked={handleToggleMarked}
            handleToggleVote={handleToggleVote}
            setShowDropdown={setShowdropdown}
            modal={modal}
            toast={toast}
            question={question}
          />
        )}
      </Content.Wrapper>
      {/* prawa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Right handleToggleMarked={handleToggleMarked} modal={modal} toast={toast} question={question} />
      </Flex>

      {/* report modal */}
      {modal.visible && question && <ReportModal modal={modal} id={question?._id} reportFor="question" />}
    </Flex>
  );
};

export default Question;
