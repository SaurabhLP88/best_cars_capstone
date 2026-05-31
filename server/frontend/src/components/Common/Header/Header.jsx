import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../../assets/images/logos/bestcars_light_01.png";

const menuItems = [
  /*{
    label: "Home",
    path: "/",
  },*/
  {
    label: "New Car",
    path: "/",
  },
  {
    label: "Pre-owned",
    path: "/",
    submenu: [
      { label: "Buy certified car", path: "/buyCertified" },
      { label: "Buy luxury car", path: "/buyLuxury " },
      { label: "Sell certified car", path: "/sellCertified" },
    ],
  },
  {
    label: "Dealerships",
    path: "/dealers",
  },
  {
    label: "Services",
    path: "/",
    submenu: [
      { label: "Book a service", path: "/book" },
    ],
  },
  {
    label: "About",
    path: "/",
    submenu: [
      { label: "About Us", path: "/about" },
      { label: "Blogs", path: "/blogs" },
    ],
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
];

const Header = () => {
  
  const [isSticky, setIsSticky] = useState(false);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const logout = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/djangoapp/logout`, { method: "GET" });
    const json = await res.json();

    if (json) {
      sessionStorage.removeItem("username");
      setUsername(null);
      alert("Logged out successfully");
      navigate("/");
    }
  };

  // Sync username if sessionStorage changes (page refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // you can adjust

    setUsername(sessionStorage.getItem("username"));

    const handleScroll = () => {
      const offset = 100;
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>

      {/* Page loader */}
	    {loading && <div id="preloader" className={!loading ? "fade-out" : ""}></div>}

      {/* header section start */}
      <header className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="container">

          <div className="header-top">
            <div className="row flexbox-center">
              <div className="col-lg-2 col-md-3 col-6">
                <p className="m-0 text-white">Call Us: <a href="tel:123456789" className="text-light font-weight-bold">+91 123456789</a></p>
              </div>
              <div className="col-lg-10 col-md-9 col-6">
                <div className="mainmenu">
                    <ul id="auth-menu">
                        {username ? (
                          <>
                            <li className="ml-4 font-weight-bold"><span className="text-light">Welcome, {username}</span></li>
                            <li className="ml-3"><Link className="appao-btn" to="/" onClick={logout}>Logout</Link></li>
                          </>
                        ) : (
                          <>
                            <li className="ml-4"><Link className="appao-btn" to="/login">Login</Link></li>
                            <li className="ml-2"><Link className="appao-btn" to="/register">Register</Link></li>
                          </>
                        )}
                        
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <div className="row flexbox-center">
              <div className="col-lg-2 col-md-3 col-6">
                <div className="logo">
                  <a href="/"><img src={logoImg} alt="logo" /></a>
                </div>
              </div>
              <div className="col-lg-10 col-md-9 col-6">
                <div className="responsive-menu"></div>
                <div className="mainmenu">
                    <ul id="primary-menu">
                        {menuItems.map((item, index) => (
                          <li key={index} className={item.submenu ? "has-submenu" : ""}>
                            
                            <Link className="nav-link" to={item.path}>
                              {item.label} {item.submenu && <i className="icofont icofont-simple-down"></i>}
                            </Link>
                            {item.submenu && (
                              <ul className="submenu">
                                {item.submenu.map((sub, subIndex) => (
                                  <li key={subIndex}>
                                    <Link to={sub.path}><i className="icofont icofont-simple-right mr-1"></i> {sub.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}

                          </li>
                        ))}
                        
                    </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* header section end */}
      
    </>
  );
};

export default Header;
