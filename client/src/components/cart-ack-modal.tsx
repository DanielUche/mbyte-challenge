import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

interface Props {
  msg: string;
  open: boolean;
  openModal: Function;
}

const CartAckModal: React.FC<Props> = (props) => {
  const { msg, open, openModal } = props;

  // webSocket.on("remove-cart-item-ack", (data: string) => {
  //   setOpen(true);
  //   setResponse(data);
  // });

  return (
    <Modal closeIcon open={open} onClose={() => openModal()}>
      <Header icon="archive" content="Some changed the data" />
      <Modal.Content>
        <Header>{msg}</Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => openModal()}>
          <Icon name="checkmark" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CartAckModal;
