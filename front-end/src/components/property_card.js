import React from "react";

function PropertyCard({ address, projectedValue }) {
  return (
    <div className="property-card">
      <h3>{address}</h3>
      <p>Projected Value: {projectedValue}</p>
      {/* Add more property information as needed */}
    </div>
  );
}

export default PropertyCard;

