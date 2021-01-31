import React, { useEffect, useState } from "react";
import { Header, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, IModalProps, IAcknowledgementResponse } from "types";

import ProductModal from "components/product-modal";
import { selectProduct, getClearCartLoading } from "store/slices/product.slice";
import { RootState } from "store/reducers";
import CartAckModal from "./cart-ack=modal";
import webSocket from "utils/socket-client";
import {
  updateCartOnAcknolodgement,
  updateCartOnRemove,
} from "store/slices/product.slice";

interface Props {
  products: IProduct[];
  addToCart: Function;
  removeCartItem: Function;
}

const options: IModalProps = {
  shouldOpen: false,
};

const ProductList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { products, addToCart, removeCartItem } = props;
  const [modalOption, setOpen] = React.useState<IModalProps>(options);
  const [openAckModal, setAckModal] = React.useState(false);
  const [ackData, setAckData] = useState("");

  const { isCartLoading } = useSelector(
    (state: RootState) => state.ProductSlice
  );

  const toggleOpen = () => {
    setOpen((prevState: IModalProps) => ({
      ...prevState,
      shouldOpen: !prevState.shouldOpen,
    }));

    if (isCartLoading) {
      dispatch(getClearCartLoading());
    }
  };

  const openModal = (selectedProduct: IProduct) => {
    dispatch(selectProduct(selectedProduct));
    setOpen((prevState: IModalProps) => ({
      ...prevState,
      selectedProduct,
      shouldOpen: !prevState.shouldOpen,
    }));
  };

  useEffect(() => {
    webSocket.on("add-cart-item-ack", (data: IAcknowledgementResponse) => {
      setAckModal(!openAckModal);
      setAckData(data.msg);
      dispatch(updateCartOnAcknolodgement(data));
    });
    webSocket.on("remove-cart-item-ack", (data: IAcknowledgementResponse) => {
      setAckModal(!openAckModal);
      setAckData(data.msg);
      dispatch(updateCartOnRemove(data));
    });
  }, []);

  const toggleAckModal = () => {
    setAckModal(!openAckModal);
  };

  return (
    <div>
      <ProductModal
        shouldOpen={modalOption.shouldOpen}
        toggleOpen={toggleOpen}
        addToCart={addToCart}
        removeCartItem={removeCartItem}
      />

      <CartAckModal
        msg={ackData}
        open={openAckModal}
        openModal={toggleAckModal}
      />
      <Header size="large">Our Products</Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product, i) => {
            return (
              <Table.Row key={`${i}-product-list`} className="item-row">
                <Table.Cell className="item-color ">
                  <p onClick={() => openModal(product)}>{product.name}</p>
                </Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductList;
