import PropertyCard from "./property_card";

function Properties({properties, setCurrentProperty, setCurrentPage, currentPage, totalPages}) {
  const handleNextPage = () => {
    console.log(totalPages);
    setCurrentPage(prevPage => prevPage >= totalPages ? prevPage : prevPage + 1);
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
      <div className="page-button-container">
        <button onClick={handleBackPage}>Back</button>
        <button onClick={handleNextPage}>Next</button>
        <p>Page: {currentPage}/{totalPages}</p>
      </div>
    </div>
  );
}

export default Properties;