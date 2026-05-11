import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ title, breadcrumbs = [], bgImage, bgPosition }) => {
  return (
    <section 
      className="hero-area breadcrumb-area"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: `center ${bgPosition}%`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-area-content">
              <h1>{title}</h1>

              <ul>
                {breadcrumbs.map((item, index) => (
                  <li key={index}>
                    {item.path ? (
                      <Link to={item.path}>{item.label}</Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;