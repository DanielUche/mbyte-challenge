import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "store";
import App from "./App";


let renderedApp = render(
  <Provider store={store}>
    <App />
  </Provider>
);
describe("App", () => {
  describe("When the fetch operation is pendind", () => {
    it("shows a loading indicator", () => {
      const { getByText } = renderedApp;
      expect(getByText(/Loading/i)).toBeInTheDocument();
      cleanup();
    });
  });

  describe("when fetch operation is done", () => {
    it("shows a list of products", async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      setTimeout(async () => {
        expect(await screen.findByText(/Iphone 3/i)).toBeInTheDocument();
        expect(await screen.findByText(/Iphone 6x/i)).toBeInTheDocument();
      }, 1000);
    });
  });

  it("shows modal when item is clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    setTimeout(async () => {
      //wait for the api to load products
      expect(await screen.findByText(/Iphone 3/i)).toBeInTheDocument();
      //click the product
      fireEvent.click(screen.getByText(/Iphone 3/i));
      //expect modal to be poped up with heading item details
      expect(await screen.findByText(/Item Details/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/This items in cart: 0/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/Close/i)).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Close/i));
      expect(screen.queryByText(/Item Details/i)).not.toBeInTheDocument();
    }, 1000);
  });
});
