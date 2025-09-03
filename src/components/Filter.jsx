import React from "react";

const Filter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filter-section">
      <span>
        <h3>Categories</h3>
      </span>
      <ul>
        <button onClick={() => setSelectedCategory(null)} className={selectedCategory === null? "active" : ""}>All</button>
        {categories.map((cat) => (
            <button key={cat.name}
              onClick={() => {setSelectedCategory(cat);
              }}
              className={selectedCategory === cat.slug ? "active" : ""}
            >
              {cat.name}
            </button>
        ))}
      </ul>
    </div>
  );
};

export default Filter;