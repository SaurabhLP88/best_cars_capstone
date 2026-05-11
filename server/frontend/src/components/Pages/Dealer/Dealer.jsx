import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Link,useParams,
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import Header from "../../Common/Header/Header";

import "../Dealers/Dealers.css";

import positive_icon from "../../../assets/icons/positive.png";
import neutral_icon from "../../../assets/icons/neutral.png";
import negative_icon from "../../../assets/icons/negative.png";
//import review_icon from "../../../assets/icons/reviewbutton.png";


const Dealer = ({ dealerId, onOpenReview }) => {
  
  const navigate = useNavigate();

  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  // const [postReview, setPostReview] = useState(<></>);
  
  // let params = useParams();
  // let id =params.id;
  // const id = dealerId;

  /*let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));  
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;

  const dealer_url = `/djangoapp/dealer/${id}`;
  const reviews_url = `/djangoapp/reviews/dealer/${id}`;
  const post_review = `/postreview/${id}`;  */

  /*const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews);
      } else {
        setUnreviewed(true);
      }
    }
  };*/

  

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  };

  useEffect(() => {

    if (!dealerId) return;

    /*if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={`/postreview/${dealerId}`}>
          <img src={review_icon} style={{width:'10%'}} alt='Post Review'/>
        </a>
      );
    }*/

    const get_dealer = async () => {
      try {
        const res = await fetch(`/djangoapp/dealer/${dealerId}`);

        if (!res.ok) return;

        const data = await res.json();

        if (data.status === 200) {
          setDealer(data.dealer[0]);
        }
      } catch (err) {
        console.error("Dealer fetch error:", err);
      }
    };

    const get_reviews = async () => {
      try {
        const res = await fetch(`/djangoapp/reviews/dealer/${dealerId}`);

        if (!res.ok) {
          setUnreviewed(true);
          return;
        }

        const data = await res.json();

        if (data.status === 200 && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setUnreviewed(true);
        }
      } catch (err) {
        console.error("Reviews fetch error:", err);
        setUnreviewed(true);
      }
    };
    
    setDealer({});
    setReviews([]);
    setUnreviewed(false);

    get_dealer();
    get_reviews();
    
  }, [dealerId]);


return(
  <>

    <div className="sec-title mb-4">
      <h2>{dealer.full_name} <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
      <p>{dealer.address}, {dealer.city}, {dealer.state}, - {dealer.zip}</p>
    </div>

    <div className="login-buttons flex-row justify-content-center">

      {/* Post Review */}
      <button
        type="button"
        className="secondary-btn"
        onClick={() => onOpenReview(dealerId)}
      >
        Post Review
      </button>

      {/* Search Cars */}
      <button
        type="button"
        className="primary-btn"
        onClick={() => navigate(`/searchcars/${dealerId}`)}
      >
        Search Cars
      </button>

    </div>

    <hr className="my-4"/>

    <div className="reviews-panel pb-3">
      {reviews.length === 0 && !unreviewed ? (
        <h4 className="text-center text-blue1 font-weight-bold">
          Loading Car Reviews...
        </h4>
      ) : unreviewed ? (
        <h4 className="text-center text-blue1 font-weight-bold">
          No car reviews yet!
        </h4>
      ) : (

        <>
        <div className="sec-title mb-0">
          <h4>Car Reviews <span class="badge badge-pill badge-info">{reviews.length}</span></h4>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id || index}>

              {/*<div className="review_panel" key={review.id || index}>
                <img
                  src={senti_icon(review.sentiment)}
                  className="emotion_icon"
                  alt="Sentiment"
                />
                <div className="review">{review.review}</div>
                <div className="reviewer">
                  {review.name} {review.car_make} {review.car_model} {review.car_year}
                </div>
              </div>*/}
              <div className='p-3'>
                <div className="single-post p-0">
                  <div className="post-thumbnail text-center">
                    <img
                      src={senti_icon(review.sentiment)}
                      alt={review.name}
                    />
                  </div>

                  <div className="post-details px-3 py-3">
                    <div className="post-author">
                      <span>
                        <i className="icofont icofont-speech-comments"></i>{" "}
                        {review.car_make} {review.car_model}
                      </span>
                      <span>
                        <i className="icofont icofont-calendar"></i>{" "}
                        {review.car_year}
                      </span>
                    </div>

                    <h4 className="post-title my-1">{review.review}</h4>
                    <p className="m-0 text-right">- {review.name}</p>
                  </div>
                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>

        </>

      )}
    </div>

  </>
);
};

export default Dealer;
