export const addItemToCart = (item) => {
  let cart = [];
  let i = 0,
    totalcount = 0,
    total = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      //   totalcount =
      var check = cart.find((cartItem, index) => {
        if (cartItem.item._id === item._id) {
          i = index;
          return true;
        }
      });

      if (check) {
        cart[i].count++;
        cart[i].total = cart[i].total + cart[i].price;
      } else {
        cart.push({ item, count: 1, total: item.price, price: item.price });
      }
    } else {
      cart.push({ item, count: 1, total: item.price, price: item.price });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const RemoveItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product.item._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
};

export const IncreaseValue = (product) => {
  let cart = [];
  let i = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    var check = cart.find((cartItem, index) => {
      if (cartItem.item._id === product.item._id) {
        i = index;
        return true;
      }
    });
    if (check) {
      cart[i].count++;
      cart[i].total += cart[i].price;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
};

export const DecreaseValue = (product) => {
  let cart = [];
  let i = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    var check = cart.find((cartItem, index) => {
      if (cartItem.item._id === product.item._id) {
        i = index;
        return true;
      }
    });
    if (check) {
      {
        cart[i].count--;
        cart[i].total -= cart[i].price;
      }
      if (cart[i].count === 0) {
        cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
