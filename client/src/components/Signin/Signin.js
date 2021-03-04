import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../../apicalls/auth";
import Base from "../Base/Base";
import "../Signin/Signin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (data) => (event) => {
    setValues({ ...values, error: false, [data]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log("DATA:- ", data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          console.log(data.error);
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("sign in request failed"));
    console.log(values);
  };
  // TODO do a redirection here
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
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

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const SignInForm = () => {
    return (
      <div className="main">
        <div className="container">
          <div className="signinform">
            <div className="row">
              <div className="col-md-6">
                <div className="img">
                  <img src="assets/login.png" alt="Just another img" />
                  <div className="vl"></div>
                </div>
              </div>
              <div className="col-md-6">
                <form className="form">
                  <div className="form-group">
                    {/* <label>Email Address</label> */}
                    <input
                      className="email"
                      type="email"
                      value={email}
                      onChange={handleChange("email")}
                      className="form-control"
                      placeholder="Enter a valid email address"
                    />
                    {/* <label>Password</label> */}
                    <input
                      className="pass"
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      className="form-control"
                      placeholder="Enter a valid password"
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <a
                      href="/"
                      style={{
                        fontSize: "13px",
                        color: "grey",
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    onClick={onSubmit}
                    className="mt-3 btn btn-block btn-primary"
                  >
                    Login
                  </button>
                  {/* <p className=" text-center">{JSON.stringify(values)}</p> */}
                  <p className="mt-3">
                    Don't have an account?
                    <a
                      href="/signup"
                      style={{ color: "blue", textDecoration: "none" }}
                    >
                      Signup here
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
      {errorMessage()}
      {SignInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
