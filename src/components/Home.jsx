import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="home">
      <div className="info fade-in-left">
        <h1>Discover Everything You Need in One Place</h1>
        <p>
          Your one-stop shop for all your needs. Explore our wide range of
          products and find exactly what you're looking for.
        </p>
        <Link to="shop">
          <button className="animated-btn">
            <FaShoppingBag /> Shop Now
          </button>
        </Link>
      </div>

      <div className="image fade-in-right">
        <img
          src="/bag.png"
          alt="Shopping"
        />
      </div>
    </div>
  );
};

export default HomePage;
