import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import Filter from "../Filter/Filter";
import Products from "../products/Products";

var filters1 = [];
const Home = () => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(reload);
  }, [reload]);

  const handleFilters = (filters) => {
    // console.log(filters);
    filters1 = filters;
    // console.log(filters1);
  };
  return (
    <Base>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Filter
              setReload={setReload}
              reload={reload}
              handleFilters={(filters) => handleFilters(filters)}
            />
          </div>
          <div className="col-md-8">
            <Products
              setReload={setReload}
              reload={reload}
              category={filters1}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
