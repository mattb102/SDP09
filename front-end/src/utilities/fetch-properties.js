const fetchProperties = async (setProperties, setCurrentProperty, totalPages, setTotalPages, currentPage, authToken) => {
  try {
    const response = await fetch(`api/house/?page=${currentPage}&page_size=12`, {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProperties(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      console.log(totalPages);
      //if (Object.keys(currentProperty).length === 0) setCurrentProperty(data.results[0]);
    } else {
      console.error("Failed to fetch properties:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

export default fetchProperties;