import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from "../../Common/Header/Header";

import "../Dealers/Dealers.css";

const PostReview = () => {
  const [dealer, setDealer] = useState({});
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
  let params = useParams();
  let id =params.id;
  let dealer_url = `/djangoapp/dealer/${id}`;
  let review_url = `/djangoapp/add_review`;
  let carmodels_url = `/djangoapp/cars/${id}`;

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
    const res = await fetch(review_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsoninput,
    });

    if (res.ok) {
      window.location.href = window.location.origin + "/dealer/" + id;
    } else {
      alert("Failed to submit review");
    }

  };
  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      const data = await res.json();
      if (data.status === 200 && data.dealer.length > 0) {
        setDealer(data.dealer[0]);
      }
    } catch (err) {
      console.error("Error loading dealer:", err);
    }
  };

  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url);
      const cars = await res.json();

      // Deduplicate make + model
      const uniqueCars = Array.from(
        new Map(
          cars.map(car => [
            `${car.make}-${car.model}`,
            car
          ])
        ).values()
      );

      setCarmodels(uniqueCars);
    } catch (err) {
      console.error("Error loading cars:", err);
    }
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div>
      <Header/>
      <div  style={{margin:"5%"}}>
      <h1 style={{color:"darkblue"}}>{dealer.full_name}</h1>
      <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
      <div className='input_field'>
      Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div className='input_field'>
      Car Make 
      <select
        name="cars"
        id="cars"
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
      </div >

      <div className='input_field'>
      Car Year <input type="number" min={2015} max={2023} onChange={(e) => setYear(e.target.value)} />
      </div>

      <div>
      <button className='postreview' onClick={postreview}>Post Review</button>
      </div>
    </div>
    </div>
  );
};
export default PostReview;
