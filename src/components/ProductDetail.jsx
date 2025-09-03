// components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useOutletContext();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-detail">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>
            
            <div className="product-detail-content">
                <div className="product-images">
                    <img src={product.thumbnail} alt={product.title} />
                    {/* You can add image gallery here */}
                </div>
                
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="brand">{product.brand}</p>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                    
                    {/* Quantity and Add to Cart */}
                    <div className="buy-section">
                        <div className="quantity-section">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button 
                            className="add-to-cart-btn"
                            onClick={() => {
                                addToCart(product, quantity);
                                // Optional: show success message
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;