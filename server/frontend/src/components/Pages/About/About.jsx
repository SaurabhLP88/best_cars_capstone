import React from "react";
import Header from "../../Common/Header/Header";

import ceoImg from "../../../assets/images/ceo.jpg";
import cmoImg from "../../../assets/images/cmo.jpg";
import cfoImg from "../../../assets/images/cfo.jpg";

const About = () => {
  return (
    <div>
      <Header />

      <div className="card" style={{ width: "80%", margin: "auto", marginTop: "5%" }}>
        <div className="banner" name="about-header">
          <h1>About Us</h1>
          <p>
            Welcome to Best Cars dealership, home to the best cars in India.
            We deal in sale of domestic and imported cars at reasonable prices.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: "auto",
            flexWrap: "wrap"
          }}
        >
          {/* CEO */}
          <div className="card" style={{ width: "30%", minWidth: "280px", margin: "10px" }}>
            <img className="card-img-top" src={ceoImg} alt="CEO" />
            <div className="card-body">
              <p className="title">Rajiv Malhotra</p>
              <p className="fw-bold">Chief Executive Officer (CEO)</p>
              <p className="card-text">
                Rajiv has over 20 years of experience in the automotive industry
                and leads the company with a vision for innovation and growth.
                He is passionate about building strong customer relationships.
              </p>
              <p className="fw-bold fst-italic">
                rajiv.malhotra@bestcars.com
              </p>
            </div>
          </div>

          {/* CFO */}
          <div className="card" style={{ width: "30%", minWidth: "280px", margin: "10px" }}>
            <img className="card-img-top" src={cmoImg} alt="CFO" />
            <div className="card-body">
              <p className="title">Ananya Sharma</p>
              <p className="fw-bold">Chief Financial Officer (CFO)</p>
              <p className="card-text">
                Ananya manages the company’s finances with precision and
                strategic insight. She ensures sustainable growth through
                smart financial planning.
              </p>
              <p className="fw-bold fst-italic">
                ananya.sharma@bestcars.com
              </p>
            </div>
          </div>

          {/* CMO */}
          <div className="card" style={{ width: "30%", minWidth: "280px", margin: "10px" }}>
            <img className="card-img-top" src={cfoImg} alt="CMO" />
            <div className="card-body">
              <p className="title">Vikram Singh</p>
              <p className="fw-bold">Chief Marketing Officer (CMO)</p>
              <p className="card-text">
                Vikram drives marketing strategies that enhance brand presence
                and customer engagement. He brings creativity and data-driven
                decisions to every campaign.
              </p>
              <p className="fw-bold fst-italic">
                vikram.singh@bestcars.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
