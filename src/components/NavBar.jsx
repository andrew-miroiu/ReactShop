import React from "react";

import { Link } from "react-router-dom";

const NavBar = ({cartCount, searchTerm, setSearchTerm}) => {

    return (
        <nav className="navbar">
            <Link to="/">
                <h1 id="site-title">SinepCart</h1>
            </Link>
            
            <div className="inputBar">
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                {/* <button>🔍</button> */}
            </div>
            <div className="pages">
                <Link to="shop"><button>Shop</button></Link>
                <Link to="cart"><button>Cart {cartCount}</button></Link>
                <Link to="wishlist"><button>Wishlist</button></Link>
            </div>
            
        </nav>

    );
}

export default NavBar;