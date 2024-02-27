import React from "react";

function Information({currentProperty}) {
  return (
    <div className="information">
      <div>
        <img src="https://placehold.co/600x400" alt="placeholder"/>
      </div>
      <div>
        <h2>Address: {currentProperty.address}</h2>
      </div>
    </div>
  );
} 

export default Information;