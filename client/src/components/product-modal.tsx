import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Modal, Grid, Divider, List } from "semantic-ui-react";

import { IModalProps } from "types";
import { RootState } from "store/reducers";


interface IModal extends IModalProps {
  toggleOpen: Function;
  addToCart: Function;
}


const ProductModal: React.FC<IModal> = (props) => {
  const { shouldOpen: open, toggleOpen, selectedProduct, addToCart } = props;

  const { cart } = useSelector(
    (state: RootState) => state.ProductSlice
  );

  return (
    <Modal open={open}>
      <Modal.Header>Item Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid columns={2} padded>
            <Grid.Column>
              <Header>{selectedProduct?.name}</Header>
              <p>
                {selectedProduct && selectedProduct?.description.length > 250
                  ? selectedProduct?.description.substring(0, 250) + " ..."
                  : selectedProduct?.description}
              </p>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Header>
                <Grid columns={2}>
                  <Grid.Column>
                    <Header size="small"> ${selectedProduct?.price}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Header size="small"> {selectedProduct?.quantity}</Header>
                  </Grid.Column>
                </Grid>
              </Header>
              <List>
                <List.Item>
                  <Button
                    basic
                    color="green"
                    content="add to cart"
                    onClick={() => addToCart(selectedProduct?._id)}
                  />
                </List.Item>
                <List.Item>
                  <Button basic color="yellow" content="remove from cart" />
                </List.Item>
              </List>
              <br />
              <Divider />
              <Header size="tiny"> This items in cart: { selectedProduct  && cart[selectedProduct._id] ? cart[selectedProduct._id] : 0 } </Header>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleOpen()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ProductModal;
