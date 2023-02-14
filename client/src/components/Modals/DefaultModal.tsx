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
  defaultLabel?: string;
  onClose?: () => void;
  onDefaultButtonClick: () => void;
  extraButtons?: JSX.Element | JSX.Element[];
};

const DefaultModal = ({
  modal,
  title,
  content,
  isLoading,
  defaultLabel,
  onClose,
  onDefaultButtonClick,
  extraButtons,
}: DeleteModalProps) => {
  // funkcja odbywająca się podczas zamykania modala
  const handleClose = () => {
    onClose && onClose();
    modal.hide();
  };

  const bodyContent = typeof content == "string" ? <Text w="100%" color="gray" children={content} /> : content;

  return (
    <Wrapper modal={modal} onClose={handleClose}>
      <Header children={title} />
      <Body children={bodyContent} />

      <Footer reverse={true}>
        {isLoading !== undefined ? (
          // asynchroniczny podstawowy przycisk
          <AsyncButton
            isLoading={isLoading}
            disabled={isLoading}
            children={defaultLabel}
            onClick={onDefaultButtonClick}
          />
        ) : (
          // synchroniczny podstawowy przycisk
          <Button children={defaultLabel} onClick={onDefaultButtonClick} />
        )}
        {extraButtons}
      </Footer>
    </Wrapper>
  );
};

export default DefaultModal;
