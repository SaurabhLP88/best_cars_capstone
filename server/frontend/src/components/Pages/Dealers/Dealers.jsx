import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from '../../Common/Footer/Footer';
import ReviewModal from "../../Common/ReviewModal/ReviewModal";
import PostReview from "../PostReview/PostReview";
import DealerModal from "../../Common/DealerModal/DealerModal";
import Dealer from "../Dealer/Dealer";

import "./Dealers.css";

import bannerBg from "../../../assets/images/contact-banner.jpg";
import video_overview from "../../../assets/images/video-overview.jpg";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalDealers, setOriginalDealers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedDealerId, setSelectedDealerId] = useState(null);
  const [showDealerModal, setShowDealerModal] = useState(false);
  const [selectedDealerDetailsId, setSelectedDealerDetailsId] = useState(null);
  // let [state, setState] = useState("")
  // let [states, setStates] = useState([]);

  // let root_url = window.location.origin
  const dealer_url ="/djangoapp/get_dealers";  
  // let dealer_url_by_state = "/djangoapp/get_dealers/";
  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

  const totalItems = dealersList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentDealers = dealersList.slice(indexOfFirstItem, indexOfLastItem);

  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
 
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

  useEffect(() => {
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
          // const states = [...new Set(all_dealers.map(d => d.state))];

          // setStates(states);
          setDealersList(all_dealers);
          setOriginalDealers(all_dealers);
        } else {
          console.error("Invalid dealers payload:", retobj);
          setDealersList([]);
          setOriginalDealers([]);
          // setStates([]);
        }
      } catch (err) {
        console.error("Dealers fetch error:", err);
        setDealersList([]);
      }
    };
    get_dealers();
  },[]);  

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);

    const filtered = originalDealers.filter(dealer =>
      dealer.full_name?.toLowerCase().includes(query.toLowerCase()) ||
      dealer.city?.toLowerCase().includes(query.toLowerCase()) ||
      dealer.state?.toLowerCase().includes(query.toLowerCase()) ||
      dealer.address?.toLowerCase().includes(query.toLowerCase()) ||
      dealer.zip?.toString().includes(query)
    );

    setDealersList(filtered);
  };

  const handleLostFocus = () => {
    if (!searchQuery) {
      setDealersList(originalDealers);
      setCurrentPage(1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset page
  };

  return(
    <>
        <Header/>

        <Banner
          title="Dealers"
          bgImage={bannerBg}
          bgPosition={146}
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Dealers" },
          ]}
        />

        <div className='py-5'>       

          <div className='search-input mb-4'>
            <div className="container">
              <div className='search-input-contain rounded-pill px-4 py-3'>
                <input
                    type="text"
                    className="form-control form-control-lg text-center rounded-pill font-weight-bold bg-white py-4 m-0"
                    placeholder="Search by Dealer, City, State..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onBlur={handleLostFocus}
                  />
              </div>
            </div>
          </div>

            <div className='dealer-cards'>
              <div className="container">
                <div className="row">

                  {dealersList.length === 0 ? (
                    <div className="col-12">
                      <h3 className='font-weight-bold text-center'>No dealers found</h3>
                    </div>
                  ) : (
                    currentDealers.map((dealer) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={dealer.id}>
                        <div className="single-pricing-box dealer-card h-100">
                          <div className="pricing-image">
                            <img
                              src={video_overview}
                              alt={dealer.full_name}
                            />
                          </div>
                          <div className="price">
                            <h4 className='price-title'>{dealer.full_name}</h4>
                          </div>
                          <div className="price-details">
                            <p>
                              {dealer.address}, {dealer.city}, {dealer.state} - {dealer.zip}
                            </p>
                            <div className="d-flex justify-content-center mt-1">
                              <Link
                                // to={`/dealer/${dealer.id}`}
                                onClick={() => {
                                  setSelectedDealerDetailsId(dealer.id);
                                  setShowDealerModal(true);
                                }}
                                className="appao-btn mr-1"
                              >
                                View Dealer
                              </Link>
                              {isLoggedIn && (
                                <Link
                                  // to={`/postreview/${dealer.id}`}
                                  onClick={() => {
                                    setSelectedDealerId(dealer.id);
                                    setShowModal(true);
                                  }}
                                  onClose={() => {
                                    setShowModal(false);
                                    setSelectedDealerId(null);
                                  }}
                                  className="appao-btn ml-1"
                                >
                                  Give Review
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                </div>
              </div>
            </div>

            <div className='dealer-footer mb-5'>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">

                        {dealersList.length > 0 && (
                          <div className="pagination mb-0">
                            <ul>

                              {/* First */}
                              <li>
                                <button
                                  onClick={() => goToPage(1)}
                                  disabled={currentPage === 1}
                                >
                                  <i className="icofont icofont-double-left"></i>
                                </button>
                              </li>

                              {/* Prev */}
                              <li>
                                <button
                                  onClick={() => goToPage(currentPage - 1)}
                                  disabled={currentPage === 1}
                                >
                                  <i className="icofont icofont-curved-left"></i>
                                </button>
                              </li>

                              {/* Page Numbers */}
                              {pages.map((page) => (
                                <li key={page}>
                                  <button
                                    onClick={() => goToPage(page)}
                                    className={currentPage === page ? "active" : ""}
                                  >
                                    {page}
                                  </button>
                                </li>
                              ))}

                              {/* Next */}
                              <li>
                                <button
                                  onClick={() => goToPage(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                >
                                  <i className="icofont icofont-curved-right"></i>
                                </button>
                              </li>

                              {/* Last */}
                              <li>
                                <button
                                  onClick={() => goToPage(totalPages)}
                                  disabled={currentPage === totalPages}
                                >
                                  <i className="icofont icofont-double-right"></i>
                                </button>
                              </li>

                            </ul>
                          </div>
                        )}

                        <div className='d-flex justify-content-between align-items-center'>
                          <div className='mr-3'>
                            <label className="mr-2">Items per page</label>
                            <select
                              value={itemsPerPage}
                              onChange={handlePageSizeChange}
                              className="form-control d-inline-block w-auto"
                            >
                              <option value={3}>3</option>
                              <option value={6}>6</option>
                              <option value={9}>9</option>
                            </select>
                          </div>
                          <div>
                            Page <span className='font-weight-bold text-primary'>{currentPage}</span> of <span className='font-weight-bold'>{totalPages}</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            
          </div>

      <Footer />

      <ReviewModal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <PostReview dealerId={selectedDealerId} />
      </ReviewModal>

      <DealerModal
        show={showDealerModal}
        onClose={() => {
          setShowDealerModal(false);
          setSelectedDealerDetailsId(null);
        }}
      >
        <Dealer
          dealerId={selectedDealerDetailsId}
          /*onOpenReview={(id) => {
            setSelectedDealerId(id);
            setShowModal(true);
          }}*/
          onOpenReview={(id) => {
            // 1️⃣ close dealer modal
            setShowDealerModal(false);
            setSelectedDealerDetailsId(null);

            // 2️⃣ open review modal (slight delay for smooth UX)
            setTimeout(() => {
              setSelectedDealerId(id);
              setShowModal(true);
            }, 200);
          }}
        />
      </DealerModal>
    </>
  );
};

export default Dealers;
