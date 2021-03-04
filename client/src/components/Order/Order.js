import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../apicalls/auth";
import { getOrder } from "../../apicalls/order";
import Base from "../Base/Base";
import Card from "./Card";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrder(user._id, token).then((res) => {
    setLoading(false);

      console.log(res);
      if (res.error) {
        console.log(res.error);
      } else {
        setOrders(res);
      }
    });
  }, []);

  const loadingMessage = () => {
    if (loading) {
      return (
        <div>
          <Backdrop open={true}  style={{ zIndex: "1", color:"#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }
  };

  return (
    <Base>
    {loadingMessage()}
      <div className="container">
        <Card order={orders} />
      </div>
    </Base>
  );
};

export default Order;
