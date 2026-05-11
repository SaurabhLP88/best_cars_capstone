import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";

import car_dealership from "../../../assets/images/car_dealership.jpg";

import "./SearchCars.css";

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [dealer, setDealer] = useState({
    full_name: "",
  });
  const [message, setMessage] = useState("Loading Cars....");
  const { id } = useParams();
  //let dealer_url = `/djangoapp/get_inventory/${id}`;
  //let dealer_url = `/cars/${id}`;
  // const CARS_API = "http://localhost:3030";
  let fetch_url = `/djangoapp/dealer/${id}`;
  const fetchDealer = async () => {
    const res = await fetch(fetch_url, {
      method: "GET",
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      let dealer = retobj.dealer;
      setDealer({
        full_name: dealer[0].full_name,
      });
    }
  };
  const populateMakesAndModels = (cars) => {
    let tmpmakes = [];
    let tmpmodels = [];
    cars.forEach((car) => {
      tmpmakes.push(car.make);
      tmpmodels.push(car.model);
    });
    setMakes(Array.from(new Set(tmpmakes)));
    setModels(Array.from(new Set(tmpmodels)));
  };

  const fetchCars = async () => {
    const res = await fetch(`/djangoapp/cars/${id}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setCars(data);
      populateMakesAndModels(data);
      setMessage(data.length === 0 ? "No cars found" : "");
    } else {
      setMessage("Failed to load cars");
    }
  };

  const setCarsmatchingCriteria = async(matching_cars) => {
    let cars = Array.from(matching_cars);
    console.log("Number of matching cars " + cars.length);
    let makeIdx = document.getElementById("make").selectedIndex;
    let modelIdx = document.getElementById("model").selectedIndex;
    let yearIdx = document.getElementById("year").selectedIndex;
    let mileageIdx = document.getElementById("mileage").selectedIndex;
    let priceIdx = document.getElementById("price").selectedIndex;
    if (makeIdx !== 0) {
      let currmake = document.getElementById("make").value;
      cars = cars.filter((car) => car.make === currmake);
    }
    if (modelIdx !== 0) {
      let currmodel = document.getElementById("model").value;
      cars = cars.filter((car) => car.model === currmodel);
      if (cars.length !== 0) {
        document.getElementById("make").value = cars[0].make;
      }
    }
    if (yearIdx !== 0) {
      let curryear = document.getElementById("year").value;
      cars = cars.filter((car) => car.year >= curryear);
      if (cars.length !== 0) {
        document.getElementById("make").value = cars[0].make;
      }
    }
    if (mileageIdx !== 0) {
      let currmileage = parseInt(document.getElementById("mileage").value);
      if (currmileage === 50000) {
        cars = cars.filter((car) => car.mileage <= currmileage);
      } else if (currmileage === 100000) {
        cars = cars.filter(
          (car) => car.mileage <= currmileage && car.mileage > 50000
        );
      } else if (currmileage === 150000) {
        cars = cars.filter(
          (car) => car.mileage <= currmileage && car.mileage > 100000
        );
      } else if (currmileage === 200000) {
        cars = cars.filter(
          (car) => car.mileage <= currmileage && car.mileage > 150000
        );
      } else {
        cars = cars.filter((car) => car.mileage > 200000);
      }
    }
    if (priceIdx !== 0) {
      let currprice = parseInt(document.getElementById("price").value);
      if (currprice === 20000) {
        cars = cars.filter((car) => car.price <= currprice);
      } else if (currprice === 40000) {
        cars = cars.filter(
          (car) => car.price <= currprice && car.price > 20000
        );
      } else if (currprice === 60000) {
        cars = cars.filter(
          (car) => car.price <= currprice && car.price > 40000
        );
      } else if (currprice === 80000) {
        cars = cars.filter(
          (car) => car.price <= currprice && car.price > 60000
        );
      } else {
        cars = cars.filter((car) => car.price > 80000);
      }
    }
    if (cars.length === 0) {
      setMessage("No cars found matching criteria");
    }
    setCars(cars);
  };
  let SearchCarsByMake = async () => {
    let make = document.getElementById("make").value;
    /*dealer_url = `${dealer_url}?make=${make}`;
    dealer_url = `/carsbymake/${id}/${make}`;
    const res = await fetch(dealer_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    const res = await fetch(`/djangoapp/carsbymake/${id}/${make}`);

    const data = await res.json();
    if (Array.isArray(data)) {
      setCarsmatchingCriteria(data);
    }
  };
  let SearchCarsByModel = async () => {
    let model = document.getElementById("model").value;
    /*dealer_url = `${dealer_url}?model=${model}`;
    dealer_url = `/carsbymodel/${id}/${model}`;
    const res = await fetch(dealer_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    const res = await fetch(`/djangoapp/carsbymodel/${id}/${model}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setCarsmatchingCriteria(data);
    }
  };
  let SearchCarsByYear = async () => {
    let year = document.getElementById("year").value;
    /*if (year !== "all") {
      //dealer_url = `${dealer_url}?year=${year}`;
      dealer_url = `/carsbyyear/${id}/${year}`;
    }
    const res = await fetch(dealer_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    const res = await fetch(`/djangoapp/carsbyyear/${id}/${year}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setCarsmatchingCriteria(data);
    }
  };
  let SearchCarsByMileage = async () => {
    let mileage = document.getElementById("mileage").value;
    /*if (mileage !== "all") {
      //dealer_url = `${dealer_url}?mileage=${mileage}`;
      dealer_url = `/carsbymaxmileage/${id}/${mileage}`;
    }
    const res = await fetch(dealer_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    const res = await fetch(`/djangoapp/carsbymaxmileage/${id}/${mileage}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setCarsmatchingCriteria(data);
    }
  };
  let SearchCarsByPrice = async () => {
    let price = document.getElementById("price").value;
    /*if (price !== "all") {
      //dealer_url = `${dealer_url}?price=${price}`;
      dealer_url = `/carsbyprice/${id}/${price}`;
    }
    const res = await fetch(dealer_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    const res = await fetch(`/djangoapp/carsbyprice/${id}/${price}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setCarsmatchingCriteria(data);
    }
  };
  const reset = () => {
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.selectedIndex = 0;
    });
    fetchCars();
  };
  useEffect(() => {
    fetchCars();
    fetchDealer();
  }, []);

  return(
  <>
    <Header />

    <Banner
      title="Search Cars"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Search Cars" },
      ]}
    />

    <div className="search-cars-contain py-5">
      <div className="container">
        <div className="sec-title mb-5">
          <h2>Cars at <strong>{dealer.full_name}</strong>  <span className="sec-title-border"><span></span><span></span><span></span></span></h2>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div class="card card-search-cars text-white bg-primary mt-2 mb-3">
              <div class="card-body">
                <div className="row row-cols-1 mx-n2">

                  <div className="col px-2">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="make">Make</label>
                      </div>
                      <select 
                        class="custom-select"
                        name="make"
                        id="make"
                        onChange={SearchCarsByMake}
                      >
                        {makes.length === 0 ? (
                          <option value="">No data found</option>
                        ) : (
                          <>
                            <option value="all">-- All --</option>
                            {makes.map((make, index) => (
                              <option key={index} value={make}>{make}</option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col px-2">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="model">Model</label>
                      </div>
                      <select 
                        class="custom-select"
                        name="model"
                        id="model"
                        onChange={SearchCarsByModel}
                      >
                        {models.length === 0 ? (
                          <option value="">No data found</option>
                        ) : (
                          <>
                            <option disabled defaultValue>-- All --</option>
                            {models.map((model, index) => (
                              <option key={index} value={model}>{model}</option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col px-2">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="year">Year</label>
                      </div>
                      <select 
                        class="custom-select"
                        name="year"
                        id="year"
                        onChange={SearchCarsByYear}
                      >
                        <option value="all">-- All --</option>
                        <option value="2024">2024 or newer</option>
                        <option value="2023">2023 or newer</option>
                        <option value="2022">2022 or newer</option>
                        <option value="2021">2021 or newer</option>
                        <option value="2020">2020 or newer</option>
                      </select>
                    </div>
                  </div>

                  <div className="col px-2">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="mileage">Mileage</label>
                      </div>
                      <select 
                        class="custom-select"
                        name="mileage"
                        id="mileage"
                        onChange={SearchCarsByMileage}
                      >
                        <option value="all">-- All --</option>
                        <option value="50000">Under 50000</option>
                        <option value="100000">50000 - 100000</option>
                        <option value="150000">100000 - 150000</option>
                        <option value="200000">150000 - 200000</option>
                        <option value="200001">Over 200000</option>
                      </select>
                    </div>
                  </div>

                  <div className="col px-2">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="price">Price</label>
                      </div>
                      <select 
                        class="custom-select"
                        name="price"
                        id="price"
                        onChange={SearchCarsByPrice}
                      >
                        <option value="all">-- All --</option>
                        <option value="20000">Under 20000</option>
                        <option value="40000">20000 - 40000</option>
                        <option value="60000">40000 - 60000</option>
                        <option value="80000">60000 - 80000</option>
                        <option value="80001">Over 80000</option>
                      </select>
                    </div>
                  </div>

                  <div className="col px-2 text-right">
                    <button
                      className="appao-btn3"
                      onClick={reset}
                    >
                      Reset
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <div>
              {cars.length === 0 ? (
                <h4 className="text-center text-blue1 font-weight-bold">
                  {message}
                </h4>
              ) : (
                <div className="row row-cols-2 mx-n1"> {/*class="list-group"*/}
                  {cars.map((car) => (
                    
                    /*<div class="list-group-item list-group-item-action" key={car._id}>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{car.make} {car.model}</h5>
                        <small class="text-muted">{car.year}</small>
                      </div>
                      <p class="mb-1">Mileage :{car.mileage}</p>
                      <small class="text-muted">Price :{car.price}</small>
                    </div>*/

                     <div className='col px-1' key={car._id}>
                      <div className="p-2">
                        <div className="single-post p-0">
                          <div className="post-thumbnail text-center">
                            <img
                              src={car_dealership}
                              alt="{car.make} {car.model}"
                            />
                          </div>

                          <div className="post-details px-3 py-3">
                            <div className="post-author font-weight-bold d-flex justify-content-start align-items-start flex-wrap text-blue1">
                              <span className="d-flex justify-content-start">
                                <i className="icofont icofont-speech-comments text-dark h5 my-0"></i> {car.mileage} miles
                              </span>
                              <span className="d-flex justify-content-start">
                                <i className="icofont icofont-calendar text-dark h5 my-0"></i> {car.year}
                              </span>
                              <span className="d-flex justify-content-start">
                                <i className="icofont icofont-calendar text-dark h5 my-0"></i> ${car.price.toLocaleString()}
                              </span>
                            </div>

                            <h4 className="post-title mt-2 mb-0">{car.make} {car.model}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              )}
            </div>
          </div>
        </div>        

      </div>
    </div>

    {/*<div>
      <span
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
      >
        Make
      </span>
      <select
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
        name="make"
        id="make"
        onChange={SearchCarsByMake}
      >
        {makes.length === 0 ? (
            <option value="">No data found</option>
            ) : (
            <>
                <option value="all">-- All --</option>
                {makes.map((make, index) => (
                <option key={index} value={make}>{make}</option>
                ))}
            </>
        )}
      </select>
      <span
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
      >
        Model
      </span>
      <select
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
        name="model"
        id="model"
        onChange={SearchCarsByModel}
      >
        {models.length === 0 ? (
          <option value="">No data found</option>
        ) : (
          <>
            <option disabled defaultValue>
              -- All --
            </option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </>
        )}
      </select>
      <span
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
      >
        Year
      </span>
      <select
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
        name="year"
        id="year"
        onChange={SearchCarsByYear}
      >
        <option value="all">
          -- All --
        </option>
        <option value="2024">2024 or newer</option>
        <option value="2023">2023 or newer</option>
        <option value="2022">2022 or newer</option>
        <option value="2021">2021 or newer</option>
        <option value="2020">2020 or newer</option>
      </select>
      <span
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
      >
        Mileage
      </span>
      <select
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
        name="mileage"
        id="mileage"
        onChange={SearchCarsByMileage}
      >
        <option value="all">
          -- All --
        </option>
        <option value="50000">Under 50000</option>
        <option value="100000">50000 - 100000</option>
        <option value="150000">100000 - 150000</option>
        <option value="200000">150000 - 200000</option>
        <option value="200001">Over 200000</option>
      </select>
      <span
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
      >
        Price
      </span>
      <select
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderRadius: "10px",
        }}
        name="price"
        id="price"
        onChange={SearchCarsByPrice}
      >
        <option value="all">
          -- All --
        </option>
        <option value="20000">Under 20000</option>
        <option value="40000">20000 - 40000</option>
        <option value="60000">40000 - 60000</option>
        <option value="80000">60000 - 80000</option>
        <option value="80001">Over 80000</option>
      </select>
      <button
        style={{
          marginLeft: "10px",
          paddingLeft: "10px",
        }}
        onClick={reset}
      >
        Reset
      </button>
    </div>


    <div
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "20px",
      }}
    >
      {cars.length === 0 ? (
        <p
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "20px",
          }}
        >
          {message}
        </p>
      ) : (
        <div>
          <hr />
          {cars.map((car) => (
            <div key={car._id}>
              <div>
                <h3>
                  {car.make}
                  {car.model}
                </h3>
                <p>Year :{car.year}</p>
                <p>Mileage :{car.mileage}</p>
                <p>Price :{car.price}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>*/}

    <Footer />

  </>
)}
export default SearchCars;
