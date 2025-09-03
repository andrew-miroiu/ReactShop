import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = ({ product, addToCart}) => {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
    const { removeFromFavorites, showFavorites, addToFavorites } = useOutletContext();
    const navigate = useNavigate();
    
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };  

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if(isFavorite == true){
            product.isFavorite = false;
            removeFromFavorites(product.id);

        }
        else{
            product.isFavorite = true;
            addToFavorites(product);
        }
        showFavorites();
    };

    const containerClass = product.isFavorite ? "favorite" : "notFavorite";

    return (
        <div className="product" key={product.id}>
            <div className="favourite" onClick={toggleFavorite}>
                <svg 
                    className={containerClass}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </div>
            <img src={product.thumbnail} alt={product.title} onClick={() => navigate(`/product/${product.id}`)}/>
            <h2 onClick={() => navigate(`/product/${product.id}`)}>{product.title}</h2>
            <h2>{product.price}$</h2>
            <div className="rating">
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        if (product.rating >= starValue) {
                            return <FaStar key={index} className="star filled" />;
                        } else if (product.rating >= starValue - 0.5) {
                            return <FaStarHalfAlt key={index} className="star half" />;
                        } else {
                            return <FaRegStar key={index} className="star empty" />;
                        }
                    })}
                    <span className="rating-text">({product.rating})</span>
                </div>
            <div className="buySection">
                <div className="quantitySection">
                    <button onClick={decrementQuantity}>-</button>
                    <input type="number" name="" id="" value={quantity} onChange={handleQuantityChange} min="1" />
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <button onClick={() => addToCart(product, quantity)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;