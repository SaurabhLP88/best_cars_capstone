import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import "./assets/bootstrap-4.6.0-dist/css/bootstrap.min.css";
import "./assets/css/slicknav.min.css";
import "./assets/css/icofont.css";
//import "./assets/css/slick.css";
//import "./assets/css/font-awesome.min.css";
//import "./assets/css/owl.carousel.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/animate.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

//import "owl.carousel/dist/assets/owl.carousel.css";
//import "owl.carousel/dist/assets/owl.theme.default.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);