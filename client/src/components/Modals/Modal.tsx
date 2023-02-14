import { Flex } from "@welcome-ui/flex";
import { Modal, ModalStateReturn } from "@welcome-ui/modal";

export type WrapperProps = { modal: ModalStateReturn; children: JSX.Element[]; onClose?: () => void };

export const Wrapper = ({ children, modal, onClose }: WrapperProps) => {
  return (
    <>
      {modal.visible ? (
        <Modal {...modal} ariaLabel="finish-modal" size="md" onClose={onClose}>
          <Modal.Content>{children}</Modal.Content>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export type HeaderProps = { children: React.ReactNode };

export const Header = ({ children }: HeaderProps) => {
  return (
    <Modal.Title p={{ md: "0" }} borderBottom="none">
      {children}
    </Modal.Title>
  );
};

export type BodyProps = { children: React.ReactNode };

export const Body = ({ children }: BodyProps) => {
  return (
    <Modal.Cover pt={{ _: "3rem", md: "0" }} pl={{ _: "2rem", md: "0" }}>
      {children}
    </Modal.Cover>
  );
};

export type FooterProps = { children: React.ReactNode | React.ReactNode[]; reverse?: boolean };

export const Footer = ({ children, reverse }: FooterProps) => {
  return (
    <Modal.Footer w={{ _: "auto", md: "100%" }} p={{ md: "0" }} pl={{ _: "2rem" }} borderTop="none">
      <Flex wrap="wrap" pt="1rem" justify="end" flexDirection={reverse ? "row-reverse" : "row"} gap=".5rem">
        {children}
      </Flex>
    </Modal.Footer>
  );
};
