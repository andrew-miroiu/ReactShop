import React from "react";
import HomePage from "../components/Home";
import App from "../App";
import Layout from "../components/Layout";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import ProductDetail from "../components/ProductDetail.jsx"; // Add this import

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <App />,
      },
      {
        path: "/product/:id", // Add this route
        element: <ProductDetail />
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path:"/wishlist",
        element: <Wishlist />
      }
    ],
  },
];

export default routes;