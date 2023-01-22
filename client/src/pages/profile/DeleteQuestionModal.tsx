import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Modal, ModalStateReturn } from "@welcome-ui/modal";
import { useNavigate } from "react-router-dom";
import { useDeleteQuestionMutation } from "../../features/question/questionApiSlice";
import { addComment } from "../../features/question/questionSlice";

// komponenty
import Answer from "../../types/Answers";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Checkbox } from "@welcome-ui/checkbox";
import { Field } from "@welcome-ui/field";
import { Textarea } from "@welcome-ui/textarea";
import { Loader } from "@welcome-ui/loader";
import Question from "../../types/Question";

interface DeleteQuestionModalProps {
  modal: ModalStateReturn;
  question: Question;
  onClose: () => void;
}

const DeleteQuestionModal = ({ modal, question, onClose }: DeleteQuestionModalProps) => {
  const [deleteQuestionAsync, { isLoading, isError }] = useDeleteQuestionMutation();

  // dodawanie nowego komentarza
  const handleDeleteQuestion = async () => {
    await deleteQuestionAsync({ questionID: question._id });
    onClose();
    modal.hide();
  };

  return (
    <Modal {...modal} ariaLabel="finish-modal" size="md" onClose={onClose}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Czy na pewno chcesz usunąć pytanie?" p={{ md: "0" }} borderBottom="none" />

        {/* kontent */}
        <Modal.Cover pt={{ _: "3rem", md: "0" }} pl={{ _: "2rem", md: "0" }}>
          <Text
            variant="body2"
            w="100%"
            color="gray"
            children="Kliknięcie usuń swpowoduje nieodwracalne usunięcie pytania!"
          />
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button
              variant="primary-warning"
              px="2rem"
              alignSelf="end"
              disabled={isLoading}
              onClick={handleDeleteQuestion}>
              {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
              Usuń
            </Button>
            <Button children="Cofnij" onClick={() => modal.hide()} />
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteQuestionModal;
