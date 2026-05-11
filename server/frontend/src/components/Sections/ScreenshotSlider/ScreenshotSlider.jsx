import React from "react";
import Slider from "react-slick";

import screenshot1 from "../../../assets/images/screenshot/screenshot1.jpg";
import screenshot2 from "../../../assets/images/screenshot/screenshot2.jpg";
import screenshot3 from "../../../assets/images/screenshot/screenshot3.jpg";
import screenshot4 from "../../../assets/images/screenshot/screenshot4.jpg";
import screenshot5 from "../../../assets/images/screenshot/screenshot5.jpg";

const ScreenshotSlider = () => {

  const importAll = (r) => r.keys().map(r);
  const logos = importAll(
    require.context("../../../assets/images/car-logos", false, /\.(png|jpe?g|svg)$/)
  );

  const settings = {
    autoplay: true,
    dots: false,
    autoplaySpeed: 1000,
    slidesToShow: 7,
    centerMode: true,
    centerPadding: "0px",
    arrows: false, // 👈 replaces prevArrow/nextArrow
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: "33.3%",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="screenshot-wrap">
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index} className="single-logo">
              <img src={logo} alt={`logo-${index}`} />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default ScreenshotSlider;