import { Modal, ModalStateReturn } from "@welcome-ui/modal";
import { Button } from "@welcome-ui/button";
import { Box } from "@welcome-ui/box";

interface FinishModalProps {
  modal: ModalStateReturn;
}

const FinishModal = ({ modal }: FinishModalProps) => {
  return (
    // @ts-ignore
    <Modal {...modal} aria-label="finish-modal">
      <Modal.Content>
        <Modal.Title title="Twoje pytanie zostało przesłane pomyślnie" />
        <Modal.Content>
          Praesent sit amet quam ac velit faucibus dapibus. Quisque sapien ligula, rutrum quis aliquam nec, convallis
          sit amet erat. Mauris auctor blandit porta. In imperdiet rutrum nunc. Integer suscipit sodales ex, ut lobortis
          orci rutrum id. Vestibulum scelerisque, felis ut sollicitudin elementum, dolor nibh faucibus orci, eu aliquet
          felis diam sed eros. Donec eget sapien lacinia, viverra felis in, placerat urna. Vestibulum sed viverra orci.
          Donec id tellus eget dui porta lobortis ac eu metus. Praesent id ultricies odio. In hac habitasse platea
          dictumst. Sed lorem lacus, hendrerit non sodales id, consectetur quis magna. Nullam non lacinia risus, ut
        </Modal.Content>
        <Modal.Footer>
          <Box w="100%">
            <Button variant="secondary" mr="sm">
              Lorem dolir
            </Button>
            <Button onClick={() => modal.hide()}>Close</Button>
          </Box>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FinishModal;
