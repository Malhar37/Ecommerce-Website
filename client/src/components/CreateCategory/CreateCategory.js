import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../apicalls/auth";
import { createCategory } from "../../apicalls/category";
import Base from "../Base/Base";

const CreateCategory = () => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = React.useState(true);

  const [values, setValues] = useState({
    name: "",
    success: false,
    error: "",
  });

  const { name, success, error } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    createCategory(user._id, token, {name}).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
        console.log(res.error);
      } else {
        setValues({
          ...values,
          name: "",
          success: true,
        });
        console.log("Success ", values);
      }
    });
  };

  const successMessage = () => {
    return success ? (
      <Snackbar
        style={{ backgroundColor: "green" }}
        open={open}
        color
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Category Created Successfully"
        onClose={() => {
          setOpen(false);
        }}
      />
    ) : (
      <div></div>
    );
  };
  const errorMessage = () => {
    return error ? (
      <Snackbar
        style={{ backgroundColor: "green" }}
        open={true}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={error}
      />
    ) : (
      <div></div>
    );
  };

  const handleChange = (nameOfField) => (event) => {
    setValues({ ...values, [nameOfField]: event.target.value });
  };

  const createProductForm = () => {
    return (
      <form>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                placeholder="Enter Category Name"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-2 col">
            <button type="submit" onClick={onSubmit}>
              Create Category
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base>
      <div className="container">
        <div className="card-element">
          {createProductForm()}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
    </Base>
  );
};

export default CreateCategory;
