import PropertyCard from "./property_card";

function Properties({properties, setCurrentProperty, setCurrentPage, currentPage}) {
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1); // Increment the current page
    document.getElementById('properties').scrollTop = 0;
  };

  const handleBackPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
    document.getElementById('properties').scrollTop = 0;
  }

  return (
    <div className="properties" id="properties">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          property={property}
          setCurrentProperty={setCurrentProperty}
        />
      ))}
      <button onClick={handleBackPage}>Back</button>
      <button onClick={handleNextPage}>Next</button>
      <p>Page: {currentPage}</p>
    </div>
  );
}

export default Properties;