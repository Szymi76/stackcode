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
  onClose?: () => void;
  questionID: string;
}

const FinishModal = ({ modal, questionID, onClose }: FinishModalProps) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setChecked(!checked);
    localStorage.setItem("show-finish-modal", String(checked));
  };

  return (
    <Modal {...modal} ariaLabel="add-comment-modal" size="md" onClose={() => navigate("/home")}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Twoje pytanie zostało przesłane pomyślnie" p={{ md: "0" }} borderBottom="none" />

        {/* kontent */}
        <Modal.Cover
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          pt={{ _: "3rem", md: "0" }}
          pl={{ _: "2rem", md: "0" }}>
          <Text color="gray">Możesz je znaleść na swoim profilu. Pytanie możesz usunąć i edytować.</Text>
          <Field ml=".5rem" w="100%" label="zaznacz, jeśli nie chcesz widzieć tego okna ponownie">
            <Checkbox checked={checked} onChange={handleChange} />
          </Field>
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button children="Zobacz pytanie" onClick={() => navigate(`/pytanie/${questionID}`)} />
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FinishModal;
