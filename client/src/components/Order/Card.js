import { Avatar, Chip } from "@material-ui/core";
import React, { useEffect } from "react";
import Image from "../products/Card/Image";
import Product from "./Product";

const Card = ({ order }) => {
  console.log(order);
  return (
    <div >
      {order.map((o, index) => {
        return (
          <div className="card-element">
            <div className="row" style={{ margin: "20px auto 30px auto" }}>
              <div className="col-md-4">
                <Chip
                  avatar={<Avatar>Id</Avatar>}
                  label={o._id}
                  color="primary"
                />
              </div>
              <div className="col-md-4">Total: ₹{o.amount}</div>
              <div className="col-md-4">Order Status: <i class="fas fa-circle" style={{color: "green"}}></i>  {o.status}</div>
            </div>
            <h4>Products</h4>
            <Product product={o.products} />
          </div>
        );
      })}
    </div>
  );
};

export default Card;
