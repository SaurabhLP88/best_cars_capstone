import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../../Common/Header/Header";

import "./Dealers.css";
import review_icon from "../../../assets/icons/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalDealers, setOriginalDealers] = useState([]);

  // let [state, setState] = useState("")
  let [states, setStates] = useState([]);

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";  
  // let dealer_url_by_state = "/djangoapp/get_dealers/";
 
  /*const filterDealers = async (state) => {
    const url =
      state === "All"
        ? dealer_url
        : `/djangoapp/get_dealers/${state}`;

    const res = await fetch(url, { method: "GET" });
    const retobj = await res.json();

    if (retobj.status === 200 && Array.isArray(retobj.dealers)) {
      setDealersList(retobj.dealers);
    } else {
      setDealersList([]);
    }
  };*/

  const get_dealers = async () => {
    try {
      const res = await fetch(dealer_url);

      if (!res.ok) {
        console.error("Dealers API failed:", res.status);
        setDealersList([]);
        return;
      }

      const retobj = await res.json();

      if (retobj.status === 200 && Array.isArray(retobj.dealers)) {
        const all_dealers = retobj.dealers;
        const states = [...new Set(all_dealers.map(d => d.state))];

        setStates(states);
        setDealersList(all_dealers);
        setOriginalDealers(all_dealers);
      } else {
        console.error("Invalid dealers payload:", retobj);
        setDealersList([]);
        setOriginalDealers([]);
        setStates([]);
      }
    } catch (err) {
      console.error("Dealers fetch error:", err);
      setDealersList([]);
    }
  };


  useEffect(() => {
    get_dealers();
  },[]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = originalDealers.filter(dealer =>
      dealer.state?.toLowerCase().includes(query.toLowerCase())
    );

    setDealersList(filtered);
  };

  const handleLostFocus = () => {
    if (!searchQuery) {
      setDealersList(originalDealers);
    }
  }; 


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>

     <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Dealer Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Zip</th>
          <th>
            {/*<select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
              <option value="" selected disabled hidden>State</option>
              <option value="All">All States</option>
              {states.map(state => (
                  <option value={state}>{state}</option>
              ))}
            </select>*/}
            <input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={handleInputChange}
              onBlur={handleLostFocus}
            />
            
          </th>
          {isLoggedIn ? (
              <th>Review Dealer</th>
            ):<></>
          }
        </tr>
      </thead>
      <tbody>
        {dealersList.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No dealers found
            </td>
          </tr>
        ) : (
          dealersList.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td>
                <Link to={`/dealer/${dealer.id}`}>
                  {dealer.full_name}
                </Link>
              </td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <Link to={`/postreview/${dealer.id}`}>
                    <img
                      src={review_icon}
                      className="review_icon"
                      alt="Post Review"
                    />
                  </Link>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>

     </table>
  </div>
);
};

export default Dealers;
