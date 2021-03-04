import React, { useEffect, useState } from "react";
import { getDistinctCategories } from "../../apicalls/product";
import "../Filter/Filter.css";

const Filter = ({ reload, setReload = (f) => f, handleFilters = (f) => f }) => {
  const [checked, setChecked] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadAllCategories();
  }, [reload]);

  const loadAllCategories = () => {
    getDistinctCategories().then((res) => {
      console.log(res)
      if (res.error) console.log(res.error);
      else {
        // console.log(res);
        setCategory(res);
      }
    });
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      //Ref:- https://www.w3schools.com/jsref/jsref_splice.asp
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setReload(!reload);
    handleFilters(newChecked);
    // console.log(checked);
  };

  return (
    <div className="card-element">
      <p>FILTER BY</p>
      <hr />
      <p>Category</p>
      {category.map((cate, index) => {
        return (
          <div className="form-check">
            <input
              checked={checked.indexOf(cate._id) === -1 ? false : true}
              onChange={() => {
                handleToggle(cate._id);
              }}
              className="form-check-input"
              type="checkbox"
            />
            <label className="form-check-label">{cate.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
