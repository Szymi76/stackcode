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
}

const FinishModal = ({ modal, onClose }: FinishModalProps) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const redirectToHome = () => navigate("/home");
  const redirectToProfile = () => navigate("/profile");

  const handleChange = () => {
    setChecked(!checked);
    localStorage.setItem("show-finish-modal", String(checked));
  };

  return (
    <Modal {...modal} ariaLabel="finish-modal" size="md" onClose={onClose}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Twoje pytanie zostało przesłane pomyślnie" p="0" borderBottom="none" />

        {/* kontent */}
        <Modal.Cover display="flex" flexDirection="column" alignItems="flex-start">
          <Text color="gray">Twoje pytanie możesz znaleść na swoim profilu. Pytanie możesz usunąć i edytować.</Text>
          <Field ml=".5rem" w="100%" label="zaznacz, jeśli nie chcesz widzieć tego okna ponownie">
            <Checkbox checked={checked} onChange={handleChange} />
          </Field>
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer p="0" borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button children="Wróć do strony głównej" onClick={redirectToHome} />
            <Button children="Przejdź do swojego profilu" onClick={redirectToProfile} />
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FinishModal;
