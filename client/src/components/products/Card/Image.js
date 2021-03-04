import React from "react";
import { API } from "../../../backend";

const Image = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : "https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg,h_380,w_380/v1613735851/Croma%20Assets/Communication/Mobiles/Images/232728_mh7iqa.png";

  return <img src={imageurl} style={{ maxHeight: "100%", maxWidth: "100%" }} />;
};
export default Image;
