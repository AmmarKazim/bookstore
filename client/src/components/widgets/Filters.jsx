import React from "react";
import PriceFilter from "./PriceFilter";

// to filter the results
function Filters() {
  return (
    <aside className="filters bg-succes col-12 col-md-4 col-lg-3 col-xl-2 white-space-none">
      <div className="d-grid">
        <button
          className="text-start btn m-0 p-0 fs-3"
          data-bs-toggle="collapse"
          data-bs-target="#filter-tile"
        >
          Apply Filters
        </button>
      </div>
      <div>
        <PriceFilter />
      </div>
    </aside>
  );
}

export default Filters;
