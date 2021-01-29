import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { IProduct, IModalProps } from "types";


import ProductModal from "components/product-modal";
import { selectProduct } from "store/slices/product.slice";

interface Props {
  products: IProduct[];
  addToCart : Function
}

const options: IModalProps = {
  selectedProduct: null,
  shouldOpen: false,
};

const ProductList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { products, addToCart  } = props;
  const [modalOption, setOpen] = React.useState<IModalProps>(options);

  const toggleOpen = () =>
    setOpen((prevState: IModalProps) => ({
      ...prevState,
      shouldOpen: !prevState.shouldOpen,
    }));

  const openModal = (selectedProduct: IProduct) => {
    dispatch(selectProduct(selectedProduct))
    setOpen((prevState: IModalProps) => ({
      ...prevState,
      selectedProduct,
      shouldOpen: !prevState.shouldOpen,
    }));
  };

  return (
    <div>
      <ProductModal
        shouldOpen={modalOption.shouldOpen}
        selectedProduct={modalOption.selectedProduct}
        toggleOpen={toggleOpen}
        addToCart={addToCart}
      />

      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Called</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product, i) => {
            return (
              <Table.Row key={`${i}-product-list`}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => openModal(product)}
                    positive
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductList;
