import React from "react";

function Information({currentProperty}) {
  return (
    <div className="information">
      <div>
        <img src="https://placehold.co/600x400" alt="placeholder"/>
      </div>
      <div>
        <h2>Address: {currentProperty.address} {currentProperty.town}, CT</h2>
        <p>Current Price: ${currentProperty.price}</p> <br/>
        <p>Number of Beds: {currentProperty.beds_total}</p>
        <p>Number of Baths: {currentProperty.baths_total}</p>
        <p>Square Footage: {currentProperty.sq_ft_total} ft.</p>
        {currentProperty.acres > 0 && <p>Acres: {currentProperty.acres}</p>} <br/>
        <p>Year Built: {currentProperty.year_built}</p>
      </div>
    </div>
  );
} 

export default Information;