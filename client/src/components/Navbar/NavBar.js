import React from "react";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { Nav, Navbar, NavLink } from "react-bootstrap";
import "../Navbar/Navbar.css";
import { signout, isAuthenticated } from "../../apicalls/auth";

const NavBar = ({ count = 0 }) => {
  const calculateCount = () => {
    if (typeof window !== undefined) {
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        // console.log(cart);
        cart.map((value, index) => {
          // console.log(value);
          count += value.count;
        });
      }
    }
  };

  calculateCount();
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#78c4d4" }} sticky="top">
      <Navbar.Brand href="/">Mobile Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="/">Home</NavLink>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <NavLink href="/user/dashboard">Dashboard</NavLink>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <NavLink href="/admin/dashboard">Dashboard</NavLink>
          )}
          {!isAuthenticated() && (
            <>
              <NavLink href="/signin">Sign In</NavLink>
              <NavLink href="/signup">SignUp</NavLink>
            </>
          )}

          {isAuthenticated() && (
            <NavLink
              href="/"
              onClick={() => {
                signout();
              }}
            >
              Signout
            </NavLink>
          )}
        </Nav>
        <Nav>
          <NavLink href="/cart" className="navlinks">
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon color="action" />
            </Badge>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
