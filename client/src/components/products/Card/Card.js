import React, { useEffect } from "react";
import { addItemToCart } from "../../Cart/CartHelper";
import "../Card/Card.css";
import Image from "./Image";

const Card = ({ product, reload, setReload = (f) => f }) => {
  const addToCart = () => {
    addItemToCart(product);
    setReload(!reload);
  };

  return (
    <div className="row card-element">
      <div className="col-md-4 col-12">
        <Image product={product} />
      </div>
      <div style={{ marginTop: "10px" }} className=" col-md-8 col-12">
        <p style={{ fontSize: "18px" }} className="title">
          {product.name} ({product.rom}, {product.ram}, {product.color})
        </p>
        <p style={{ marginBottom: "0" }}>Product Id: {product._id}</p>
        <p className="badges" style={{ fontSize: "20px" }}>
          <span className="badge badge-info">{product.category.name}</span>
          <span className="badge badge-dark">{product.brand}</span>
          <span className="badge badge-success">{product.camera}</span>
          {/* <span className="badge badge-info">{product.category}</span> */}
        </p>
        <p>
          Stock: <span className="badge badge-danger">{product.stock}</span>
        </p>
        <p style={{ marginBottom: "0" }}>{product.description}</p>
        <p className="price">₹{product.price}</p>
        {product.stock > 0 ? (
          <div className="text-center">
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Card;
