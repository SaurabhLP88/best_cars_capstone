import React from "react";
import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";

import bannerBg from "../../../assets/images/about-banner.jpg";
import visionImg from "../../../assets/images/car-vision.jpg";
import focusImg from "../../../assets/images/car-customer.jpg";
import trustImg from "../../../assets/images/car-trust.jpg";

const About = () => {
  return (
    <>
      <Header />

      <Banner
        title="About Us"
        bgImage={bannerBg}
        bgPosition={848}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
      />

      {/* showcase section start */}
      <section className="showcase-area ptb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                <div className="sec-title mb-5">
                  <p>Discover how we are transforming the way people explore, compare, and connect with trusted car dealerships. Our platform is built to deliver transparency, convenience, and confidence in every step of your journey.</p>
                </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center flexbox-center">
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <h3 className="font-weight-bold text-blue1">Our Mission</h3>
                <h4>Driving Innovation in Car Dealership Experience</h4>
                <p>We are committed to redefining the automotive experience by connecting customers with reliable dealerships through a seamless digital platform. Our goal is to simplify decision-making with accurate information, real customer reviews, and a user-friendly interface. Whether you are buying your first car or upgrading to your dream vehicle, we ensure a smooth and transparent journey from start to finish. </p>                
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-showcase-image">
                <img src={visionImg} alt="showcase" />
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="row align-items-center justify-content-center flexbox-center">
            <div className="col-lg-6">
              <div className="single-showcase-image">
                <img src={focusImg} alt="showcase" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <h3 className="font-weight-bold text-blue1">Customer Focus</h3>
                <h4>Customer-Centric Approach with Real Insights</h4>
                <p>Our platform empowers users with authentic reviews, detailed dealership insights, and advanced search capabilities. We believe that informed customers make better decisions, which is why we focus on providing honest feedback and valuable data. From browsing dealerships to comparing options, everything is designed to save your time and effort.</p>                
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="row align-items-center justify-content-center flexbox-center">
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <h3 className="font-weight-bold text-blue1">Trust & Growth</h3>
                <h4>Building Trust Through Technology & Transparency</h4>
                <p>Trust is at the core of everything we do. We continuously enhance our platform using modern technologies to ensure reliability, performance, and security. By bridging the gap between customers and dealerships, we are creating a smarter ecosystem that benefits both buyers and sellers while fostering long-term relationships.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-showcase-image">
                <img src={trustImg} alt="showcase" />
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* showcase section end */}

      <div style={{height: '1in'}}></div>

      <Footer />

    </>
  );
};

export default About;
