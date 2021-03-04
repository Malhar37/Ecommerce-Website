import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, signin, signup } from "../../apicalls/auth";
import Base from "../Base/Base";
import "../Signup/Signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const [redirect, setRedirect] = useState(false);

  const { email, password, phone, name, success, error, loading } = values;

  const handleChange = (data) => (event) => {
    setValues({ ...values, error: false, [data]: event.target.value });
  };

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

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password, phone })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          signin({ email, password }).then((data) => {
            if (data.error) {
              alert("Failed to Sign in Error:- ", error);
            }
            authenticate(data, () => {
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                error: "",
                phone: "",
                success: true,
              });
              setRedirect(true);
            });
          });
        }
      })
      .catch(console.log("error in signing up"));
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully Please
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    if (error) alert("Failed to Signup! Error:- ", error);
  };

  const SignUpForm = () => {
    return (
      <div className="main">
        <div className="container">
          <div className="signupform">
            <div className="row">
              <div className="col-md-6">
                <div className="img">
                  <img src="assets/login.png" />
                  <div className="vl"></div>
                </div>
              </div>
              <div className="col-md-6">
                <form className="form">
                  <div className="form-group">
                    <input
                      type="text"
                      value={name}
                      onChange={handleChange("name")}
                      className="form-control"
                      placeholder="Enter name"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={handleChange("email")}
                      className="form-control"
                      placeholder="Enter a valid email address"
                    />

                    <input
                      type="tel"
                      value={phone}
                      onChange={handleChange("phone")}
                      className="form-control"
                      placeholder="Enter a valid phone no"
                    />
                    <input
                      className="pass"
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      className="form-control"
                      placeholder="Enter a valid password"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="mt-3 btn btn-block btn-primary"
                  >
                    Signup
                  </button>
                  <p className="mt-3">
                    Have an account?
                    <a
                      href="/signin"
                      style={{ color: "blue", textDecoration: "none" }}
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {loadingMessage()}
      {sucessMessage()}
      {errorMessage()}
      {SignUpForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signup;
