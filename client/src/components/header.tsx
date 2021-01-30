import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Visibility,
} from "semantic-ui-react";
import { ICartItem } from "types";

interface Props {
  cart: ICartItem;
}

const Header: React.FC<Props> = (props) => {
  const { cart } = props;
  const menuStyle = {
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    marginBottom: "1em",
    marginTop: "4em",
    transition: "box-shadow 0.5s ease, padding 0.5s ease",
  };

  const fixedMenuStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  };

  const [menuFixed, setMenuFixed] = useState(false);

  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);

  const cartItemCount = (): number => {
    if (Object.keys(cart).length) {
      return Object.values(cart).reduce((a, b) => a + b);
    }
    return 0;
  };

  return (
    <Visibility
      onBottomPassed={stickTopMenu}
      onBottomVisible={unStickTopMenu}
      once={false}
    >
      <Menu
        borderless
        fixed={menuFixed ? "top" : undefined}
        style={menuFixed ? fixedMenuStyle : menuStyle}
      >
        <Container text>
          <Menu.Item>
            <Image size="mini" src="/logo.png" />
          </Menu.Item>
          <Menu.Item header>Malware Byte Test</Menu.Item>
          <Menu.Item as="a">Blog</Menu.Item>
          <Menu.Item as="a">Articles</Menu.Item>

          <Menu.Menu position="right">
            <Dropdown
              text={`Total Cart Items: ${cartItemCount()} Item(s)`}
              pointing
              className="link item"
            >
              <Dropdown.Menu>
                <Dropdown.Item>Checkout Cart</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </Visibility>
  );
};

export default Header;
