const { API } = require("../backend");

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("ERROR", err));
};

export const getOrder = (userId, token) => {
  return fetch(`${API}/order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const payAmount = (amount) => {
  return fetch(`${API}/razorpay`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ amount: amount }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("ERROR", err));
};
