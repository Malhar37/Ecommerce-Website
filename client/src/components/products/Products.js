import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../apicalls/product";
import Card from "./Card/Card";

const Products = ({ reload, setReload, category }) => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts().then((data) => {
      setLoading(false);
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

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
  return (
    <div>
      {loadingMessage()}
      {category.length === 0
        ? Products.map((product, index) => {
            return (
              <div key={index}>
                <Card product={product} reload={reload} setReload={setReload} />
              </div>
            );
          })
        : Products.map((product, index) => {
            if (category.includes(product.category._id))
              return (
                <div key={index}>
                  <Card
                    product={product}
                    reload={reload}
                    setReload={setReload}
                  />
                </div>
              );
          })}
    </div>
  );
};

export default Products;
