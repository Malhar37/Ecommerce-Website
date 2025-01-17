import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../apicalls/auth";
import { createProduct, getDistinctCategories } from "../../apicalls/product";
import Base from "../Base/Base";

const CreateProduct = () => {
  const { user, token } = isAuthenticated();
  const [open, setOpen] = useState(true);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    brand: "",
    camera: "",
    ram: "",
    battery: "",
    rom: "",
    color: "",
    formData: "",
    success: false,
    error: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    brand,
    camera,
    ram,
    battery,
    rom,
    color,
    formData,
    success,
    error,
  } = values;

  const preload = () => {
    getDistinctCategories().then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setValues({ ...values, categories: res, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    createProduct(user._id, token, formData).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
        console.log(res.error);
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          brand: "",
          camera: "",
          ram: "",
          battery: "",
          rom: "",
          color: "",
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
        message="Product Created Successfully"
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
    const value =
      nameOfField === "photo" ? event.target.files[0] : event.target.value;
    formData.set(nameOfField, value);
    setValues({ ...values, [nameOfField]: value });
  };


  const createProductForm = () => {
    return (
      <form>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="form-group">
              <div className="custom-file">
                <input
                  onChange={handleChange("photo")}
                  name="photo"
                  type="file"
                  className="custom-file-input"
                  id="customfile"
                />
                <label className="custom-file-label" htmlFor="customfile">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={name}
                onChange={handleChange("name")}
                placeholder="Enter Product Name"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={brand}
                onChange={handleChange("brand")}
                placeholder="Enter Brand"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="form-group">
              <textarea
                className="form-control"
                value={description}
                onChange={handleChange("description")}
                placeholder="Enter Description"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={camera}
                onChange={handleChange("camera")}
                placeholder="Camera"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input
                className="form-control"
                value={battery}
                onChange={handleChange("battery")}
                placeholder="Battery Capacity"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={ram}
                onChange={handleChange("ram")}
                placeholder="RAM"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input
                className="form-control"
                value={rom}
                onChange={handleChange("rom")}
                placeholder="Storage"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={handleChange("price")}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <select
                onChange={handleChange("category")}
                className="form-control"
                placeholder="Category"
              >
                <option>Select</option>
                {categories.map((cate, index) => {
                  return (
                    <option key={index} value={cate._id}>
                      {cate.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <div className="form-group">
              <input
                className="form-control"
                value={color}
                onChange={handleChange("color")}
                placeholder="Color"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={handleChange("stock")}
                placeholder="Stock"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-2 col">
            <button type="submit" onClick={onSubmit}>
              Create Product
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

export default CreateProduct;
