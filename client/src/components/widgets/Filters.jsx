import React, { useEffect } from "react";
import PriceFilter from "./PriceFilter";
import $ from "jquery";

// to filter the results
function Filters() {
  // using jQuery to prevent collapsing capabilities for filters tiles
  useEffect(() => {
    if (window.screen.width > 768) {
      $("#allFiltersButton").removeAttr("data-bs-toggle");
      $("#filter-tile").removeClass("collapse");
      $("#priceFilterButton").removeAttr("data-bs-toggle");
      $("#priceFilter").removeClass("collapse");
      $(".filters .filter-tile .filterToggleIcon").hide();
    } else {
      $("#allFiltersButton").attr("data-bs-toggle", "collapse");
      $("#filter-tile").addClass("collapse");
      $("#priceFilterButton").attr("data-bs-toggle", "collapse");
      $("#priceFilter").addClass("collapse");
      $(".filters .filter-tile .filterToggleIcon").show();
    }
  }, []);

  return (
    <aside className="filters text-bg-succes col-12 col-md-4 col-lg-3 m-0 p-0">
      <div className="d-grid d-md-block">
        <button
          className="text-start btn m-0 p-0 fs-3"
          type="button"
          id="allFiltersButton"
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
