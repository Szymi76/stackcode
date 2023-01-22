import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Modal, ModalStateReturn } from "@welcome-ui/modal";
import { useNavigate } from "react-router-dom";
import { useAddReportMutation } from "../features/report/reportApiSlice";
import { Select } from "@welcome-ui/select";

// komponenty
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Field } from "@welcome-ui/field";
import { Textarea } from "@welcome-ui/textarea";
import { Loader } from "@welcome-ui/loader";
import { Toast, useToast } from "@welcome-ui/toast";

const SELECT_OPTIONS = [
  { label: "Wulgarne słownictwo", value: "Wulgarne słownictwo" },
  { label: "Nieodpowiednie zdjęcia", value: "Nieodpowiednie zdjęcia" },
  { label: "Nienawiść", value: "Nienawiść" },
  { label: "Rasizm", value: "Rasizm" },
  { label: "Inne", value: "Inner" },
];

interface AddCommentModalProps {
  modal: ModalStateReturn;
  id: string;
  reportFor: "question" | "answer" | "comment" | "user";
  onClose?: () => void;
}

const ReportModal = ({ modal, id, reportFor, onClose }: AddCommentModalProps) => {
  const [reason, setReason] = useState("Nienawiść");
  const [addReportAsync, { isLoading, isError }] = useAddReportMutation();
  const toast = useToast();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // dodawanie nowego komentarza
  const handleSendComment = async () => {
    if (!textareaRef.current) return;

    const text = textareaRef.current.value.trim();
    if (text.length == 0) return;

    await addReportAsync({ id, text, reasons: [reason], for: reportFor }).unwrap();
    textareaRef.current.value = "";
    toast(
      // @ts-ignore
      <Toast.Snackbar p=".5rem" variant="success" hasCloseButton={false}>
        <Text variant="body2" m="0" children="Zgłoszenie zostało przesłane" />
      </Toast.Snackbar>
    );
    modal.hide();
  };

  return (
    <Modal {...modal} ariaLabel="finish-modal" size="md" onClose={onClose}>
      <Modal.Content>
        {/* header */}
        <Modal.Title children="Dodaj zgłoszenie" p={{ md: "0" }} borderBottom="none" />

        <Modal.Cover
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          pt={{ _: "3rem", md: "0" }}
          pl={{ _: "2rem", md: "0" }}>
          {/* powody */}
          <Field mt="1rem" label="Powody" w="99%">
            <Select options={SELECT_OPTIONS} onChange={(val) => setReason(val.toString())} value={reason} />
          </Field>

          {/* tekst */}
          <Field mt="1rem" label="Tekst" hint="Zgłoszenie nie może mieć więcej niż 100 znkaów" w="99%">
            <Textarea ref={textareaRef} />
          </Field>
        </Modal.Cover>

        {/* stopka */}
        <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
          <Flex wrap="wrap" pt="1rem" justify="end" gap=".5rem">
            <Button px="2rem" alignSelf="end" disabled={isLoading} onClick={handleSendComment}>
              {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
              Prześlij
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReportModal;
