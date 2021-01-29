import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";

import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/produc-list";

import { getProducts, addCartToStore } from "store/slices/product.slice";
import { RootState } from "store/reducers";

import { ICartItem } from "types";

interface Props {};

let iniTialCart: ICartItem = {};

const App: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  // const [cart, setCartItem] = useState(iniTialCart);

  const { products, isLoading, cart } = useSelector(
    (state: RootState) => state.ProductSlice
  );

  const addToCart = (item: string) => {
  
    dispatch(addCartToStore(item));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(cart);


  return (
    <div>
      <Header />
      <Container>
        <ProductList products={products} addToCart={addToCart} />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
