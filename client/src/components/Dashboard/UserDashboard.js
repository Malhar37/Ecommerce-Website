import React from "react";
import { Link } from "react-router-dom";
import Base from "../Base/Base";
import "./AdminDashboard.css";

const UserDashboard = () => {
  return (
    <Base>
    <div className="container " style={{margin: "50px auto"}} >
      <div className="card">
        <h4 className="card-header text-center bg-dark  text-white">User Navigation</h4>
        <ul className="list-group">
          
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/user/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </Base>
  );
};
export default UserDashboard;
