import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Segment, Image, Loader, Dimmer } from "semantic-ui-react";

import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/produc-list";
import "styles.css";

import {
  getProducts,
  addCartToStore,
  removeCartItemFromStore,
} from "store/slices/product.slice";
import { RootState } from "store/reducers";

interface Props {}

const App: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { products, isLoading, cart } = useSelector(
    (state: RootState) => state.ProductSlice
  );

  const addToCart = (item: string) => {
    dispatch(addCartToStore(item));
  };

  const removeCartItem = (item: string) => {
    dispatch(removeCartItemFromStore(item));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Header cart={cart} />
      
        {isLoading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="large">Loading Products</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        ) : (
          <Container>
          <ProductList
            products={products}
            addToCart={addToCart}
            removeCartItem={removeCartItem}
          />
          </Container>
        )}
      <Footer />
    </div>
  );
};

export default App;
