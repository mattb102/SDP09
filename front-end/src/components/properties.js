import PropertyCard from "./property_card";

function Properties({properties, setCurrentProperty}) {
  return (
    <div className="properties">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          property={property}
          setCurrentProperty={setCurrentProperty}
        />
      ))}
    </div>
  );
}

export default Properties;

