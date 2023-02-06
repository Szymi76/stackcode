import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Modal, ModalStateReturn } from "@welcome-ui/modal";
import { useAddCommentMutation } from "../../features/comment/commentApiSlice";
import { addComment } from "../../features/question/questionSlice";

// komponenty
import Answer from "../../types/Answers";
import { Button } from "@welcome-ui/button";
import { Flex } from "@welcome-ui/flex";
import { Field } from "@welcome-ui/field";
import { Textarea } from "@welcome-ui/textarea";
import { Loader } from "@welcome-ui/loader";

interface AppendCommentModalProps {
  modal: ModalStateReturn;
  answer: Answer;
  onClose?: () => void;
}

const AppendCommentModal = ({ modal, answer, onClose }: AppendCommentModalProps) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((state) => state.question);
  const [addCommentAsync, { isLoading, isError }] = useAddCommentMutation();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    onClose && onClose();
    modal.hide();
  };

  return (
    <Modal {...modal} ariaLabel="finish-modal" size="md" onClose={onClose}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Dodaj komentarz" p={{ md: "0" }} borderBottom="none" />

        {/* kontent */}
        <Modal.Cover
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          pt={{ _: "3rem", md: "0" }}
          pl={{ _: "2rem", md: "0" }}>
          <Field mt="1rem" label="Tekst" hint="Nowy komentarz nie może mieć więcej niż 150 znkaów" w="99%">
            <Textarea ref={textareaRef} />
          </Field>
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button px="2rem" alignSelf="end" disabled={isLoading} onClick={handleSendComment}>
              {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
              Dodaj
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AppendCommentModal;
