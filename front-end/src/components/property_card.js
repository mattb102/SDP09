import React from "react";

function PropertyCard({ address, projectedValue, town }) {
  return (
    <div className="property-card">
      <h3>{address}</h3>
      <h4> {town}</h4>
      <p>Projected Value: {projectedValue}</p>
      {/* Add more property information as needed */}
    </div>
  );
}

export default PropertyCard;

