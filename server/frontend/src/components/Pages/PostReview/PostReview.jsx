import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from "../../Common/Header/Header";

import "../Dealers/Dealers.css";

const PostReview = ({dealerId}) => {
  const [dealer, setDealer] = useState({});
  const [dealerLoading, setDealerLoading] = useState(true);
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  /*let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/insert_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;*/

  //let root_url = "http://localhost:3030/";
  // let params = useParams();
  // let id =params.id;

  const id = dealerId;
  //let dealer_url = `/djangoapp/dealer/${id}`;
  // let review_url = `/djangoapp/add_review`;
  //let carmodels_url = `/djangoapp/cars/${id}`;

  const currentYear = new Date().getFullYear();
  const years = [];

  const API = process.env.REACT_APP_API_URL;

  for (let y = currentYear; y >= 2015; y--) {
    years.push(y);
  }

  useEffect(() => {

    setDealer({});
    setReview("");
    setModel("");
    setYear("");
    setDate("");
    setCarmodels([]);

    const get_dealer = async () => {
      try {
        setDealerLoading(true);
        const res = await fetch(`${API}/djangoapp/dealer/${dealerId}`);
        if (!res.ok) {
          setDealerLoading(false);
          return;
        }
        const data = await res.json();

        if (data.status === 200 && data.dealer.length > 0) {
          setDealer(data.dealer[0]);
        }
      } catch (err) {
        console.error("Error loading dealer:", err);
      } finally {
        setDealerLoading(false);
      }
    };

    const get_cars = async () => {
      try {
        const res = await fetch(`${API}/djangoapp/cars/${dealerId}`);
        const cars = await res.json();

        const uniqueCars = Array.from(
          new Map(
            cars.map(car => [`${car.make}-${car.model}`, car])
          ).values()
        );

        setCarmodels(uniqueCars);
      } catch (err) {
        console.error("Error loading cars:", err);
      }
    };

    if (dealerId) {
      setDealerLoading(true);
      get_dealer();
      get_cars();
    }

  }, [dealerId, API]);

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory");
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": Number(year),
    });

    console.log(jsoninput);
    const res = await fetch(`${API}/djangoapp/add_review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsoninput,
    });

    if (res.ok) {
      // window.location.href = window.location.origin + "/dealer/" + id;
      alert("Review submitted!");
    } else {
      alert("Failed to submit review");
    }

  };    

  const handleReset = () => {
    setReview("");
    setModel("");
    setYear("");
    setDate("");
  };


  return (
      <div className='post-review-contain'>

        <div className="sec-title mb-3 pt-3">
          <h2>
            {dealerLoading ? (
              <span
                className="placeholder-glow"
              >
                <span className="placeholder rounded-pill"></span>
              </span>
            ) : (
              dealer.full_name
            )}

            <span className="sec-title-border">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </h2>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="reviewMsg" className='mb-0'>Your Review</label>
              <textarea className="form-control" name='reviewMsg' id='reviewMsg' cols='50' rows='7' value={review} onChange={(e) => setReview(e.target.value)} placeholder='Enter your review'></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="carsMakeModel" className='mb-0'>Car Make and Model</label>
              <select
                name="carsMakeModel"
                id="carsMakeModel"
                className="form-control"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose Car Make and Model
                </option>

                {carmodels.map((car) => (
                  <option
                    key={`${car.make}-${car.model}`}   // now truly unique
                    value={`${car.make} ${car.model}`}
                  >
                    {car.make} {car.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="purchaseDate" className='mb-0'>Purchase Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} name='purchaseDate' id="purchaseDate" className="form-control" placeholder="Enter Purchase Date" />
            </div>
          </div>          
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="carYear" className='mb-0'>Car Year</label>
              {/*<input type="number" name='carYear' id="carYear" min={2015} max={2026} value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Enter Car Year" />*/}
              <select
                className="form-control"
                id="carYear"
                name="carYear"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <hr className="mt-2 mb-3" />

        <div className="login-buttons flex-row justify-content-center">
          <button type="reset" onClick={handleReset} className="secondary-btn">Reset</button>
          <button type='button' onClick={postreview} className="primary-btn">Post Review</button>
        </div>

      </div>
  );
};
export default PostReview;
