import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../apicalls/auth";
import { deleteProduct, getProducts } from "../../apicalls/product";
import Base from "../Base/Base";
import Image from "../products/Card/Image";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {products.map((product, index) => {
              return (
                <div className="row card-element1">
                  <div className="col-md-3 col-12">
                    <Image product={product} />
                  </div>
                  <div
                    style={{ marginTop: "10px" }}
                    className=" col-md-9 col-12"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ fontSize: "18px" }} className="title">
                        {product.name} ({product.rom}, {product.ram},{" "}
                        {product.color})
                      </p>
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <p style={{ marginBottom: "0" }}>
                      Product Id: {product._id}
                    </p>
                    <p className="badges" style={{ fontSize: "20px" }}>
                      <span className="badge badge-info">
                        {product.category.name}
                      </span>
                      <span className="badge badge-dark">{product.brand}</span>
                      <span className="badge badge-success">
                        {product.camera}
                      </span>
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="price">₹{product.price}</p>
                      <button>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/admin/product/update/${product._id}`}
                        >
                          Update
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageProduct;
