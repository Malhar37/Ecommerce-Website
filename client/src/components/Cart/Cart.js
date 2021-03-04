import React, { useEffect, useState } from "react";
import { cartEmpty, loadCart } from "./CartHelper";
import { isAuthenticated } from "../../apicalls/auth";
import { createOrder, payAmount } from "../../apicalls/order";
import Base from "../Base/Base";
import Card from "./Card/Card";
import "../Cart/Cart.css";

const Cart = () => {
  const [Products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  var amount = 0;
  const { user, token } = isAuthenticated();

  const createOrderAndPay = () => {
    payAmount(amount)
      .then((res) => {
        const { amount, id: order_id, currency } = res;

        var options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: currency,
          name: "Malhar Lohar",
          description: "This is a Test Transaction",
          image: "./assets/logo.png",
          order_id: order_id,
          handler: (response) => {
            alert(
              "Payment Successful! Transaction id is " +
                response.razorpay_payment_id
            );

            const orderData = {
              products: Products,
              transaction_id: response.razorpay_payment_id,
              amount: amount / 100,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            // console.log(amount);
            // console.log(orderData);

            createOrder(user._id, token, orderData);

            cartEmpty(() => {});
            setReload(!reload);
          },
          notes: {
            address: "Nashik",
          },
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", (response) => {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch((err) => console.log(err));
  };

  const Total = (a) => {
    if (a < 500) a = a + 50;
    amount = a;
    return a;
  };

  const Checkout = (a) => {
    if (total > 500) {
      var delivery = "FREE";
    } else {
      var delivery = 50;
    }

    return (
      <div className="card-element2">
        <h3>Payment Details</h3>
        <table className="paymenttable" width="100%">
          <tr>
            <td>Item Total</td>
            <th>{a}</th>
          </tr>
          <tr style={{ borderBottom: "1px solid #e7e6e1" }}>
            <td>Delivery charges</td>
            <th>{delivery}</th>
          </tr>
          <tr>
            <td>Total Price</td>
            <th>{Total(a)}</th>
          </tr>
        </table>
        <div style={{ textAlign: "right" }}>
          {isAuthenticated() ? (
            <button onClick={createOrderAndPay}>Checkout</button>
          ) : (
            <a href="/signin">
              <button>Sign in to Checkout</button>
            </a>
          )}
        </div>
      </div>
    );
  };

  let total = 0;
  return (
    <Base>
      <div className="container">
        {Products.length !== 0 ? (
          <>
            <div className="row">
              <div className="col-md-8 col-12">
                {Products.map((product, index) => {
                  total += product.total;
                  return (
                    <Card
                      product={product}
                      setReload={setReload}
                      reload={reload}
                    />
                  );
                })}
              </div>
              <div className="col-md-4 col-12">{Checkout(total)}</div>
            </div>
          </>
        ) : (
          <h2 className="text-center" style={{ margin: "7em auto" }}>
            Your Cart is Empty
          </h2>
        )}
      </div>
    </Base>
  );
};

export default Cart;
