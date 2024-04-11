const handleFilter = (e, setQueryParams, setCurrentPage, setMenuOpen) => {
  e.preventDefault();
  setCurrentPage(1);

  console.log(e.target.length);
  for (var i = 0; i < e.target.length; i++) {
    const {name, value} = e.target[i];
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
  }

  setMenuOpen(false);
};  

export default handleFilter;