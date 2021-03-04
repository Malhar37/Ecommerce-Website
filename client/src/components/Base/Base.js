import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/NavBar";

const Base = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
