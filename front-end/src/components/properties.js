import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import PropertyCard from "./property_card";

function Properties(props) {
  const [properties, setProperties] = useState([]);
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("api/house/", {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperties(data); // Update state with fetched property data
        } else {
          console.error("Failed to fetch properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [authToken]); // Include authToken in the dependency array to trigger the effect when it changes

  return (
    <div className="properties">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          address={property.address}
          projectedValue={property.projectedValue}
          // Add more props as needed based on the data structure returned by your API
        />
      ))}
    </div>
  );
}

export default Properties;

