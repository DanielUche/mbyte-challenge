import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";

import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/produc-list";

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
      <Container>
        <ProductList
          products={products}
          addToCart={addToCart}
          removeCartItem={removeCartItem}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
