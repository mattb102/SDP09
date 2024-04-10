const fetchProperties = async (setProperties, setTotalPages, currentPage, queryParams, authToken) => {
  try {
    queryParams.page = currentPage;
    queryParams.page_size = 12;
    const params = new URLSearchParams(queryParams);
    console.log(params.toString());

    const response = await fetch(`api/house/?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProperties(data.results);
      setTotalPages(Math.floor(data.count / 12) + 1);
    } else {
      console.error("Failed to fetch properties:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

export default fetchProperties;