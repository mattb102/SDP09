const handleFilter = (e, setQueryParams, setCurrentPage) => {
  const { name, value } = e.target;
  setCurrentPage(1);
  if (value === '') {
    setQueryParams(prevParams => {
      delete prevParams[name];
      return { ...prevParams};
    });
  } else {
    setQueryParams(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  }
};  

export default handleFilter;