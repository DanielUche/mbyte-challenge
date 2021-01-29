import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";

import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/produc-list";

import { getProducts, addCartToStore } from "store/slices/product.slice";
import { RootState } from "store/reducers";
import webSocket from "./utils/socket-client";

interface Props {}

const App: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { products, isLoading, cart, isCartLoading } = useSelector(
    (state: RootState) => state.ProductSlice
  );

  const addToCart = (item: string) => {
    dispatch(addCartToStore(item));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


    // const [newMessage, setMessage] = useState('')

    const [allMessages, setAllMessages] = useState<string[]>([])

    webSocket.on('chat', (data: any) => {
      setAllMessages([...allMessages, data]);
    });

    // const sendMessage = () => {
    //   console.log('SENT');

    //   webSocket.emit('chat', newMessage);

    //   setMessage('');
    // }

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
