import React from "react";
import Image from "../products/Card/Image";

const Product = ({ product }) => {
  return product.map((product, index) => (
    // console.log(product);
    <div>
      <hr />
      <div className="row">
        <div className="col-md-2 col-12">
          <Image product={product.item} />
        </div>
        <div style={{ marginTop: "10px" }} className="text-center col-md-8 col-12">
          <p style={{ fontSize: "18px" }} className="title">
            {product.item.name} ({product.item.rom}, {product.item.ram},{" "}
            {product.item.color})
          </p>
          <p style={{ marginBottom: "0" }}>Product Id: {product.item._id}</p>
          <p className="badges" style={{ fontSize: "20px" }}>
            <span className="badge badge-info">
              {product.item.category.name}
            </span>
            <span className="badge badge-dark">{product.item.brand}</span>
            <span className="badge badge-success">{product.item.camera}</span>
          </p>
        </div>
        <div className="col-md-2 col-12">
          <p className="price">₹{product.item.price}</p>
        </div>
      </div>
    </div>
  ));
};

export default Product;
