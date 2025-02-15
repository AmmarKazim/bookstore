import React from "react";

// represents stars for a rating
function Rating({ stars }) {
  return (
    <div className="product-rating">
      <i
        className={`bi bi-star${stars >= 1 ? "-fill text-warning" : ""}`}
        id="one"
      />
      <i
        className={`bi bi-star${stars >= 2 ? "-fill text-warning" : ""}`}
        id="two"
      />
      <i
        className={`bi bi-star${stars >= 3 ? "-fill text-warning" : ""}`}
        id="three"
      />
      <i
        className={`bi bi-star${stars >= 4 ? "-fill text-warning" : ""}`}
        id="four"
      />
      <i
        className={`bi bi-star${stars >= 5 ? "-fill text-warning" : ""}`}
        id="five"
      />
    </div>
  );
}

export default Rating;
