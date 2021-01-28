import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "./store/slices/product.slice";
import { RootState } from "./store/reducers";
import "./App.css";

import webSocket from "./utils/socket-client";

interface Props {}

const App: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const todos = useSelector(
    (state: RootState) => state.ProductSlice.products
  )

  useEffect(() => {
    dispatch(getProducts());
  });

  // const [newMessage, setMessage] = useState('')

  // const [allMessages, setAllMessages] = useState<string[]>([])

  // webSocket.on('chat', (data: any) => {
  //   setAllMessages([...allMessages, data]);
  // });

  // const sendMessage = () => {
  //   console.log('SENT');

  //   webSocket.emit('chat', newMessage);

  //   setMessage('');
  // }

  return (<div className="App"></div>);
};

export default App;
