import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import ScreenshotSlider from "../../Sections/ScreenshotSlider/ScreenshotSlider";
import Testimonial from "../../Sections/Testimonial/Testimonial";
import VideoBackground from "../../Sections/VideoBackground/VideoBackground";

//import bgVideo from "../../../assets/videos/night_driving_01.mp4";


import chooseCarBg from "../../../assets/images/choose-car-bg-01.jpg";
import watchDemoBg from "../../../assets/images/watch-demo-01.jpg";
import latestCarsBg from "../../../assets/images/latest-cars-01.jpg";
import carsStayBg from "../../../assets/images/cars-stay-01.jpg";
import testDriveBg from "../../../assets/images/test-drive-01.jpg";

/*import homeImg from "../../../assets/images/car_dealership.jpg";
import screenshot1 from "../../../assets/images/screenshot/screenshot1.jpg";
import screenshot2 from "../../../assets/images/screenshot/screenshot2.jpg";
import screenshot3 from "../../../assets/images/screenshot/screenshot3.jpg";
import screenshot4 from "../../../assets/images/screenshot/screenshot4.jpg";
import screenshot5 from "../../../assets/images/screenshot/screenshot5.jpg";
import author1 from "../../../assets/images/author/author1.jpg";
import author2 from "../../../assets/images/author/author2.jpg";*/

import audiQ5 from "../../../assets/images/cars/audi-q5-01.png";
import kiaCadenza from "../../../assets/images/cars/kia-cadenza-01.png";
import kiaNiro from "../../../assets/images/cars/kia-niro-01.png";
import kiaStinger from "../../../assets/images/cars/kia-stinger-02.png";
import nissanPatrol from "../../../assets/images/cars/nissan-patrol-01.png";
  
import featureImg from "../../../assets/images/choose-car-01.png";
import showcaseImg from "../../../assets/images/trust-dealership-01.jpg";
import showcase2Img from "../../../assets/images/real-reviews-01.jpg";

import team1 from "../../../assets/images/team/team1.jpg";
import team2 from "../../../assets/images/team/team2.jpg";
import team3 from "../../../assets/images/team/team3.jpg";
import team4 from "../../../assets/images/team/team4.jpg";
import blog1 from "../../../assets/images/blog/blog1.jpg";
import blog2 from "../../../assets/images/blog/blog2.jpg";
import blog3 from "../../../assets/images/blog/blog3.jpg";

const slides = [audiQ5, kiaCadenza, kiaNiro, kiaStinger, nissanPatrol];

