import React, { useState , useEffect} from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // ✅

  // ✅ Debounce Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // waits 300ms after typing stops

    return () => clearTimeout(handler); // cleanup
  }, [searchTerm]);

  const addToCart = (product, quantity = 1) => {
  setCartItems((prev) => {
    const existingItem = prev.find((item) => item.id === product.id);

    if (existingItem) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...product, quantity }];
    }
  });

};

  const addToFavorites = (product) => {
    setFavoriteItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev;
      } else {
        return [...prev, product];
      }
    });
  }

  const removeFromFavorites = (productId) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== productId));
  }

  const showFavorites = () => {
    console.log("Favorite Items:", favoriteItems);
  }

  return (
    <>
      <NavBar 
        cartCount={cartItems.length} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <Outlet context={{ cartItems,setCartItems, addToCart, favoriteItems, addToFavorites, removeFromFavorites, showFavorites, searchTerm:debouncedSearchTerm }} /> 
    </>
  );
};

export default Layout;
