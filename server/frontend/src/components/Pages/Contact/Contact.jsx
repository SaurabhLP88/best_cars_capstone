import React from "react";
import Header from "../../Common/Header/Header";

import carsImg from "../../../assets/images/cars.jpeg";

const Contact = () => {
  return (
    <div>
      <Header />

      <div className="card" style={{ width: "80%", margin: "auto", marginTop: "5%" }}>
        <div className="banner" name="about-header">
          <h1>Contact Us</h1>
          <p>Reach us easily for assistance or information.</p>
        </div>

        <section className="container py-5">
          <div className="row align-items-center">
            
            {/* Contact Details */}
            <div className="col-md-6 mb-4 mb-md-0">
              <p className="mb-3">
                <strong>Customer Service:</strong>{" "}
                <a href="mailto:customerservice@bestcars.com" className="text-decoration-none text-primary">
                  customerservice@bestcars.com
                </a>
              </p>

              <p className="mb-3">
                <strong>National Advertising Team:</strong>{" "}
                <a href="mailto:advertising@bestcars.com" className="text-decoration-none text-primary">
                  advertising@bestcars.com
                </a>
              </p>

              <p className="mb-3">
                <strong>Public Relations Team:</strong>{" "}
                <a href="mailto:pr@bestcars.com" className="text-decoration-none text-primary">
                  pr@bestcars.com
                </a>
              </p>

              <p className="mb-3">
                <strong>Office Phone:</strong>{" "}
                <a href="tel:+18001234567" className="text-decoration-none text-dark">
                  +1 (800) 123-4567
                </a>
              </p>

              <p className="mb-3">
                <strong>Become a Dealer:</strong>{" "}
                <a
                  href="https://www.bestcars.com/dealer-signup"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-success"
                >
                  www.bestcars.com/dealer-signup
                </a>
              </p>
            </div>

            {/* Image Section */}
            <div className="col-md-6 text-center">
              <img
                src={carsImg}
                alt="Contact Us"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
