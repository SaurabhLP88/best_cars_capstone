import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";
import GoogleMapComponent from "../../Sections/GoogleMapComponent/GoogleMapComponent";

import bannerBg from "../../../assets/images/contact-banner.jpg";

const Contact = () => {
  return (
    <>
      <Header />

      <Banner
        title="Contact Us"
        bgImage={bannerBg}
        bgPosition={146}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact Us" },
        ]}
      />
      
      {/* google map area start */}
      <div className="google-map">
        <GoogleMapComponent />
      </div>
      {/* google map area end */}

      {/* showcase section start */}
      <section className="showcase-area ptb-90">
        <div className="container">
          
          <div className="row">
              <div className="col-lg-6">
                <div className="contact-form">
                  <h4>Get in Touch</h4>
                  <p className="form-message"></p>
                  <form id="contact-form">
                      <input type="text" name="name" placeholder="Enter Your Name" />
                      <input type="email" name="email" placeholder="Enter Your Email" />
                      <input type="text" name="subject" placeholder="Your Subject" />
                      <textarea placeholder="Messege" name="message"></textarea>
                      <button type="submit" name="submit">Send Message</button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-address">
                  <h4>Address</h4>
                  <p>Connect with our team for expert assistance, dealership details, and personalized support through the channels below.</p>
                  <ul>
                    <li>
                      <div className="contact-address-icon">
                        <i className="icofont icofont-headphone-alt"></i>
                      </div>
                      <div className="contact-address-info">
                        <a href="callto:+8801712435941">+8801712435941</a>
                        <a href="callto:+881934180093">+881934180093</a>
                      </div>
                    </li>
                    <li>
                      <div className="contact-address-icon">
                        <i className="icofont icofont-envelope"></i>
                      </div>
                      <div className="contact-address-info">
                        <a href="mailto:admin@bestcarsdealer.com">admin@bestcarsdealer.com</a>
                      </div>
                    </li>
                    <li>
                      <div className="contact-address-icon">
                        <i className="icofont icofont-web"></i>
                      </div>
                      <div className="contact-address-info">
                        <a href="https://bestcarsdealer.netlify.app/" target="_blank" rel="noreferrer">
                          bestcarsdealer.netlify.app
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

        </div>
      </section>
      {/* showcase section end */}

      <Footer />

    </>

  );
};

export default Contact;
