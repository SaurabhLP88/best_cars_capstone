import React from "react";
import Header from "../../Common/Header/Header";

import homeImg from "../../../assets/images/car_dealership.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="card"
          style={{
            width: "50%",
            marginTop: "50px",
            alignSelf: "center",
          }}
        >
          <img src={homeImg} className="card-img-top" alt="Dealership" />
          <div className="banner">
            <h5>Welcome to our Dealerships!</h5>

            <Link
              to="/dealers"
              className="btn"
              style={{ backgroundColor: "aqua", margin: "10px" }}
            >
              View Dealerships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
