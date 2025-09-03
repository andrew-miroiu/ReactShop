import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Wishlist = () => {
    const { favoriteItems } = useOutletContext();
  return (
    <><h1>Wishlist</h1>
    <div className="wishlist" >
        {favoriteItems.length === 0 ? (
            <p>No favorite items yet.</p>
        ) : (  
            favoriteItems.map((item) => (
                <div className="product" key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div>
                        <h2>{item.title}</h2>
                        <p><strong>Price: {item.price}$</strong></p>
                        <div className="rating">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                if (item.rating >= starValue) {
                                    return <FaStar key={index} className="star filled" />;
                                } else if (item.rating >= starValue - 0.5) {
                                    return <FaStarHalfAlt key={index} className="star half" />;
                                } else {
                                    return <FaRegStar key={index} className="star empty" />;
                                }
                            })}
                            <span className="rating-text">({item.rating})</span>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
    </>
  );
}

export default Wishlist;