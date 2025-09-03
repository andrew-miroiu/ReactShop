import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import emailjs from "emailjs-com";

const Cart = () => {
  const { cartItems, setCartItems } = useOutletContext();

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderDetails = cartItems
      .map(
        (item) =>
          `${item.title} - $${item.price} x ${item.quantity} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const totalPrice = (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
      5
    ).toFixed(2);

    const customerEmail = window.prompt("Enter your email address:");

    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!customerEmail || !isValidEmail(customerEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    const templateParams = {
      order_id: Math.floor(Math.random() * 1000000),
      order_details: orderDetails,
      shipping: 5,
      total: totalPrice,
      to_email: customerEmail.trim(), 
    };

    try {
      const result = await emailjs.send(
        "service_98xbi04",
        "template_h03tp37",
        templateParams,
        "FW9ccF94b-mvxhdWw"
      );

      console.log("SUCCESS:", result.text);
      alert(`Order email sent to ${customerEmail}`);
      
      setCartItems([]);
    } catch (error) {
      console.error("FAILED:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cartItemImage">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="cartItemDetails">
                <h2>{item.title}</h2>
                <p>${item.price}</p>
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
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="orderSummary">
        <h2>Order Summary</h2>
        <div className="orderPrices">
          <div className="orderPricesRow">
            <p>Products price:</p>
            <p>
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="orderPricesRow">
            <p>Delivery cost:</p>
            <p>$5</p>
          </div>
          <hr />
          <div className="orderPricesRow">
            <p>Total:</p>
            <p>
              $
              {(
                cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) + 5
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <button className="checkoutButton" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;