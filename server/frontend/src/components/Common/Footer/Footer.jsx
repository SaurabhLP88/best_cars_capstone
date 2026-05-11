import React, { useEffect, useState } from "react";

import Copyright from "./Copyright";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* footer section start */}
        <footer className="footer" id="contact">
          <div className="container">            
            <div className="row">
              <div className="col-lg-12">
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Your email address here" />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-area">

                  <ul>
                    <li className="text-white">Connect with me </li>
                    <li>
                      <a href="https://www.facebook.com/saurabhlp" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://x.com/saurabhlp111" target="_blank" rel="noreferrer">
                        <i className="fab fa-x-twitter"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://www.instagram.com/saurabh_lakhan/" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://www.linkedin.com/in/salakhanpal/" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://github.com/SaurabhLP88/" target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://stackoverflow.com/users/1425785/saurabhlp" target="_blank" rel="noreferrer">
                        <i className="fab fa-stack-overflow"></i>
                      </a>
                    </li>
                  </ul>

                  <Copyright />

                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* footer section end */}

        {showButton && (
          <a href="#" className="scrollToTop" onClick={scrollToTop}>
            <i className="icofont icofont-arrow-up"></i>
          </a>
        )}
      </>
  );
};

export default Footer;