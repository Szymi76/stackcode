import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useToggleAnswerVoteMutation } from "../../../features/answer/answerApiSlice";
import { toggleAnswerVote } from "../../../features/question/questionSlice";
import AnswerType from "../../../types/Answers";

// komponenty
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { useModalState } from "@welcome-ui/modal";
import * as Side from "./Side";
import * as Content from "./Content";
import * as Dropdown from "./Dropdown";
import * as Comments from "../Comments/index";
import ReportModal from "../../../components/ReportModal";
import AppendCommentModal from "../AppendCommentModal";

type AnswerProps = {
  answer: AnswerType;
  index: number;
};

const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const modal = useModalState();
  const commentModal = useModalState();
  const { user } = useAppSelector((state) => state.auth);
  const [showDropdown, setShowdropdown] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [toggleVoteAsync] = useToggleAnswerVoteMutation();

  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(answer.content.ops, {}).convert();

  const toggleCommentsVisibility = () => setCommentsVisible(!commentsVisible);

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
        <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />
        <Content.Footer answer={answer} commentModal={commentModal} />

        {/* komentarze */}
        <Comments.Wrapper commentsVisible={commentsVisible}>
          <Comments.Header toggleCommentsVisibility={toggleCommentsVisibility} />
          {answer.comments.map((comment, index) => (
            <Comments.Single key={`comment-${index}`} comment={comment} />
          ))}
        </Comments.Wrapper>

        {/* menu - trzy kropki prawy górny róg */}
        <Dropdown.Trigger setShowDropdown={setShowdropdown} showDropdown={showDropdown} />

        {/* rozwijane menu pod 3-ma kropkami */}
        {showDropdown && (
          <Dropdown.Actions
            commentsVisible={commentsVisible}
            toggleCommentsVisibility={toggleCommentsVisibility}
            handleToggleVote={handleToggleVote}
            modal={modal}
            answer={answer}
          />
        )}
      </Content.Wrapper>
      {/* prawa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Right
          modal={modal}
          answer={answer}
          commentsVisible={commentsVisible}
          toggleCommentsVisibility={toggleCommentsVisibility}
        />
      </Flex>

      {/* report modal */}
      {modal.visible && answer && <ReportModal modal={modal} id={answer?._id} reportFor="answer" />}
      {commentModal.visible && (
        <AppendCommentModal modal={commentModal} answer={answer} onClose={() => setCommentsVisible(true)} />
      )}
    </Flex>
  );
};

export default Answer;
