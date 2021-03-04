import React from "react";
import { Link } from "react-router-dom";
import Base from "../Base/Base";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <Base>
    <div className="container " style={{margin: "50px auto"}} >
      <div className="card">
        <h4 className="card-header text-center bg-dark  text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </Base>
  );
};
export default AdminDashboard;
