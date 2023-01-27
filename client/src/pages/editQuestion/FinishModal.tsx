import React, { useState } from "react";
import { Modal, ModalStateReturn } from "@welcome-ui/modal";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Checkbox } from "@welcome-ui/checkbox";
import { Field } from "@welcome-ui/field";
import { useNavigate } from "react-router-dom";

interface FinishModalProps {
  modal: ModalStateReturn;
  id: string;
}

const FinishModal = ({ modal, id }: FinishModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal {...modal} ariaLabel="add-comment-modal" size="md" onClose={() => navigate("/home")}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Twoje pytanie zostało edytowane pomyślnie" p={{ md: "0" }} borderBottom="none" />

        {/* kontent */}
        <Modal.Cover
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          pt={{ _: "3rem", md: "0" }}
          pl={{ _: "2rem", md: "0" }}>
          <Text w="100%" color="gray">
            Możesz je zobaczyć na forum lub w swoim profilu.
          </Text>
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button children="Wróć do profilu" onClick={() => navigate(`/twoj-profil`)} />
            <Button children="Zobacz pytanie" onClick={() => navigate(`/pytanie/${id}`)} />
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FinishModal;
