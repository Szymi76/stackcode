import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useDeleteAnswerMutation,
  useToggleAnswerVoteMutation,
  useToggleVerificationMutation,
} from "../../../features/answer/answerApiSlice";
import {
  addComment,
  changeVerificationTo,
  deleteAnswer,
  toggleAnswerVote,
} from "../../../features/question/questionSlice";
import AnswerType from "../../../types/Answers";
import useToast from "../../../hooks/useToast";

// komponenty
import ReportModal from "../../../components/ReportModal";
import DefaultModal from "../../../components/Modals/DefaultModal";
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { useModalState } from "@welcome-ui/modal";
import * as Side from "./Side";
import * as Content from "./Content";
import * as Dropdown from "./Dropdown";
import * as Comments from "../Comments/index";
import { Field } from "@welcome-ui/field";
import { Textarea } from "@welcome-ui/textarea";
import { useAddCommentMutation } from "../../../features/comment/commentApiSlice";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";

type AnswerProps = {
  answer: AnswerType;
  index: number;
};

const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modal = useModalState();
  const commentModal = useModalState();
  const { user } = useAppSelector((state) => state.auth);
  const question = useAppSelector((state) => state.question);
  const [addCommentAsync, { isLoading, isError }] = useAddCommentMutation();
  const [deleteAnswerAsync] = useDeleteAnswerMutation();
  const [verifyAnswerAsync] = useToggleVerificationMutation();
  const [showDropdown, setShowdropdown] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [toggleVoteAsync] = useToggleAnswerVoteMutation();

  const triggerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleCommentsVisibility = () => setCommentsVisible(!commentsVisible);

  // zmiana głosu na pytanie
  const handleToggleVote = async (vote: "up" | "down") => {
    if (!user) return;
    const { votes } = await toggleVoteAsync({ answerID: answer._id, vote }).unwrap();
    dispatch(toggleAnswerVote({ answerID: answer._id, votes }));
  };

  const handleVerifyAnswer = async () => {
    await verifyAnswerAsync({ answerID: answer._id }).unwrap();
    dispatch(changeVerificationTo({ answerID: answer._id, to: !answer.verified }));
  };

  const handleDelete = async (answerID: string) => {
    await deleteAnswerAsync({ answerID }).unwrap();
    dispatch(deleteAnswer({ answerID }));
    toast("Usunięto odpowiedź");
  };

  // dodawanie nowego komentarza
  const handleSendComment = async () => {
    if (!textareaRef.current || !question) return;

    const content = textareaRef.current.value.trim();
    if (content.length == 0) return;

    const { comment } = await addCommentAsync({
      questionID: question._id,
      answerID: answer._id,
      content,
    }).unwrap();
    dispatch(addComment({ answerID: answer._id, comment }));
    textareaRef.current.value = "";
    toast("Dodano komentarz");
    setCommentsVisible(true);
    commentModal.hide();
  };

  const modalContent = (
    <Field mt="1rem" label="Tekst" hint="Nowy komentarz nie może mieć więcej niż 150 znkaów" w="99%">
      <Textarea ref={textareaRef} />
    </Field>
  );

  return (
    <Flex maxW="1200px" mx="auto">
      {/* lewa kolumna */}
      <Flex display={{ _: "none", md: "flex" }} justify="center">
        <Side.Left handleToggleVote={handleToggleVote} answer={answer} />
      </Flex>

      {/* kontent */}
      <Content.Wrapper>
        {answer.verified && <Content.VerifiedAnswer />}
        <Box
          className="quill-result"
          dangerouslySetInnerHTML={{ __html: answer.content }}
          pb=".5rem"
          overflowX="auto"
        />
        <Content.Footer answer={answer} commentModal={commentModal} />

        {user?.roles.includes("expert") && (
          <Button
            mt="1rem"
            children={answer.verified ? "Usuń weryfikację" : "Zweryfikuj"}
            onClick={handleVerifyAnswer}
          />
        )}

        {/* komentarze */}
        <Comments.Wrapper commentsVisible={commentsVisible}>
          <Comments.Header toggleCommentsVisibility={toggleCommentsVisibility} />
          {answer.comments.map((comment, index) => (
            <Comments.Single key={`comment-${index}`} comment={comment} />
          ))}
        </Comments.Wrapper>

        {/* menu - trzy kropki prawy górny róg */}
        <Dropdown.Trigger ref={triggerRef} setShowDropdown={setShowdropdown} showDropdown={showDropdown} />

        {/* rozwijane menu pod 3-ma kropkami */}
        {showDropdown && (
          <Dropdown.Actions
            triggerRef={triggerRef}
            setShowDropdown={setShowdropdown}
            commentsVisible={commentsVisible}
            toggleCommentsVisibility={toggleCommentsVisibility}
            handleToggleVote={handleToggleVote}
            handleDelete={handleDelete}
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
          handleDelete={handleDelete}
        />
      </Flex>

      {/* report modal */}
      {modal.visible && answer && <ReportModal modal={modal} id={answer?._id} reportFor="answer" />}

      {/* modal do dodawania nowych komentarzy */}
      <DefaultModal
        modal={commentModal}
        title="Dodaj komentarz"
        content={modalContent}
        onDefaultButtonClick={handleSendComment}
        defaultLabel="Dodaj"
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default Answer;