const Home = () => {

  const sectionRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll(".counter");

    const runCounter = () => {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const update = () => {
          const increment = Math.ceil(target / 60);

          count += increment;

          if (count < target) {
            counter.innerText = count;
            requestAnimationFrame(update);
          } else {
            counter.innerText = target + "+";
          }
        };

        update();
      });
    };

    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

  }, []);

  const videoUrl = "https://www.youtube.com/watch?v=RZXnugbhw_4";

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <Header />

      {/* hero area start */}
      <section className="hero-area" id="home">
        {/*<VideoBackground type="file" src={bgVideo} />*/}
        <div className="hero-area-overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="hero-area-content">
                  <h1>Welcome to BestCars</h1>
                  <p>Explore verified car dealerships, compare options, and read real customer reviews—all in one place. BestCars helps you make confident decisions with transparency, convenience, and a seamless browsing experience. </p>
                  <p>
                    <Link
                      to="/dealers"
                      className="appao-btn3"
                    >
                      View Dealerships
                    </Link>
                  </p>

                </div>
              </div>
              <div className="col-lg-5">
                  <div className="hand-mockup text-lg-left text-center">
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1}
                      loop={true}
                      modules={[Autoplay, Pagination]} pagination={{ clickable: true }}
                      autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                    >
                      {slides.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img src={img} alt={`Slide ${i}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero area end */}

      {/* about section start */}
      <section className="about-area ptb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title">
                <h2>About BestCars <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                <p>BestCars is a modern platform designed to help users discover trusted car dealerships, compare options, and make informed decisions with confidence.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="single-about-box">
                <i className="fas fa-car"></i>
                <h4>Smart Dealership Discovery</h4>
                <p>Easily explore nearby dealerships, browse available options, and find the right place to buy your next car—all in one convenient platform.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-about-box active">
                <i className="fas fa-user-check"></i>
                <h4>Real Customer Reviews</h4>
                <p>Make confident decisions with genuine user reviews and ratings. BestCars ensures transparency by helping you understand real customer experiences before you choose a dealer.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-about-box">
                <i className="fas fa-tachometer-alt"></i>
                <h4>Seamless User Experience</h4>
                <p>Enjoy a fast, intuitive, and user-friendly interface designed to simplify your car search journey—from discovery to final decision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about section end */}

      {/* feature section start */}
      <Parallax
        bgImage={chooseCarBg}
        strength={300}
        blur={{ min: -3, max: 3 }}
        bgImageAlt="Why Choose BestCars"
        contentClassName="parallax-content"
      >
        <section className="feature-area light-area ptb-90" id="feature">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                  <div className="sec-title">
                  <h2>Why Choose BestCars <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                  <p>We make car dealership discovery smarter, faster, and more transparent—helping you make confident decisions every time. </p>
                </div>
              </div>
            </div>
            <div className="row flexbox-center">
              <div className="col-lg-4">
                <div className="single-feature-box text-lg-right text-center">
                  <ul>
                    <li>
                      <div className="feature-box-info">
                        <h4>Verified Dealerships</h4>
                        <p>Browse trusted and verified dealerships with accurate information to ensure a reliable car buying experience.</p>
                      </div>
                      <div className="feature-box-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-info">
                        <h4>Smart Search & Filters</h4>
                        <p>Quickly find dealerships based on location, preferences, and requirements with our intuitive search system.</p>
                      </div>
                      <div className="feature-box-icon">
                        <i className="fas fa-filter"></i>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-info">
                        <h4>Detailed Dealer Insights</h4>
                        <p>Get complete information about dealers including services, location, and customer experiences—all in one place.</p>
                      </div>
                      <div className="feature-box-icon">
                        <i className="fas fa-info-circle"></i>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-info">
                        <h4>Real-Time Updates</h4>
                        <p>Stay updated with the latest dealership listings and user reviews for better and faster decision-making.</p>
                      </div>
                      <div className="feature-box-icon">
                        <i className="fas fa-sync-alt"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-feature-box text-center">
                  <img src={featureImg} alt="feature" />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-feature-box text-lg-left text-center">
                  <ul>
                    <li>
                      <div className="feature-box-icon">
                        <i className="fas fa-comments"></i>
                      </div>
                      <div className="feature-box-info">
                        <h4>Authentic Customer Reviews</h4>
                        <p>Read genuine feedback from real users to understand dealership quality before making a choice.</p>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-icon">
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                      <div className="feature-box-info">
                        <h4>Fast & Smooth Experience</h4>
                        <p>Enjoy a clean, responsive interface designed for speed and ease of use across all devices.</p>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-icon">
                        <i className="fas fa-cogs"></i>
                      </div>
                      <div className="feature-box-info">
                        <h4>Modern Technology</h4>
                        <p>Built with modern web technologies to ensure performance, scalability, and a seamless user experience.</p>
                      </div>
                    </li>
                    <li>
                      <div className="feature-box-icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="feature-box-info">
                        <h4>User-Focused Platform</h4>
                        <p>Everything is designed with users in mind—from easy navigation to helpful insights that simplify your journey. </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
      {/* feature section end */}

      {/* showcase section start */}
      <section className="showcase-area ptb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title mb-5 pb-5">
                <h2>Our Services <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                <p>We provide a complete platform to help you discover, compare, and choose the right car dealerships with confidence and ease.</p>
              </div>
            </div>
          </div>

          <div className="row align-items-start flexbox-center mb-5 pb-5">
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <h4>Find Trusted Dealerships</h4>
                <p>Explore a wide network of verified car dealerships across multiple cities. Easily browse options, compare dealers, and find the right place to start your car buying journey without confusion. With detailed dealer profiles, location insights, and real customer feedback, BestCars helps you make informed decisions with confidence. Save time, avoid unreliable options, and connect with dealerships you can trust. Our platform is designed to simplify your search process and give you complete control over your choices.</p>
                <p className="m-0"><a href="/dealers" className="appao-btn2">Explore Dealers</a></p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <img src={showcaseImg} alt="showcase" />
              </div>
            </div>
          </div>
          <div className="row align-items-start flexbox-center mb-5">
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <img src={showcase2Img} alt="showcase" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-showcase-box">
                <h4>Read & Share Real Reviews</h4>
                <p>Make informed decisions with authentic customer reviews and ratings. Share your own experiences and help others choose the best dealerships based on real feedback. Our platform is built to provide transparency, confidence, and convenience in every step of your car buying journey. By contributing your reviews, you become part of a growing community that values honesty and better decision-making. Discover what others are saying and make choices you can rely on.</p>
                <p className="m-0"><a href="/reviews" className="appao-btn2">View Reviews</a></p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* showcase section end */}

      {/* video section start */}
      <Parallax
        bgImage={watchDemoBg}
        strength={300}
      >
        <section className="video-area ptb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="video-popup">
                  <button
                    className="popup-youtube"
                    onClick={() => setShowVideo(true)}
                  >
                    <i className="icofont icofont-ui-play"></i>
                  </button>
                  <h1>Watch Video Demo</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
      {/* video section end */}

      {/* screenshots section start */}
      <section className="screenshots-area ptb-90" id="screenshot">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                <div className="sec-title">
                <h2>Our Partners <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ScreenshotSlider />
            </div>
          </div>
        </div>
      </section>
      {/* screenshots section end */}

      {/* pricing section start */}
      <Parallax
        bgImage={latestCarsBg}
        strength={300}
      >
        <section className="pricing-area ptb-90" id="pricing">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                  <div className="sec-title">
                  <h2>Latest Picks <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                  <p>Discover Ideal Cars Collection </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="single-pricing-box">
                  <div className="pricing-top">
                    <h4 className="mt-0 mb-3">Honda Amaze 4G</h4>
                    <figure className="m-0">
                      <img src={blog1} alt="car" />
                    </figure>
                  </div>
                  <div className="price">
                    <h1><span>₹</span>7.5</h1>
                    <p>*(Ex-showroom price)</p>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li className="d-flex justify-content-between">
                        <span>Powertrain</span>
                        <span className="font-weight-bold text-blue1">Petrol <i class="fa-solid fa-gas-pump"></i></span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Transmission</span>
                        <span className="font-weight-bold text-blue1">Manual <i class="fa-solid fa-code-branch"></i></span>
                      </li>
                    </ul>
                    <a className="appao-btn" href="#">Explore More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-pricing-box">
                  <div className="pricing-top">
                    <h4>Pro</h4>
                    <p>Suitable for Freelancer</p>
                  </div>
                  <div className="price">
                    <h1><span>$</span>199</h1>
                    <p>Basic</p>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li>Email Marketing</li>
                      <li>Email Builder</li>
                      <li>Client Testing</li>
                      <li>Multiple Email Support</li>
                      <li>Email Read Receipent</li>
                      <li>2 User Free</li>
                    </ul>
                    <a className="appao-btn" href="#">Order Now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-pricing-box">
                  <div className="pricing-top">
                    <h4>Ultimate</h4>
                    <p>Suitable for Freelancer</p>
                  </div>
                  <div className="price">
                    <h1><span>$</span>299</h1>
                    <p>Basic</p>
                  </div>
                  <div className="price-details">
                    <ul>
                      <li>Email Marketing</li>
                      <li>Email Builder</li>
                      <li>Client Testing</li>
                      <li>Multiple Email Support</li>
                      <li>Email Read Receipent</li>
                      <li>2 User Free</li>
                    </ul>
                    <a className="appao-btn" href="#">Order Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
      {/* pricing section end */}

      {/* testimonial section start */}
      <section className="testimonial-area ptb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title">
                <h2>What Our Customers Say <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                <p>Hear from our users who found trusted dealerships, honest reviews, and a seamless car-buying experience through BestCars. </p>
              </div>
            </div>
          </div>
          
          <Testimonial />

              {/*
              <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="testimonial-wrap">
                <div className="single-testimonial-box">
                  <div className="author-img">
                    <img src={author1} alt="author" />
                  </div>
                  <h5>Mary Balogh</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in </p>
                  <div className="author-rating">
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                  </div>
                </div>
                <div className="single-testimonial-box">
                  <div className="author-img">
                    <img src={author2} alt="author" />
                  </div>
                  <h5>Mary Balogh</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in </p>
                  <div className="author-rating">
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                  </div>
                </div>
                <div className="single-testimonial-box">
                  <div className="author-img">
                    <img src={author2} alt="author" />
                  </div>
                  <h5>Mary Balogh</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in </p>
                  <div className="author-rating">
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                    <i className="icofont icofont-star"></i>
                  </div>
                </div>
              </div>
              <div className="testimonial-thumb">
                <div className="thumb-prev">
                  <div className="author-img">
                    <img src={author2} alt="author" />
                  </div>
                </div>
                <div className="thumb-next">
                  <div className="author-img">
                    <img src={author2} alt="author" />
                  </div>
                </div>
                </div>
          </div>
              */}
            
        </div>
      </section>
      {/* testimonial section end */}

      {/* counter section start */}
      <Parallax
        bgImage={carsStayBg}
        strength={300}
      >
        <section ref={sectionRef} className="counter-area ptb-90">
          <div className="container">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 mx-n2">
              <div className="col px-2">
                <div className="single-counter-box">
                  <i className="icofont icofont-heart-alt"></i>
                  <h1><span className="counter" data-target="25">0</span></h1>
                  <p>Global brands</p>
                </div>
              </div>
              <div className="col px-2">
                <div className="single-counter-box">
                  <i className="icofont icofont-protect"></i>
                  <h1><span className="counter" data-target="500">0</span></h1>
                  <p>Employees</p>
                </div>
              </div>
              <div className="col px-2">
                <div className="single-counter-box">
                  <i className="icofont icofont-download-alt"></i>
                  <h1><span className="counter" data-target="50">0</span></h1>
                  <p>Our Facilities</p>
                </div>
              </div>
              <div className="col px-2">
                <div className="single-counter-box">
                  <i className="icofont icofont-trophy"></i>
                  <h1><span className="counter" data-target="120">0</span></h1>
                  <p>Cities</p>
                </div>
              </div>
              <div className="col px-2">
                <div className="single-counter-box">
                  <i className="icofont icofont-trophy"></i>
                  <h1><span className="counter" data-target="28">0</span></h1>
                  <p>States</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
      {/* counter section end */}

      {/* team section start */}
      <section className="team-area ptb-90" id="team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title">
                <h2>Meet the People Behind BestCars <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                <p>A passionate team focused on building a smarter, more transparent car dealership experience through technology, design, and data.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-team-member">
                <div className="team-member-img">
                  <img src={team1} alt="team" />
                  <div className="team-member-icon">
                    <div className="display-table">
                      <div className="display-tablecell">
                        <a href="#"><i className="icofont icofont-social-facebook"></i></a>
                        <a href="#"><i className="icofont icofont-social-twitter"></i></a>
                        <a href="#"><i className="icofont icofont-brand-linkedin"></i></a>
                        <a href="#"><i className="icofont icofont-social-pinterest"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <a href="#"><h4>John Deo</h4></a>
                  <p>Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-team-member">
                <div className="team-member-img">
                  <img src={team2} alt="team" />
                  <div className="team-member-icon">
                    <div className="display-table">
                      <div className="display-tablecell">
                        <a href="#"><i className="icofont icofont-social-facebook"></i></a>
                        <a href="#"><i className="icofont icofont-social-twitter"></i></a>
                        <a href="#"><i className="icofont icofont-brand-linkedin"></i></a>
                        <a href="#"><i className="icofont icofont-social-pinterest"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <a href="#"><h4>Sharon Garcia</h4></a>
                  <p>Sales Manager</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-team-member">
                <div className="team-member-img">
                  <img src={team3} alt="team" />
                  <div className="team-member-icon">
                    <div className="display-table">
                      <div className="display-tablecell">
                        <a href="#"><i className="icofont icofont-social-facebook"></i></a>
                        <a href="#"><i className="icofont icofont-social-twitter"></i></a>
                        <a href="#"><i className="icofont icofont-brand-linkedin"></i></a>
                        <a href="#"><i className="icofont icofont-social-pinterest"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <a href="#"><h4>Elijah Henderson</h4></a>
                  <p>Product Manager</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-team-member">
                <div className="team-member-img">
                  <img src={team4} alt="team" />
                  <div className="team-member-icon">
                    <div className="display-table">
                      <div className="display-tablecell">
                        <a href="#"><i className="icofont icofont-social-facebook"></i></a>
                        <a href="#"><i className="icofont icofont-social-twitter"></i></a>
                        <a href="#"><i className="icofont icofont-brand-linkedin"></i></a>
                        <a href="#"><i className="icofont icofont-social-pinterest"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <a href="#"><h4>Sharon Garcia</h4></a>
                  <p>Marketing & Growth Strategist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* team section end */}

      {/* download section start */}
      <Parallax
        bgImage={testDriveBg}
        strength={300}
        bgClassName="test-parallax-bg"
      >
        <section className="download-area ptb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sec-title">
                  <h2>Connect with us <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                  <p>Have questions or need assistance? Connect with us for support, dealership inquiries, or feedback about your experience with BestCars. We’re here to make your journey simple and reliable.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <ul>
                  <li>
                    <a href="#" className="download-btn flexbox-center">
                      <div className="download-btn-icon">
                        <i className="icofont icofont-phone"></i>
                      </div>
                      <div className="download-btn-text">
                        <p>Enquire</p>
                        <h4>Now</h4>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="download-btn flexbox-center">
                      <div className="download-btn-icon">
                        <i className="icofont icofont-car"></i>
                      </div>
                      <div className="download-btn-text">
                        <p>Book</p>
                        <h4>A Test Drive</h4>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="download-btn flexbox-center">
                      <div className="download-btn-icon">
                        <i className="icofont icofont-location-arrow"></i>
                      </div>
                      <div className="download-btn-text">
                        <p>Find</p>
                        <h4>Our Stores</h4>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
      {/* download section end */}

      {/* blog section start */}
      <section className="blog-area ptb-90" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                <div className="sec-title">
                <h2>Our Latest Blog<span className="sec-title-border"><span></span><span></span><span></span></span></h2>
                <p>Stay updated with the latest news and insights from the world of automobiles. Our blog is your gateway to a world of automotive knowledge and inspiration.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="single-post">
                <div className="post-thumbnail">
                  <a href="blog.html"><img src={blog1} alt="blog" /></a>
                </div>
                <div className="post-details">
                  <div className="post-author">
                    <a href="blog.html"><i className="icofont icofont-user"></i>John</a>
                    <a href="blog.html"><i className="icofont icofont-speech-comments"></i>Comments</a>
                    <a href="blog.html"><i className="icofont icofont-calendar"></i>21 Feb 2018</a>
                  </div>
                  <h4 className="post-title"><a href="blog.html">Lorem ipsum dolor sit</a></h4>
                  <p>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="single-post">
                <div className="post-thumbnail">
                  <a href="blog.html"><img src={blog2} alt="blog" /></a>
                </div>
                <div className="post-details">
                  <div className="post-author">
                    <a href="blog.html"><i className="icofont icofont-user"></i>John</a>
                    <a href="blog.html"><i className="icofont icofont-speech-comments"></i>Comments</a>
                    <a href="blog.html"><i className="icofont icofont-calendar"></i>21 Feb 2018</a>
                  </div>
                  <h4 className="post-title"><a href="blog.html">Lorem ipsum dolor sit</a></h4>
                  <p>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-md-none d-lg-block">
                <div className="single-post">
                <div className="post-thumbnail">
                  <a href="blog.html"><img src={blog3} alt="blog" /></a>
                </div>
                <div className="post-details">
                  <div className="post-author">
                    <a href="blog.html"><i className="icofont icofont-user"></i>John</a>
                    <a href="blog.html"><i className="icofont icofont-speech-comments"></i>Comments</a>
                    <a href="blog.html"><i className="icofont icofont-calendar"></i>21 Feb 2018</a>
                  </div>
                  <h4 className="post-title"><a href="blog.html">Lorem ipsum dolor sit</a></h4>
                  <p>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog section end */}

      <Footer />

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              className="video-close"
              onClick={() => setShowVideo(false)}
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="665"
              src={getEmbedUrl(videoUrl)}
              title="Video Demo"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

          </div>
        </div>
      )}

    </>
  );
};

export default Home;
