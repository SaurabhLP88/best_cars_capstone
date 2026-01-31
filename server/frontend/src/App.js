import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import LoginPanel from "./components/Auth/Login/Login";
import RegisterPanel from "./components/Auth/Register/Register";
import Dealers from './components/Pages/Dealers/Dealers';
import Dealer from "./components/Pages/Dealer/Dealer";
import PostReview from "./components/Pages/PostReview/PostReview";
import SearchCars from "./components/Pages/SearchCars/SearchCars";
import Contact from "./components/Pages/Contact/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/dealers" element={<Dealers/>} />
      <Route path="/dealer/:id" element={<Dealer/>} />
      <Route path="/postreview/:id" element={<PostReview/>} />
      <Route path="/searchcars/:id" element={<SearchCars/>} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
export default App;
