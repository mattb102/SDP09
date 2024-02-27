import React from "react";

function PropertyCard({property, setCurrentProperty}) {
  const onClickCard = () => {
    setCurrentProperty(property)
  }

  return (
    <div className="property-card" onClick={onClickCard}>
      <h3>{property.address}</h3>
      <h4> {property.town}</h4>
      <p>Projected Value: {property.projectedValue}</p>
    </div>
  );
}

export default PropertyCard;