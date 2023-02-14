import AsyncButton from "../AsyncButton";
import { Wrapper, Header, Body, Footer, WrapperProps } from "./Modal";
import { ModalStateReturn } from "@welcome-ui/modal";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";

type DeleteModalProps = {
  modal: ModalStateReturn;
  title: string;
  content?: React.ReactNode;
  isLoading?: boolean;
  closeLabel?: string;
  confirmLabel?: string;
  onClose?: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({
  modal,
  title,
  content,
  isLoading,
  closeLabel,
  confirmLabel,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  // funkcja odbywająca się podczas zamykania modala
  const handleClose = () => {
    onClose && onClose();
    modal.hide();
  };

  // funkcja odbywa się podczas kliknięcia w przycisk potwierdzający
  const handleConfirm = async () => {
    await onConfirm();
    modal.hide();
  };

  // text znajdujący się na poszczególnych przyciskach
  const closeButtonLabel = closeLabel ? closeLabel : "Anuluj";
  const confirmButtonLabel = confirmLabel ? confirmLabel : "Usuń";

  return (
    <Wrapper modal={modal} onClose={handleClose}>
      <Header children={title} />
      <Body>
        <Text w="100%" color="gray" children={content} />
      </Body>
      <Footer>
        {/* przycisk do anulowania  */}
        <Button children={closeButtonLabel} onClick={handleClose} />
        {isLoading !== undefined ? (
          // asynchroniczny przycisk do zatwierdzania
          <AsyncButton
            variant="primary-danger"
            isLoading={isLoading}
            disabled={isLoading}
            children={confirmButtonLabel}
            onClick={handleConfirm}
          />
        ) : (
          // synchroniczny przycisk do zatwierdzania
          <Button variant="primary-danger" children={confirmButtonLabel} onClick={handleConfirm} />
        )}
      </Footer>
    </Wrapper>
  );
};

export default DeleteModal;
