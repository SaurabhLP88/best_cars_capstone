import React, { useState, useRef } from "react";
// import OwlCarousel from "react-owl-carousel3";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Testimonial.css";

import author1 from "../../../assets/images/author/author1.jpg";
import author2 from "../../../assets/images/author/author2.jpg";

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);

  const testimonials = [
    {
      img: author1,
      name: "Mary Balogh",
      text: "BestCars made my car search incredibly easy. I could compare dealerships, read real reviews, and confidently choose the right place. The transparency really helped me avoid bad experiences. Highly recommend for anyone looking to buy a car without the hassle!",
      rating: 5,
    },
    {
      img: author2,
      name: "John Doe",
      text: "I loved how simple and clean the platform is. Finding nearby dealerships and checking customer feedback saved me a lot of time. It felt much more reliable than random online searches. BestCars is a game-changer for car buyers like me!",
      rating: 4,
    },
    {
      img: author2,
      name: "Alex Smith",
      text: "The reviews and ratings on BestCars helped me shortlist the best dealer in my city. The experience was smooth, and I felt confident throughout the process. I ended up with a great deal and a fantastic car. BestCars is now my go-to for any future car purchases!",
      rating: 4.5,
    },
  ];

  /*const options = {
    loop: true,
    dots: true,
    items: 1,
    autoplay: false,
    mouseDrag: false,
    onChanged: (event) => {
      setCurrent(event.item.index - 1); // adjust index
    },
  };*/

  return (
    <div className="row">
      <div className="col-lg-8 offset-lg-2">

        {/* MAIN SLIDER 
        <OwlCarousel className="testimonial-wrap" {...options}></OwlCarousel>*/}
        <Swiper
          className="testimonial-wrap"
          slidesPerView={1}
          loop={true}
          modules={[Pagination]} 
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="single-testimonial-box">
                <div className="author-img">
                  <img src={item.img} alt="author" />
                </div>
                <h5>{item.name}</h5>
                <p>{item.text}</p>

                <div className="author-rating">
                  {[...Array(5)].map((_, i) => {
                    if (i < Math.floor(item.rating)) {
                      return <i key={i} className="fas fa-star text-warning"></i>; // full
                    } else if (i < item.rating) {
                      return <i key={i} className="fas fa-star-half-alt text-warning"></i>; // half
                    } else {
                      return <i key={i} className="far fa-star text-warning"></i>; // empty
                    }
                  })}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* THUMBS */}
        <div className="testimonial-thumb">

          <div className="thumb-prev" onClick={() => swiperRef.current.slidePrev()}>
            <div className="author-img">
              <img
                src={testimonials[(current - 1 + testimonials.length) % testimonials.length].img}
                alt="prev"
              />
            </div>
          </div>
          <div className="thumb-next" onClick={() => swiperRef.current.slideNext()}>
            <div className="author-img">
              <img
                src={testimonials[(current + 1) % testimonials.length].img}
                alt="next"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Testimonial;