import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import webSocket from "utils/socket-client";

interface Props {}

const CartAckModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [wsResponse, setResponse] = useState("");

  webSocket.on("add-cart-item-ack", (data: string) => {
    setOpen(true);
    setResponse(data);
  });

  return (
    <Modal closeIcon open={open}>
      <Header icon="archive" content="Some changed the data" />
      <Modal.Content>
        <Header>{wsResponse}</Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CartAckModal;
