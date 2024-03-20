import PropertyCard from "./property_card";

function Properties({properties, setCurrentProperty, setCurrentPage}) {
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1); // Increment the current page
  };

  const handleBackPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  }

  return (
    <div className="properties">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          property={property}
          setCurrentProperty={setCurrentProperty}
        />
      ))}
      <button onClick={handleBackPage}>Back</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default Properties;

