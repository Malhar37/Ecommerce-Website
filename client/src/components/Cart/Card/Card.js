import React, { useEffect } from "react";
import "../Card/Card.css";
import Image from "../../products/Card/Image";
import {
  DecreaseValue,
  IncreaseValue,
  RemoveItemFromCart,
} from "../CartHelper";

const Card = ({
  product,
  setReload = (f) => f,
  //the above means function(f){return f}

  reload,
}) => {
  const DecreaseValue1 = () => {
    DecreaseValue(product);
    setReload(!reload);
  };

  const IncreaseValue1 = () => {
    IncreaseValue(product);
    setReload(!reload);
  };

  const RemoveItemFromCart1 = () => {
    RemoveItemFromCart(product.item._id);
    setReload(!reload);
  };

  return (
    <div className="row card-element1">
      <div className="col-md-3 col-12">
        <Image product={product.item} />
      </div>
      <div style={{ marginTop: "10px" }} className=" col-md-9 col-12">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: "18px" }} className="title">
            {product.item.name} ({product.item.rom}, {product.item.ram}, {product.item.color})
          </p>
          <button onClick={RemoveItemFromCart1}>
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
        <p style={{ marginBottom: "0" }}>Product Id: {product.item._id}</p>
        <p className="badges" style={{ fontSize: "20px" }}>
          <span className="badge badge-info">{product.item.category.name}</span>
          <span className="badge badge-dark">{product.item.brand}</span>
          <span className="badge badge-success">{product.item.camera}</span>
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="price">₹{product.item.price}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={IncreaseValue1} className="addsub">
              +
            </button>
            <p style={{ marginBottom: "0" }}>{product.count}</p>
            <button
              onClick={DecreaseValue1}
              style={{ padding: "auto" }}
              className="addsub"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
