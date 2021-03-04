import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
// import Signin from "./components/signi/Signin.js";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin.js";
import Cart from "./components/Cart/Cart";
import AdminRoutes from "./components/Dashboard/Admin/AdminRoutes";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import UserRoutes from "./components/Dashboard/User/UserRoutes";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import ManageProduct from "./components/CreateProduct/ManageProduct";
import UpdateProduct from "./components/CreateProduct/UpdateProduct";
import Order from "./components/Order/Order";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <UserRoutes path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={CreateProduct}
        />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={CreateCategory}
        />
        <AdminRoutes path="/admin/products" exact component={ManageProduct} />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <UserRoutes path="/user/orders" exact component={Order} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
