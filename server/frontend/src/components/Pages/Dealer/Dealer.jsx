import React, { useState,useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Header from "../../Common/Header/Header";

import "../Dealers/Dealers.css";
import positive_icon from "../../../assets/icons/positive.png";
import neutral_icon from "../../../assets/icons/neutral.png";
import negative_icon from "../../../assets/icons/negative.png";
import review_icon from "../../../assets/icons/reviewbutton.png";


const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);
  
  let params = useParams();
  let id =params.id;

  /*let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));  
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;*/

  const dealer_url = `/djangoapp/dealer/${id}`;
  const reviews_url = `/djangoapp/reviews/dealer/${id}`;
  const post_review = `/postreview/${id}`;
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer);
      setDealer(dealerobjs[0]);
    }
  };

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

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url);

      if (!res.ok) {
        console.error("Reviews API failed:", res.status);
        setUnreviewed(true);
        return;
      }

      const retobj = await res.json();

      if (retobj.status === 200 && Array.isArray(retobj.reviews)) {
        if (retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      } else {
        setUnreviewed(true);
      }
    } catch (err) {
      console.error("Reviews fetch error:", err);
      setUnreviewed(true);
    }
  };

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if(sessionStorage.getItem("username")) {
      setPostReview(<a href={post_review}><img src={review_icon} style={{width:'10%',marginLeft:'10px',marginTop:'10px'}} alt='Post Review'/></a>);

      
    }
  },[]);  


return(
  <div style={{margin:"0px"}}>
      <Header/>
      <div style={{marginTop:"10px"}}>
        <h1 style={{color:"grey"}}>{dealer.full_name}{postReview}</h1>
        <h4  style={{color:"grey"}}>{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']} </h4>
        <Link to={`/searchcars/${id}`}>Search Cars</Link>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <p>Loading Reviews...</p>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((review, index) => (
            <div className="review_panel" key={review.id || index}>
              <img
                src={senti_icon(review.sentiment)}
                className="emotion_icon"
                alt="Sentiment"
              />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
  </div>
);
};

export default Dealer;
