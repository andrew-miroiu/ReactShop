import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import Product from "./components/Product";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0); // pagination start
  const [total, setTotal] = useState(null); // total products from API
  let limit = 20; // products per request
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [burger, setBurger] = useState("closed");
  const { addToCart, favoriteItems, searchTerm } = useOutletContext();

  const selectCategory = (category) => {
  setSelectedCategory(category ? category.slug : null);
  setData([]);  // reset product list when filter changes
  setSkip(0);
  setTotal(null);
};

//Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const response = await fetch("https://dummyjson.com/products/categories");
        if(!response.ok) throw new Error("Server error");
        const result = await response.json();
        setCategories(result);
        setError(null);
      }
      catch(err){
        setError(err.message);
      }
    }
    fetchCategories();
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      selectedCategory? limit = 1000 : limit = 20; // fetch all in category to avoid missing items when filtering + infinite scroll
      const url = searchTerm
        ? `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Server error");
      const result = await response.json();



      // Store total once
      if (!total) setTotal(result.total);

      // Prevent duplicates
      setData((prev) => {
        const newItems = result.products
          .filter((p) => !prev.some((item) => item.id === p.id)) // prevent duplicates
          .filter((p) => !selectedCategory || p.category === selectedCategory); // filter category if selected

        return [...prev, ...newItems.map((p) => ({ ...p, isFavorite: false }))];
      });


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [skip, searchTerm, total, selectedCategory]);

  useEffect(() => {
    setData([]);
    setSkip(0);
    setTotal(null);
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 200 &&
          !loading &&
          (total === null || data.length < total)
        ) {
          setSkip((prev) => prev + limit);
        }
      }, 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, data.length, total]);

  if (error) return <p>{error}</p>;
  return (
    <div className="App">
      <div className="burger" onClick={() => {setBurger(burger === "open" ? "closed" : "open")}}>=</div>
      <div className={`filterSection ${burger}`}>
        <Filter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={selectCategory}
        />
      </div>
      <div className="shop">
      {data.map((product) =>
        favoriteItems.find((item) => item.id === product.id) ? (
          <Product
            key={product.id}
            product={{ ...product, isFavorite: true }}
            addToCart={addToCart}
          />
        ) : (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        )
      )}
      {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default App;
