import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Visibility,
} from "semantic-ui-react";

const Header = () => {
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

  const [overlayFixed, setOverlayFixed] = useState(false);
  const [menuFixed, setMenuFixed] = useState(false);


  const stickTopMenu = () => setMenuFixed(true);


  const unStickTopMenu = () => setMenuFixed(false);

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
            <Dropdown text="Dropdown" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </Visibility>
  );
};

export default Header;
